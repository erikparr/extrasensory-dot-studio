'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getProduct } from '@/lib/products'

function SuccessContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') // New token-based access
  const sessionId = searchParams.get('session_id') // Legacy session-based access
  const productId = searchParams.get('product_id')
  const [product, setProduct] = useState(null)
  const [selectedPlatform, setSelectedPlatform] = useState('macos') // Default platform
  const [licenseKey, setLicenseKey] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (productId) {
      const productData = getProduct(productId)
      setProduct(productData)
    }

    // Fetch license key if token or session_id is available
    async function fetchLicenseKey() {
      if (token || sessionId) {
        try {
          const queryParam = token ? `token=${token}` : `session_id=${sessionId}`
          const res = await fetch(`/api/get-license?${queryParam}`)
          if (res.ok) {
            const data = await res.json()
            setLicenseKey(data.licenseKey)
          } else {
            console.error('Failed to fetch license key:', await res.text())
          }
        } catch (error) {
          console.error('Error fetching license key:', error)
        }
      }
    }

    fetchLicenseKey()
  }, [productId, token, sessionId])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if ((!token && !sessionId) || !productId || !product) {
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

  // Build download URL with token (preferred) or session_id (legacy)
  const downloadUrl = token
    ? `/api/download?token=${token}&product_id=${productId}&platform=${selectedPlatform}`
    : `/api/download?session_id=${sessionId}&product_id=${productId}&platform=${selectedPlatform}`

  // Get platform-specific download info
  const platformInfo = product.downloads ? product.downloads[selectedPlatform] : null
  const downloadSize = platformInfo ? platformInfo.size : product.downloadSize
  const availableFormats = platformInfo ? platformInfo.formats.join(', ') : 'VST3, AU'

  // Platform metadata for UI
  const platforms = [
    { id: 'macos', label: 'macOS' },
    { id: 'windows', label: 'Windows' },
    { id: 'linux', label: 'Linux' }
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#ccff33'}}>
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="w-32 h-32 bg-studio-gray-300 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
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

      {/* LICENSE KEY CARD */}
      {licenseKey && (
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-8 text-center">
          <h3 className="text-xl font-bold text-green-900 mb-3">
            🔑 Your License Key
          </h3>

          <div className="bg-white rounded p-4 mb-4 flex items-center justify-center gap-3 flex-wrap">
            <code className="text-2xl font-bold text-green-600 tracking-wider font-mono">
              {licenseKey}
            </code>
            <button
              onClick={() => copyToClipboard(licenseKey)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>

          <p className="text-sm text-green-800 mb-3">
            Save this key! You&apos;ll need it to activate the plugin after installation.
          </p>

          <div className="bg-green-100 border border-green-300 rounded p-3 text-left text-xs text-green-900">
            <strong>Activation Steps:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Download and install the plugin below</li>
              <li>Open VEX MIDI EXPRESSION in your DAW</li>
              <li>Click &quot;Activate License&quot; in the trial banner</li>
              <li>Paste your license key and click &quot;Activate&quot;</li>
            </ol>
          </div>
        </div>
      )}

      {/* Platform Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-center mb-4">Select Your Platform</h3>
        <div className="flex justify-center gap-3 mb-6">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`px-6 py-3 rounded-lg border-2 transition-all font-medium ${
                selectedPlatform === platform.id
                  ? 'text-black'
                  : 'border-studio-gray-300 hover:border-studio-gray-400 bg-white text-black'
              }`}
              style={selectedPlatform === platform.id ? {backgroundColor: '#ccff33', borderColor: '#ccff33'} : {}}
            >
              {platform.label}
            </button>
          ))}
        </div>

        {/* Platform-specific info */}
        {platformInfo && (
          <div className="text-center text-sm text-studio-gray-600 mb-4">
            <p>Formats: <strong>{availableFormats}</strong> • Size: <strong>{downloadSize}</strong></p>
          </div>
        )}
      </div>

      <div className="text-center mb-8">
        <a
          href={downloadUrl}
          className="inline-flex items-center gap-2 text-black px-8 py-4 rounded-lg font-medium transition-colors"
          style={{backgroundColor: '#ccff33'}}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#b8e600'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ccff33'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download for {platforms.find(p => p.id === selectedPlatform)?.label} ({downloadSize})
        </a>
        <p className="text-sm text-studio-gray-600 mt-2">
          Download link is valid indefinitely. Keep this page bookmarked for future downloads.
        </p>
      </div>

      <div className="bg-studio-gray-100 border border-studio-gray-300 rounded-lg p-6 mb-8">
        <h3 className="font-medium mb-3 text-studio-black">Installation Instructions for {platforms.find(p => p.id === selectedPlatform)?.label}</h3>
        <div className="text-sm text-studio-gray-700 space-y-2">
          <p>1. Download and unzip the plugin package</p>
          <p>2. Copy the plugin files to your DAW&apos;s plugin directory:</p>

          {selectedPlatform === 'macos' && (
            <>
              <p className="pl-4">• VST3: <code className="bg-studio-gray-200 px-2 py-1 rounded">/Library/Audio/Plug-Ins/VST3/</code></p>
              <p className="pl-4">• AU: <code className="bg-studio-gray-200 px-2 py-1 rounded">/Library/Audio/Plug-Ins/Components/</code></p>
              <p>3. If you see a security warning, go to System Preferences → Security & Privacy and allow the plugin</p>
            </>
          )}

          {selectedPlatform === 'windows' && (
            <>
              <p className="pl-4">• VST3: <code className="bg-studio-gray-200 px-2 py-1 rounded">C:\Program Files\Common Files\VST3\</code></p>
              <p>3. If Windows Defender blocks the plugin, add an exception for the .vst3 file</p>
            </>
          )}

          {selectedPlatform === 'linux' && (
            <>
              <p className="pl-4">• VST3: <code className="bg-studio-gray-200 px-2 py-1 rounded">~/.vst3/</code> or <code className="bg-studio-gray-200 px-2 py-1 rounded">/usr/lib/vst3/</code></p>
              <p>3. Ensure the .vst3 file has executable permissions: <code className="bg-studio-gray-200 px-2 py-1 rounded">chmod +x *.vst3</code></p>
            </>
          )}

          <p>{selectedPlatform === 'macos' ? '4' : '4'}. Restart your DAW and look for VEX MIDI EXPRESSION in your MIDI effects</p>
          <p>{selectedPlatform === 'macos' ? '5' : '5'}. Refer to the included User Manual for detailed usage instructions</p>
        </div>
      </div>

      {/* DAW Setup Guides */}
      <div className="bg-studio-gray-100 border border-studio-gray-300 rounded-lg p-6 mb-8">
        <h3 className="font-medium mb-3 text-studio-black">DAW Setup Guides</h3>
        <p className="text-sm text-studio-gray-700 mb-4">
          Need help setting up VEX in your DAW? Check out our step-by-step guides:
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects/vex/guides/ableton"
            className="px-4 py-2 bg-studio-gray-200 hover:bg-studio-gray-300 rounded text-sm font-medium text-studio-black transition-colors"
          >
            Ableton Live
          </Link>
          <Link
            href="/projects/vex/guides/logic-pro"
            className="px-4 py-2 bg-studio-gray-200 hover:bg-studio-gray-300 rounded text-sm font-medium text-studio-black transition-colors"
          >
            Logic Pro
          </Link>
          <Link
            href="/projects/vex/guides/reaper"
            className="px-4 py-2 bg-studio-gray-200 hover:bg-studio-gray-300 rounded text-sm font-medium text-studio-black transition-colors"
          >
            REAPER
          </Link>
          <Link
            href="/projects/vex/guides"
            className="px-4 py-2 bg-transparent border border-studio-gray-400 hover:border-studio-gray-500 rounded text-sm font-medium text-studio-gray-600 transition-colors"
          >
            All Guides
          </Link>
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