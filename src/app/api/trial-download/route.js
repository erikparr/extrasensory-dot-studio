import { NextResponse } from 'next/server'
import { getProduct } from '@/lib/products'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('product_id')
    const platform = searchParams.get('platform') || 'macos'

    if (!productId) {
      return NextResponse.json(
        { error: 'Missing product_id' },
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
    } else {
      downloadFile = product.downloadFile
    }

    // Log trial download for server-side tracking
    console.log(`Trial download: product=${productId}, platform=${platform}, file=${downloadFile}`)

    // Construct Blob URL
    const blobBaseUrl = 'https://hz2kxeiamjgndsso.public.blob.vercel-storage.com'
    const blobUrl = `${blobBaseUrl}/${downloadFile}`

    // Redirect to the Blob URL
    return NextResponse.redirect(blobUrl)

  } catch (error) {
    console.error('Trial download error:', error)
    return NextResponse.json(
      { error: 'Download failed' },
      { status: 500 }
    )
  }
}
