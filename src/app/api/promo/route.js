import { NextResponse } from 'next/server'
import { getPromoStats, isPromoAvailable } from '@/lib/promos'

// GET /api/promo?code=ABRACADABRA11 - Check promo status
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'Code required' }, { status: 400 })
  }

  const stats = await getPromoStats(code)

  if (!stats) {
    return NextResponse.json({ error: 'Invalid promo code' }, { status: 404 })
  }

  return NextResponse.json(stats)
}

// POST /api/promo - Validate promo code (pre-checkout check)
export async function POST(request) {
  const { code } = await request.json()

  if (!code) {
    return NextResponse.json({ error: 'Code required' }, { status: 400 })
  }

  const result = await isPromoAvailable(code)

  return NextResponse.json(result)
}
