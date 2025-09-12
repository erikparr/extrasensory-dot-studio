import { NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  })
}

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

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
      
      // Here you could:
      // - Send confirmation email
      // - Update database with purchase record
      // - Track analytics
      // - Generate license keys
      
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