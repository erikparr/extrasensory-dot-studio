import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const key = 'newsletter:emails'

    // Get existing emails
    const emails = await kv.get(key) || []

    // Check for duplicate
    if (emails.includes(normalizedEmail)) {
      return NextResponse.json({ success: true, message: "You're already on the list!" })
    }

    // Add email
    emails.push(normalizedEmail)
    await kv.set(key, emails)

    return NextResponse.json({ success: true, message: "You're on the list!" })
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

// Admin endpoint to get subscriber count
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const emails = await kv.get('newsletter:emails') || []

  return NextResponse.json({
    count: emails.length,
    emails
  })
}
