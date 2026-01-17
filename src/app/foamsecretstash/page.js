'use client'
import { useState } from 'react'
import Link from 'next/link'

const PROMO_CODE = 'FOAMSECRETSTASH'

const PLATFORMS = [
  { id: 'macos', label: 'macOS' },
  { id: 'windows', label: 'Windows' },
  { id: 'linux', label: 'Linux' }
]

export default function SecretStashPage() {
  const [claiming, setClaiming] = useState(false)
  const [error, setError] = useState(null)
  const [trialPlatform, setTrialPlatform] = useState('macos')

  const handleClaim = async () => {
    setClaiming(true)
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
        setClaiming(false)
      }
    } catch (err) {
      setError('Something went wrong')
      setClaiming(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#000000' }}>
      <div className="text-center max-w-xl">
        <Link href="/" className="inline-block mb-8">
          <img
            src="/logo.svg"
            alt="extrasensory logo"
            className="w-20 h-20 mx-auto"
            style={{ filter: 'brightness(0.8)' }}
          />
        </Link>

        <div className="mb-8">
          <img
            src="/foam-logo.png"
            alt="FOAM"
            style={{
              width: '180px',
              height: 'auto',
              margin: '0 auto'
            }}
          />
        </div>

        <div style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '32px',
          marginBottom: '24px'
        }}>
          <div style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '8px'
          }}>
            Free
          </div>
          <p style={{
            fontSize: '15px',
            color: '#888888',
            marginBottom: '24px'
          }}>
            Full FOAM license + 250 AI credits
          </p>

          {error && (
            <div style={{
              color: '#ff6b6b',
              fontSize: '14px',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handleClaim}
            disabled={claiming}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '600',
              color: claiming ? '#666666' : '#000000',
              backgroundColor: claiming ? '#333333' : '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: claiming ? 'wait' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {claiming ? 'Processing...' : 'Claim License'}
          </button>
        </div>

        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid #1a1a1a'
        }}>
          <p style={{ color: '#555555', fontSize: '13px', marginBottom: '16px' }}>
            Or download the demo first
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
              border: '1px solid #333',
              color: '#888888',
              fontWeight: '500',
              fontSize: '14px',
              borderRadius: '4px',
              textDecoration: 'none'
            }}
          >
            Download Demo
          </a>
        </div>

        <div style={{ marginTop: '48px' }}>
          <Link
            href="/projects/foam"
            style={{
              color: '#555555',
              fontSize: '13px',
              textDecoration: 'none'
            }}
          >
            Learn more about FOAM
          </Link>
        </div>
      </div>
    </div>
  )
}
