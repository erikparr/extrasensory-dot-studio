import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { kv } from '@vercel/kv'
import fs from 'fs'
import path from 'path'

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')

    // Verify admin secret
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { subject, testEmail, emailList } = await request.json()

    // Read the HTML template
    const templatePath = path.join(process.cwd(), 'emails', 'foam-launch.html')
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8')

    const resend = getResend()

    // If testEmail provided, send only to that address
    if (testEmail) {
      const personalizedHtml = htmlTemplate.replace(/\{\{email\}\}/g, encodeURIComponent(testEmail))

      const { data, error } = await resend.emails.send({
        from: 'Extrasensory <hello@extrasensory.studio>',
        to: testEmail,
        subject: subject || 'Introducing FOAM from Extrasensory',
        html: personalizedHtml
      })

      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: `Test email sent to ${testEmail}`,
        id: data?.id
      })
    }

    // Use provided emailList or fetch all subscribers
    const emails = emailList || await kv.get('newsletter:emails') || []

    if (emails.length === 0) {
      return NextResponse.json({ error: 'No emails to send to' }, { status: 400 })
    }

    const results = {
      sent: [],
      failed: []
    }

    // Send to each subscriber (with rate limiting)
    for (const email of emails) {
      try {
        const personalizedHtml = htmlTemplate.replace(/\{\{email\}\}/g, encodeURIComponent(email))

        const { data, error } = await resend.emails.send({
          from: 'Extrasensory <hello@extrasensory.studio>',
          to: email,
          subject: subject || 'Introducing FOAM from Extrasensory',
          html: personalizedHtml
        })

        if (error) {
          console.error(`Failed to send to ${email}:`, error)
          results.failed.push({ email, error: error.message })
        } else {
          results.sent.push({ email, id: data?.id })
        }

        // Rate limit: 600ms between emails (Resend allows 2/sec)
        await new Promise(resolve => setTimeout(resolve, 600))
      } catch (err) {
        console.error(`Error sending to ${email}:`, err)
        results.failed.push({ email, error: err.message })
      }
    }

    return NextResponse.json({
      success: true,
      total: emails.length,
      sent: results.sent.length,
      failed: results.failed.length,
      details: results
    })
  } catch (error) {
    console.error('Newsletter send error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
