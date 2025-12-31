'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const PROMO_CODE = 'FREEFOAM11'

const PLATFORMS = [
  { id: 'macos', label: 'macOS' },
  { id: 'windows', label: 'Windows' },
  { id: 'linux', label: 'Linux' }
]

export default function FoamPromoPage() {
  const [promoStats, setPromoStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')
  const [signupStatus, setSignupStatus] = useState(null)
  const [signingUp, setSigningUp] = useState(false)
  const [trialPlatform, setTrialPlatform] = useState('macos')

  useEffect(() => {
    fetchPromoStats()
  }, [])

  const fetchPromoStats = async () => {
    try {
      const res = await fetch(`/api/promo?code=${PROMO_CODE}`)
      if (res.ok) {
        const data = await res.json()
        setPromoStats(data)
      } else {
        setError('Promo not found')
      }
    } catch (err) {
      setError('Failed to load promo')
    } finally {
      setLoading(false)
    }
  }

  const handleClaim = async () => {
    setClaiming(true)
    setError(null)

    try {
      // Check if still available
      const checkRes = await fetch('/api/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: PROMO_CODE })
      })

      const checkData = await checkRes.json()

      if (!checkData.available) {
        setError(checkData.error || 'Promo no longer available')
        await fetchPromoStats()
        setClaiming(false)
        return
      }

      // Redirect to checkout with promo code
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

  const isAvailable = promoStats && promoStats.remaining > 0

  const handleSignup = async (e) => {
    e.preventDefault()
    setSigningUp(true)
    setSignupStatus(null)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()

      if (res.ok) {
        setSignupStatus({ success: true, message: data.message })
        setEmail('')
      } else {
        setSignupStatus({ success: false, message: data.error })
      }
    } catch (err) {
      setSignupStatus({ success: false, message: 'Something went wrong' })
    } finally {
      setSigningUp(false)
    }
  }

  const accentColor = 'rgb(51, 0, 255)'

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#000000' }}>
      <div className="text-center max-w-xl">
        <Link href="/foam" className="inline-block mb-8">
          <img
            src="/logo.svg"
            alt="extrasensory logo"
            className="w-24 h-24 mx-auto"
            style={{ filter: 'drop-shadow(0 0 12px rgba(51, 0, 255, 0.6))' }}
          />
        </Link>

        <h1 style={{
          fontFamily: '"Bitcount Grid Single", monospace',
          fontSize: '48px',
          fontWeight: '900',
          color: accentColor,
          textTransform: 'lowercase',
          marginBottom: '16px'
        }}>
          Free FOAM License
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#aaaaaa',
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Claim one of 11 free licenses for FOAM - the AI-powered phoneme sampling instrument.
        </p>

        {loading ? (
          <div style={{ color: '#666666', fontSize: '16px' }}>Loading...</div>
        ) : !isAvailable ? (
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <p style={{ color: '#ff6b6b', fontSize: '18px', marginBottom: '16px' }}>
              All licenses have been claimed!
            </p>

            <p style={{ color: '#aaaaaa', fontSize: '14px', marginBottom: '16px' }}>
              Sign up for future giveaways and new tool releases.
            </p>

            {signupStatus?.success ? (
              <p style={{ color: accentColor, fontSize: '16px', fontWeight: '600' }}>
                {signupStatus.message}
              </p>
            ) : (
              <form onSubmit={handleSignup} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    style={{
                      padding: '12px 16px',
                      backgroundColor: '#000',
                      border: '1px solid #444',
                      borderRadius: '4px',
                      color: '#fff',
                      fontSize: '14px',
                      width: '200px'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={signingUp}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: signingUp ? '#333' : accentColor,
                      color: signingUp ? '#666' : '#fff',
                      fontWeight: '600',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: signingUp ? 'wait' : 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    {signingUp ? '...' : 'Sign Up'}
                  </button>
                </div>
                {signupStatus && !signupStatus.success && (
                  <p style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '8px' }}>
                    {signupStatus.message}
                  </p>
                )}
              </form>
            )}

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #333' }}>
              <p style={{ color: '#888', fontSize: '13px', marginBottom: '12px' }}>
                Try FOAM demo
              </p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' }}>
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setTrialPlatform(platform.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: trialPlatform === platform.id ? '#2a2a2a' : 'transparent',
                      border: `1px solid ${trialPlatform === platform.id ? accentColor : '#444'}`,
                      borderRadius: '4px',
                      color: trialPlatform === platform.id ? accentColor : '#888',
                      fontSize: '12px',
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
                  backgroundColor: accentColor,
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: '14px',
                  borderRadius: '4px',
                  textDecoration: 'none'
                }}
              >
                Download Demo
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Counter */}
            <div style={{
              backgroundColor: '#1a1a1a',
              border: `2px solid ${accentColor}`,
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <div style={{
                fontSize: '64px',
                fontWeight: '900',
                color: accentColor,
                lineHeight: '1'
              }}>
                {promoStats?.remaining}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#888888',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginTop: '8px'
              }}>
                of {promoStats?.total} remaining
              </div>
            </div>

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
              disabled={claiming || !isAvailable}
              style={{
                width: '100%',
                maxWidth: '300px',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '600',
                color: claiming ? '#666666' : '#ffffff',
                backgroundColor: claiming ? '#333333' : accentColor,
                border: 'none',
                borderRadius: '4px',
                cursor: claiming ? 'wait' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {claiming ? 'Claiming...' : 'Claim Free License'}
            </button>

            <p style={{
              fontSize: '13px',
              color: '#555555',
              marginTop: '16px'
            }}>
              You&apos;ll be redirected to checkout (total: $0)
            </p>
          </>
        )}

        <div style={{
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid #222'
        }}>
          <Link
            href="/foam"
            style={{
              color: '#666666',
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            Learn more about FOAM →
          </Link>
        </div>
      </div>
    </div>
  )
}
