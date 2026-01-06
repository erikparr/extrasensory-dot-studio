'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const PROMO_CODE = 'FOAMLAUNCH20'

const PLATFORMS = [
  { id: 'macos', label: 'macOS' },
  { id: 'windows', label: 'Windows' },
  { id: 'linux', label: 'Linux' }
]

export default function FoamLaunchPage() {
  const [promoStats, setPromoStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')
  const [signupStatus, setSignupStatus] = useState(null)
  const [signingUp, setSigningUp] = useState(false)
  const [trialPlatform, setTrialPlatform] = useState('macos')
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    fetchPromoStats()
    const interval = setInterval(fetchPromoStats, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!promoStats?.nextReleaseTime) return

    const updateCountdown = () => {
      const now = Date.now()
      const diff = promoStats.nextReleaseTime - now

      if (diff <= 0) {
        setCountdown('')
        fetchPromoStats()
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (hours > 0) {
        setCountdown(`${hours}h ${minutes}m ${seconds}s`)
      } else if (minutes > 0) {
        setCountdown(`${minutes}m ${seconds}s`)
      } else {
        setCountdown(`${seconds}s`)
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [promoStats?.nextReleaseTime])

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
      const checkRes = await fetch('/api/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: PROMO_CODE })
      })

      const checkData = await checkRes.json()

      if (!checkData.available) {
        setError(checkData.error || 'No licenses available right now')
        await fetchPromoStats()
        setClaiming(false)
        return
      }

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

  const availableNow = promoStats?.availableNow || 0
  const claimed = promoStats?.claimed || 0
  const totalLicenses = promoStats?.totalLicenses || 20
  const allClaimed = claimed >= totalLicenses

  return (
    <div className="min-h-screen px-6 py-12" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/projects/foam" className="inline-block mb-6">
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
            foam launch giveaway
          </h1>

          <p style={{
            fontSize: '17px',
            color: '#888888',
            lineHeight: '1.6',
            maxWidth: '450px',
            margin: '0 auto'
          }}>
            20 free licenses releasing over 8 hours. Claim yours when available!
          </p>
        </div>

        {/* Video Section */}
        <div style={{
          maxWidth: '560px',
          margin: '0 auto 28px auto'
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

        {/* Giveaway Status Section */}
        {loading ? (
          <div style={{
            backgroundColor: '#0a0a0a',
            border: '1px solid #222',
            borderRadius: '8px',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#666', fontSize: '16px' }}>Loading...</div>
          </div>
        ) : allClaimed ? (
          <div style={{
            backgroundColor: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '18px',
              color: '#888',
              marginBottom: '20px'
            }}>
              All 20 licenses have been claimed!
            </div>

            <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
              Sign up for future giveaways and new releases.
            </p>

            {signupStatus?.success ? (
              <p style={{ color: '#4ade80', fontSize: '15px', fontWeight: '500' }}>
                {signupStatus.message}
              </p>
            ) : (
              <form onSubmit={handleSignup}>
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
                      backgroundColor: signingUp ? '#333' : '#e0e0e0',
                      color: signingUp ? '#666' : '#000',
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
          </div>
        ) : (
          <div style={{
            backgroundColor: '#0a0a0a',
            border: availableNow > 0 ? '2px solid #4ade80' : '1px solid #333',
            borderRadius: '8px',
            padding: '32px'
          }}>
            {/* Progress Bar */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '13px',
                color: '#666',
                marginBottom: '8px'
              }}>
                <span>{claimed} claimed</span>
                <span>{totalLicenses} total</span>
              </div>
              <div style={{
                height: '6px',
                backgroundColor: '#222',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(claimed / totalLicenses) * 100}%`,
                  height: '100%',
                  backgroundColor: '#666',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Available Now Counter */}
            {availableNow > 0 ? (
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                  fontSize: '64px',
                  fontWeight: '900',
                  color: '#4ade80',
                  lineHeight: '1'
                }}>
                  {availableNow}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#4ade80',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginTop: '8px'
                }}>
                  available now
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                  fontSize: '16px',
                  color: '#888',
                  marginBottom: '12px'
                }}>
                  Next license releases in
                </div>
                <div style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  color: '#e0e0e0',
                  fontFamily: 'monospace'
                }}>
                  {countdown || '...'}
                </div>
                <p style={{
                  fontSize: '13px',
                  color: '#666',
                  marginTop: '12px'
                }}>
                  Refresh the page or wait - licenses appear throughout the next 8 hours
                </p>
              </div>
            )}

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
              onClick={handleClaim}
              disabled={claiming || availableNow === 0}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '600',
                color: claiming || availableNow === 0 ? '#666' : '#000',
                backgroundColor: claiming || availableNow === 0 ? '#333' : '#4ade80',
                border: 'none',
                borderRadius: '4px',
                cursor: claiming || availableNow === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {claiming ? 'Claiming...' : availableNow > 0 ? 'Claim Free License' : 'No Licenses Available'}
            </button>

            {availableNow > 0 && (
              <p style={{
                fontSize: '13px',
                color: '#555',
                marginTop: '12px',
                textAlign: 'center'
              }}>
                You&apos;ll be redirected to checkout (total: $0)
              </p>
            )}
          </div>
        )}

        {/* Trial Download Section */}
        <div style={{
          marginTop: '28px',
          paddingTop: '24px',
          borderTop: '1px solid #1a1a1a',
          textAlign: 'center'
        }}>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
            Try the demo while you wait
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
                  color: trialPlatform === platform.id ? '#aaa' : '#666',
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
              color: '#aaa',
              fontWeight: '500',
              fontSize: '14px',
              borderRadius: '4px',
              textDecoration: 'none'
            }}
          >
            Download Free Demo
          </a>
        </div>

        {/* Footer Link */}
        <div style={{
          marginTop: '32px',
          textAlign: 'center'
        }}>
          <Link
            href="/projects/foam"
            style={{
              color: '#666',
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
