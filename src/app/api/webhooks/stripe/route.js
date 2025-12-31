import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { generateDownloadToken, createSuccessPageUrl } from '@/lib/downloadTokens'
import { generatePurchaseEmail } from '@/lib/emails/purchaseConfirmation'
import { getProduct } from '@/lib/products'
import { recordPromoRedemption } from '@/lib/promos'

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  })
}

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set - emails will not be sent')
    return null
  }
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  let event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object

      console.log('Payment successful for session:', session.id)
      console.log('Product:', session.metadata.productId)
      console.log('Customer email:', session.customer_details?.email)

      // Get product and customer info
      const productId = session.metadata.productId
      const customerEmail = session.customer_details?.email
      const product = getProduct(productId)

      if (!product) {
        console.error('Product not found:', productId)
        break
      }

      if (!customerEmail) {
        console.error('No customer email found in session:', session.id)
        break
      }

      try {
        // Generate download token
        const downloadToken = await generateDownloadToken(
          session.id,
          productId,
          customerEmail
        )

        // Generate license key with product-specific prefix
        const { generateLicenseKey, storeLicense } = await import('@/lib/licenseKeys')
        const licenseKey = generateLicenseKey(productId)

        // Store license in KV
        await storeLicense(licenseKey, session.id, productId, customerEmail)

        console.log('License key generated and stored:', licenseKey)

        // Sync FOAM licenses to foam-studio-api (Redis)
        if (productId === 'foam-sampler' && process.env.FOAM_API_URL && process.env.FOAM_ADMIN_SECRET) {
          try {
            const foamRes = await fetch(`${process.env.FOAM_API_URL}/api/admin/licenses/register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Admin-Secret': process.env.FOAM_ADMIN_SECRET
              },
              body: JSON.stringify({
                license_key: licenseKey,
                email: customerEmail,
                starter_credits: 250
              })
            })
            if (foamRes.ok) {
              console.log('License synced to FOAM API:', licenseKey)
            } else {
              console.error('Failed to sync license to FOAM API:', await foamRes.text())
            }
          } catch (foamErr) {
            console.error('Error syncing license to FOAM API:', foamErr)
          }
        }

        // Record promo redemption if applicable
        const promoCode = session.metadata?.promoCode
        if (promoCode) {
          await recordPromoRedemption(promoCode, customerEmail, session.id)
          console.log('Promo redemption recorded:', promoCode)
        }

        // Create success page URL with token
        const successPageUrl = createSuccessPageUrl(downloadToken, productId)

        // Generate email
        const emailContent = generatePurchaseEmail({
          customerEmail,
          product,
          downloadToken,
          successPageUrl,
          licenseKey
        })

        // Send email via Resend
        const resend = getResend()
        if (resend) {
          const { data, error } = await resend.emails.send({
            from: 'Extrasensory Studio <downloads@extrasensory.studio>',
            to: customerEmail,
            subject: emailContent.subject,
            html: emailContent.html,
            text: emailContent.text
          })

          if (error) {
            console.error('Error sending email:', error)
          } else {
            console.log('Purchase confirmation email sent:', data.id)
          }
        } else {
          console.log('Resend not configured - skipping email')
          console.log('Download URL:', successPageUrl)
        }
      } catch (error) {
        console.error('Error processing checkout completion:', error)
      }

      break

    case 'payment_intent.payment_failed':
      const paymentIntent = event.data.object
      console.log('Payment failed:', paymentIntent.id)
      
      // Handle failed payment
      // - Send notification
      // - Log for review
      
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}