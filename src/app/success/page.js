'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getProduct } from '@/lib/products'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const productId = searchParams.get('product_id')
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (productId) {
      const productData = getProduct(productId)
      setProduct(productData)
    }
  }, [productId])

  if (!sessionId || !productId || !product) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Invalid Purchase</h1>
        <p className="text-studio-gray-600 mb-8">This purchase link is invalid or has expired.</p>
        <Link href="/shop" className="btn-primary">
          Return to Shop
        </Link>
      </div>
    )
  }

  const downloadUrl = `/api/download?session_id=${sessionId}&product_id=${productId}`

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg text-studio-gray-600">
          Your purchase of <strong>{product.title}</strong> was successful.
        </p>
      </div>

      <div className="bg-studio-gray-100 rounded-lg p-8 mb-8">
        <div className="flex items-start gap-6">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-32 h-32 object-cover rounded-lg"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'block'
            }}
          />
          <div className="hidden w-32 h-32 bg-studio-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-studio-gray-500 text-sm">Image</span>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-studio-gray-600 mb-4">{product.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">What&apos;s Included:</h4>
                <ul className="text-studio-gray-600 space-y-1">
                  {product.files.map((file, index) => (
                    <li key={index}>• {file}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">System Requirements:</h4>
                <div className="text-studio-gray-600 space-y-1">
                  <div>• {product.systemRequirements.os}</div>
                  <div>• {product.systemRequirements.formats}</div>
                  <div>• {product.systemRequirements.architecture}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <a
          href={downloadUrl}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download {product.title} ({product.downloadSize})
        </a>
        <p className="text-sm text-studio-gray-600 mt-2">
          Download link is valid indefinitely. Keep this page bookmarked for future downloads.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="font-medium mb-3 text-blue-800">Installation Instructions</h3>
        <div className="text-sm text-blue-700 space-y-2">
          <p>1. Download and unzip the plugin package</p>
          <p>2. Copy the plugin files to your DAW&apos;s plugin directory:</p>
          <p className="pl-4">• VST3: <code className="bg-blue-100 px-2 py-1 rounded">/Library/Audio/Plug-Ins/VST3/</code></p>
          <p className="pl-4">• AU: <code className="bg-blue-100 px-2 py-1 rounded">/Library/Audio/Plug-Ins/Components/</code></p>
          <p>3. Restart your DAW and look for MIDI WARP in your MIDI effects</p>
          <p>4. Refer to the included User Manual for detailed usage instructions</p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-studio-gray-600 mb-4">
          Need help? Contact support at{' '}
          <a href="mailto:support@extrasensory.studio" className="text-studio-blue hover:underline">
            support@extrasensory.studio
          </a>
        </p>
        
        <div className="flex justify-center gap-4">
          <Link href="/shop" className="btn-secondary">
            Continue Shopping
          </Link>
          <Link href="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-6 py-16 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}