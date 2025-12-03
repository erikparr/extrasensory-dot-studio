import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getProduct } from '@/lib/products'
import { validateCoupon, calculateDiscountedPrice } from '@/lib/coupons'
import { calculatePPPPrice } from '@/lib/ppp'
import { getPromo, isPromoAvailable } from '@/lib/promos'

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  })
}

export async function POST(request) {
  try {
    const { productId, couponCode, countryCode } = await request.json()

    const product = getProduct(productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Apply PPP pricing first
    let finalPrice = product.price
    const ppp = calculatePPPPrice(product.price, countryCode)
    if (ppp.discount > 0) {
      finalPrice = ppp.price
    }

    // Check for promo code (limited use) or regular coupon
    let coupon = null
    let promoCode = null

    if (couponCode) {
      // First check if it's a limited promo code
      const promo = getPromo(couponCode)
      if (promo) {
        // Verify promo is still available
        const promoStatus = await isPromoAvailable(couponCode)
        if (!promoStatus.available) {
          return NextResponse.json(
            { error: promoStatus.error },
            { status: 400 }
          )
        }
        // Apply promo discount
        promoCode = promo.code
        finalPrice = Math.round(finalPrice * (100 - promo.discount) / 100)
      } else {
        // Fall back to regular coupon
        coupon = validateCoupon(couponCode)
        if (coupon) {
          finalPrice = calculateDiscountedPrice(finalPrice, coupon)
        }
      }
    }

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: product.currency,
            product_data: {
              name: product.title,
              description: product.description,
              images: [`${process.env.NEXT_PUBLIC_APP_URL}${product.image}`],
            },
            unit_amount: finalPrice,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}&product_id=${productId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop`,
      metadata: {
        productId: productId,
        couponCode: couponCode || '',
        promoCode: promoCode || '',
        countryCode: countryCode || '',
        pppDiscount: ppp.discount.toString(),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}