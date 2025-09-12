import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import Stripe from 'stripe'
import { getProduct } from '@/lib/products'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')
    const productId = searchParams.get('product_id')
    const isFree = searchParams.get('free') === 'true'

    if (!sessionId || !productId) {
      return NextResponse.json(
        { error: 'Missing session_id or product_id' },
        { status: 400 }
      )
    }

    // Handle free downloads (with coupon codes)
    if (isFree && sessionId.startsWith('free_')) {
      console.log('Processing free download for product:', productId)
    } else {
      // Verify the Stripe session for paid downloads
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
    }

    // Get product info
    const product = getProduct(productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Construct file path
    const filePath = path.join(process.cwd(), '..', 'distribution', product.downloadFile)
    
    try {
      // Check if file exists
      await fs.access(filePath)
      
      // Read the file
      const fileBuffer = await fs.readFile(filePath)
      
      // Set headers for file download
      const response = new NextResponse(fileBuffer)
      response.headers.set('Content-Type', 'application/zip')
      response.headers.set('Content-Disposition', `attachment; filename="${product.downloadFile}"`)
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