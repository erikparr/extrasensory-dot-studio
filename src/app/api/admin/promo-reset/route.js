import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  // Simple secret-based auth
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { code, count = 0, clearEmails = false } = await request.json()

  if (!code) {
    return NextResponse.json({ error: 'Code required' }, { status: 400 })
  }

  const countKey = `promo:${code.toUpperCase()}:count`
  const emailKey = `promo:${code.toUpperCase()}:emails`

  // Reset count
  await kv.set(countKey, count)

  // Optionally clear emails
  if (clearEmails) {
    await kv.set(emailKey, [])
  }

  // Get current state
  const newCount = await kv.get(countKey)
  const emails = await kv.get(emailKey)

  return NextResponse.json({
    success: true,
    code: code.toUpperCase(),
    count: newCount,
    emailsCleared: clearEmails,
    emailCount: emails?.length || 0
  })
}
