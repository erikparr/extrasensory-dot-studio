'use client'
import { useState } from 'react'
import Link from 'next/link'

const PROMO_CODE = 'KVRFOAM'

const PLATFORMS = [
  { id: 'macos', label: 'macOS' },
  { id: 'windows', label: 'Windows' },
  { id: 'linux', label: 'Linux' }
]

export default function FoamKvrPage() {
  const [purchasing, setPurchasing] = useState(false)
  const [error, setError] = useState(null)
  const [trialPlatform, setTrialPlatform] = useState('macos')

  const handlePurchase = async () => {
    setPurchasing(true)
    setError(null)

    try {
      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: 'foam-sampler',
          couponCode: PROMO_CODE
        })
      })

      const checkoutData = await checkoutRes.json()

      if (checkoutData.url) {
        window.location.href = checkoutData.url
      } else {
        setError(checkoutData.error || 'Failed to start checkout')
        setPurchasing(false)
      }
    } catch (err) {
      setError('Something went wrong')
      setPurchasing(false)
    }
  }

  return (
    <div className="min-h-screen px-6 py-12" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/projects/foam" className="inline-block mb-8">
            <img
              src="/logo.svg"
              alt="extrasensory logo"
              className="w-20 h-20 mx-auto"
              style={{ filter: 'brightness(0.8)' }}
            />
          </Link>

          <h1 style={{
            fontFamily: '"Bitcount Grid Single", monospace',
            fontSize: '42px',
            fontWeight: '900',
            color: '#e0e0e0',
            textTransform: 'lowercase',
            marginBottom: '12px'
          }}>
            foam sampler
          </h1>

          <p style={{
            fontSize: '17px',
            color: '#888888',
            lineHeight: '1.6',
            maxWidth: '420px',
            margin: '0 auto 24px auto'
          }}>
            AI-powered phoneme sampling instrument. Turn any text into playable vocal sounds.
          </p>

          <Link
            href="/projects/foam"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '4px',
              color: '#aaaaaa',
              fontSize: '14px',
              fontWeight: '500',
              textDecoration: 'none'
            }}
          >
            Learn about FOAM →
          </Link>
        </div>

        {/* Video Section */}
        <div style={{
          maxWidth: '560px',
          margin: '0 auto 32px auto'
        }}>
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden',
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '8px'
          }}>
            <iframe
              src="https://www.youtube.com/embed/iebzvL85_fo"
              title="FOAM Demo Video"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '8px'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* $20 Promo Section */}
        <div style={{
          backgroundColor: '#0a0a0a',
          border: '2px solid #333333',
          borderRadius: '8px',
          padding: '32px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              fontSize: '12px',
              color: '#888888',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '8px'
            }}>
              KVR Audio Exclusive
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '8px'
            }}>
              <span style={{
                fontSize: '48px',
                fontWeight: '700',
                color: '#ffffff'
              }}>
                $20
              </span>
              <span style={{
                fontSize: '20px',
                color: '#666666',
                textDecoration: 'line-through'
              }}>
                $25
              </span>
            </div>
            <p style={{
              fontSize: '15px',
              color: '#aaaaaa',
              margin: '0 0 4px 0'
            }}>
              Full license at a special price
            </p>
            <p style={{
              fontSize: '13px',
              color: '#666666',
              margin: 0
            }}>
              Includes 250 AI generation credits
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '24px'
          }}>
            {[
              'Full plugin license (VST3, AU)',
              'All platforms: macOS, Windows, Linux',
              '250 credits for AI phoneme generation',
              'Lifetime updates'
            ].map((benefit, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                color: '#aaaaaa'
              }}>
                <span style={{ color: '#666666' }}>✓</span>
                {benefit}
              </div>
            ))}
          </div>

          {error && (
            <div style={{
              color: '#ff6b6b',
              fontSize: '14px',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handlePurchase}
            disabled={purchasing}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '600',
              color: purchasing ? '#666666' : '#000000',
              backgroundColor: purchasing ? '#333333' : '#e0e0e0',
              border: 'none',
              borderRadius: '4px',
              cursor: purchasing ? 'wait' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {purchasing ? 'Processing...' : 'Get FOAM for $20'}
          </button>
        </div>

        {/* Trial Download Section */}
        <div style={{
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid #1a1a1a',
          textAlign: 'center'
        }}>
          <p style={{ color: '#666666', fontSize: '14px', marginBottom: '16px' }}>
            Want to try before you buy?
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' }}>
            {PLATFORMS.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setTrialPlatform(platform.id)}
                style={{
                  padding: '6px 14px',
                  backgroundColor: trialPlatform === platform.id ? '#1a1a1a' : 'transparent',
                  border: `1px solid ${trialPlatform === platform.id ? '#444' : '#333'}`,
                  borderRadius: '4px',
                  color: trialPlatform === platform.id ? '#aaaaaa' : '#666666',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                {platform.label}
              </button>
            ))}
          </div>
          <a
            href={`/api/trial-download?product_id=foam-sampler&platform=${trialPlatform}`}
            style={{
              display: 'inline-block',
              padding: '10px 24px',
              backgroundColor: 'transparent',
              border: '1px solid #444',
              color: '#aaaaaa',
              fontWeight: '500',
              fontSize: '14px',
              borderRadius: '4px',
              textDecoration: 'none'
            }}
          >
            Download Free Demo
          </a>
        </div>
      </div>
    </div>
  )
}
