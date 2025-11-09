import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { generateDownloadToken, createSuccessPageUrl } from '@/lib/downloadTokens'
import { generatePurchaseEmail } from '@/lib/emails/purchaseConfirmation'
import { getProduct } from '@/lib/products'

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  })
}

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Search for customer in Stripe by email
    const stripe = getStripe()
    const customers = await stripe.customers.list({
      email: email.toLowerCase(),
      limit: 1
    })

    if (customers.data.length === 0) {
      // Don't reveal if email exists or not for security
      return NextResponse.json(
        { message: 'If this email has any purchases, a download link has been sent.' },
        { status: 200 }
      )
    }

    const customer = customers.data[0]

    // Get all successful checkout sessions for this customer
    const sessions = await stripe.checkout.sessions.list({
      customer: customer.id,
      limit: 100
    })

    // Filter for completed payments
    const completedSessions = sessions.data.filter(
      session => session.payment_status === 'paid' && session.metadata.productId
    )

    if (completedSessions.length === 0) {
      return NextResponse.json(
        { message: 'If this email has any purchases, a download link has been sent.' },
        { status: 200 }
      )
    }

    // Get the most recent purchase
    const latestSession = completedSessions[0]
    const productId = latestSession.metadata.productId
    const product = getProduct(productId)

    if (!product) {
      console.error('Product not found:', productId)
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Generate new download token
    const downloadToken = await generateDownloadToken(
      latestSession.id,
      productId,
      email
    )

    // Create success page URL
    const successPageUrl = createSuccessPageUrl(downloadToken, productId)

    // Generate and send email
    const emailContent = generatePurchaseEmail({
      customerEmail: email,
      product,
      downloadToken,
      successPageUrl
    })

    const resend = getResend()
    const { data, error } = await resend.emails.send({
      from: 'Extrasensory Studio <downloads@extrasensory.studio>',
      to: email,
      subject: `Your ${product.title} Download Link`,
      html: emailContent.html,
      text: emailContent.text
    })

    if (error) {
      console.error('Error sending email:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    console.log('Download link re-sent to:', email)

    return NextResponse.json({
      message: 'Download link sent! Check your inbox (and spam folder).'
    })

  } catch (error) {
    console.error('Request download error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
