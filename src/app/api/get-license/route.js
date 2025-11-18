import { NextResponse } from 'next/server'
import { getLicenseBySession } from '@/lib/licenseKeys'
import { verifyDownloadToken } from '@/lib/downloadTokens'

/**
 * GET /api/get-license?token={downloadToken}
 *
 * Retrieves license key associated with a download token
 * Used by success page to display license after purchase
 *
 * @param {string} token - Download token from purchase
 * @returns {object} { licenseKey, productId } or error
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Missing token parameter' },
        { status: 400 }
      )
    }

    // Verify download token
    const tokenData = await verifyDownloadToken(token)

    if (!tokenData) {
      return NextResponse.json(
        { error: 'Invalid or expired download token' },
        { status: 403 }
      )
    }

    // Get license by session ID
    const license = await getLicenseBySession(tokenData.sessionId)

    if (!license) {
      return NextResponse.json(
        { error: 'License not found for this purchase' },
        { status: 404 }
      )
    }

    // Return license key and product ID
    return NextResponse.json({
      licenseKey: license.licenseKey,
      productId: license.productId,
      purchaseDate: license.purchaseDate
    })

  } catch (error) {
    console.error('Get license error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve license key' },
      { status: 500 }
    )
  }
}
