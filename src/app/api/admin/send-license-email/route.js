import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getProduct } from '@/lib/products'
import { generateDownloadToken, createSuccessPageUrl } from '@/lib/downloadTokens'

const ADMIN_SECRET = process.env.FOAM_ADMIN_SECRET

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request) {
  // Verify admin secret
  const authHeader = request.headers.get('x-admin-secret')
  if (!ADMIN_SECRET || authHeader !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { email, license_key, product_id = 'foam-sampler' } = await request.json()

  if (!email || !license_key) {
    return NextResponse.json({ error: 'email and license_key required' }, { status: 400 })
  }

  const product = getProduct(product_id)
  if (!product) {
    return NextResponse.json({ error: 'Invalid product_id' }, { status: 400 })
  }

  try {
    // Generate download token for this email
    const downloadToken = await generateDownloadToken(
      `manual-${Date.now()}`,
      product_id,
      email
    )
    const successPageUrl = createSuccessPageUrl(downloadToken, product_id)

    // Generate email content
    const { generatePurchaseEmail } = await import('@/lib/emails/purchaseConfirmation')
    const emailContent = generatePurchaseEmail({
      customerEmail: email,
      product,
      downloadToken,
      successPageUrl,
      licenseKey: license_key
    })

    // Send via Resend
    const resend = getResend()
    const { data, error } = await resend.emails.send({
      from: 'Extrasensory Studio <downloads@extrasensory.studio>',
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text
    })

    if (error) {
      console.error('Error sending email:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      email_id: data.id,
      sent_to: email,
      license_key
    })
  } catch (error) {
    console.error('Error sending license email:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
