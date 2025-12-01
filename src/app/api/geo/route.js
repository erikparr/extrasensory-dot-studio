import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { calculatePPPPrice, getCountryName } from '@/lib/ppp'
import { getProduct } from '@/lib/products'

export async function GET(request) {
  const headersList = await headers()

  // Vercel provides country code via x-vercel-ip-country header
  const countryCode = headersList.get('x-vercel-ip-country') || null

  // Get product price for calculation
  const product = getProduct('midi-warp')
  const ppp = calculatePPPPrice(product.price, countryCode)

  return NextResponse.json({
    countryCode: ppp.countryCode,
    countryName: getCountryName(ppp.countryCode),
    discount: ppp.discount,
    originalPrice: ppp.originalPrice,
    adjustedPrice: ppp.price
  })
}
