import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import Stripe from 'stripe'
import { getProduct } from '@/lib/products'
import { verifyDownloadToken } from '@/lib/downloadTokens'

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  })
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token') // New token-based auth
    const sessionId = searchParams.get('session_id') // Legacy session-based auth
    const productId = searchParams.get('product_id')
    const platform = searchParams.get('platform') || 'macos' // Default to macOS for backwards compatibility
    const isFree = searchParams.get('free') === 'true'

    if (!productId) {
      return NextResponse.json(
        { error: 'Missing product_id' },
        { status: 400 }
      )
    }

    if (!token && !sessionId) {
      return NextResponse.json(
        { error: 'Missing token or session_id' },
        { status: 400 }
      )
    }

    // Validate platform
    const validPlatforms = ['macos', 'windows', 'linux']
    if (!validPlatforms.includes(platform)) {
      return NextResponse.json(
        { error: 'Invalid platform. Must be macos, windows, or linux' },
        { status: 400 }
      )
    }

    // Verify download authorization
    if (token) {
      // New token-based verification
      const tokenData = await verifyDownloadToken(token)

      if (!tokenData) {
        return NextResponse.json(
          { error: 'Invalid or expired download token' },
          { status: 403 }
        )
      }

      if (tokenData.productId !== productId) {
        return NextResponse.json(
          { error: 'Product mismatch' },
          { status: 403 }
        )
      }

      console.log('Token-based download for:', tokenData.customerEmail, productId)
    } else if (isFree && sessionId.startsWith('free_')) {
      // Handle free downloads (with coupon codes)
      console.log('Processing free download for product:', productId)
    } else {
      // Legacy session-based verification
      const stripe = getStripe()
      const session = await stripe.checkout.sessions.retrieve(sessionId)

      if (session.payment_status !== 'paid') {
        return NextResponse.json(
          { error: 'Payment not completed' },
          { status: 403 }
        )
      }

      if (session.metadata.productId !== productId) {
        return NextResponse.json(
          { error: 'Product mismatch' },
          { status: 403 }
        )
      }

      console.log('Session-based download for:', session.id, productId)
    }

    // Get product info
    const product = getProduct(productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Get platform-specific download file
    let downloadFile
    if (product.downloads && product.downloads[platform]) {
      downloadFile = product.downloads[platform].file
      console.log(`Serving ${platform} download: ${downloadFile}`)
    } else {
      // Fallback to legacy single download if no platform-specific downloads
      downloadFile = product.downloadFile
      console.log(`Using legacy download: ${downloadFile}`)
    }

    // Construct file path
    const filePath = path.join(process.cwd(), '..', 'distribution', downloadFile)
    
    try {
      // Check if file exists
      await fs.access(filePath)
      
      // Read the file
      const fileBuffer = await fs.readFile(filePath)
      
      // Set headers for file download
      const response = new NextResponse(fileBuffer)
      response.headers.set('Content-Type', 'application/zip')
      response.headers.set('Content-Disposition', `attachment; filename="${downloadFile}"`)
      response.headers.set('Content-Length', fileBuffer.length.toString())
      
      return response
    } catch (fileError) {
      console.error('File access error:', fileError)
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Download failed' },
      { status: 500 }
    )
  }
}