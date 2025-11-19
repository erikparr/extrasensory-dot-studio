import { NextResponse } from 'next/server'
import { getLicenseBySession } from '@/lib/licenseKeys'
import { verifyDownloadToken } from '@/lib/downloadTokens'

/**
 * GET /api/get-license?token={downloadToken}
 * GET /api/get-license?session_id={stripeSessionId}
 *
 * Retrieves license key associated with a download token or Stripe session
 * Used by success page to display license after purchase
 *
 * @param {string} token - Download token from purchase (optional)
 * @param {string} session_id - Stripe session ID (optional)
 * @returns {object} { licenseKey, productId } or error
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const sessionId = searchParams.get('session_id')

    if (!token && !sessionId) {
      return NextResponse.json(
        { error: 'Missing token or session_id parameter' },
        { status: 400 }
      )
    }

    let license = null

    if (sessionId) {
      // Direct lookup by session ID
      license = await getLicenseBySession(sessionId)
    } else if (token) {
      // Verify download token first
      const tokenData = await verifyDownloadToken(token)

      if (!tokenData) {
        return NextResponse.json(
          { error: 'Invalid or expired download token' },
          { status: 403 }
        )
      }

      // Get license by session ID from token
      license = await getLicenseBySession(tokenData.sessionId)
    }

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
