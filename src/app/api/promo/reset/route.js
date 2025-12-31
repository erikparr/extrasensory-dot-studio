import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { getPromo, initializeTimedRelease } from '@/lib/promos'

// POST /api/promo/reset?code=ABRACADABRA20&secret=YOUR_SECRET
// Resets a timed release promo schedule (for admin use)
export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const secret = searchParams.get('secret')

  // Basic protection - check against env var
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!code) {
    return NextResponse.json({ error: 'Code required' }, { status: 400 })
  }

  const promo = getPromo(code)
  if (!promo) {
    return NextResponse.json({ error: 'Invalid promo code' }, { status: 404 })
  }

  if (!promo.timedRelease) {
    return NextResponse.json({ error: 'Not a timed release promo' }, { status: 400 })
  }

  // Delete existing schedule and count
  const scheduleKey = `promo:${code.toUpperCase()}:schedule`
  const startKey = `promo:${code.toUpperCase()}:start`
  const countKey = `promo:${code.toUpperCase()}:count`

  await kv.del(scheduleKey)
  await kv.del(startKey)
  await kv.del(countKey)

  // Reinitialize
  const result = await initializeTimedRelease(code)

  return NextResponse.json({
    success: true,
    message: 'Promo reset successfully',
    immediateReleases: promo.immediateReleases || 0,
    totalLicenses: promo.maxUses,
    newScheduleGenerated: !!result
  })
}
