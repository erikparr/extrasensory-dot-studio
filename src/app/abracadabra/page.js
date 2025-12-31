import { redirect } from 'next/navigation'

export default function AbracadabraPage() {
  redirect('/projects/foam')
}

/* PROMO TEMPLATE - DISABLED

import { useState, useEffect } from 'react'
import Link from 'next/link'

const FREE_PROMO_CODE = 'ABRACADABRA20'
const DISCOUNT_PROMO_CODE = 'ABRACADABRA'

const PLATFORMS = [
  { id: 'macos', label: 'macOS' },
  { id: 'windows', label: 'Windows' },
  { id: 'linux', label: 'Linux' }
]

export default function AbracadabraPageTemplate() {
  const [promoStats, setPromoStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)
  const [purchasing, setPurchasing] = useState(false)
  const [error, setError] = useState(null)
  const [trialPlatform, setTrialPlatform] = useState('macos')

  useEffect(() => {
    fetchPromoStats()
    const interval = setInterval(fetchPromoStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchPromoStats = async () => {
    try {
      const res = await fetch(`/api/promo?code=${FREE_PROMO_CODE}`)
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

  const handleClaimFree = async () => {
    setClaiming(true)
    setError(null)

    try {
      const checkRes = await fetch('/api/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: FREE_PROMO_CODE })
      })

      const checkData = await checkRes.json()

      if (!checkData.available) {
        setError(checkData.error || 'No free licenses available right now')
        await fetchPromoStats()
        setClaiming(false)
        return
      }

      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: 'foam-sampler',
          couponCode: FREE_PROMO_CODE
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

  const handlePurchaseDiscounted = async () => {
    setPurchasing(true)
    setError(null)

    try {
      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: 'foam-sampler',
          couponCode: DISCOUNT_PROMO_CODE
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

  const hasAvailableNow = promoStats?.availableNow > 0
  const allClaimed = promoStats?.claimed >= promoStats?.totalLicenses

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
            foam giveaway
          </h1>

          <p style={{
            fontSize: '17px',
            color: '#888888',
            lineHeight: '1.6',
            maxWidth: '420px',
            margin: '0 auto 24px auto'
          }}>
            We&apos;re giving away 25 free FOAM licenses. New licenses are released randomly throughout the day.
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

        {loading ? (
          <div style={{ color: '#666666', fontSize: '16px', textAlign: 'center' }}>Loading...</div>
        ) : (
          <>
            {/* Free License Section */}
            <div style={{
              backgroundColor: '#0a0a0a',
              border: '1px solid #2a2a2a',
              borderRadius: '8px',
              padding: '32px',
              marginBottom: '24px'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                  fontSize: '12px',
                  color: '#666666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px'
                }}>
                  Free Licenses
                </div>

                {allClaimed ? (
                  <div style={{ fontSize: '18px', color: '#666666' }}>
                    All 25 licenses have been claimed
                  </div>
                ) : hasAvailableNow ? (
                  <>
                    <div style={{
                      fontSize: '56px',
                      fontWeight: '900',
                      color: '#ffffff',
                      lineHeight: '1'
                    }}>
                      {promoStats.availableNow}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#888888',
                      marginTop: '8px'
                    }}>
                      available now
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{
                      fontSize: '24px',
                      color: '#aaaaaa',
                      marginBottom: '8px'
                    }}>
                      {promoStats?.claimed || 0} of 25 claimed
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#666666'
                    }}>
                      Next license drops soon — check back shortly
                    </div>
                  </>
                )}
              </div>

              {!allClaimed && (
                <>
                  <div style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '6px',
                    padding: '16px',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '13px', color: '#888888', margin: 0 }}>
                      Licenses are released at random times over 24 hours. Refresh or check back to catch the next drop.
                    </p>
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
                    disabled={true}
                    style={{
                      width: '100%',
                      padding: '16px',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#666666',
                      backgroundColor: '#333333',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'not-allowed',
                      transition: 'all 0.2s'
                    }}
                  >
                    Paused - Upvote to Unlock
                  </button>

                  {hasAvailableNow && (
                    <p style={{
                      fontSize: '12px',
                      color: '#555555',
                      marginTop: '12px',
                      textAlign: 'center'
                    }}>
                      You&apos;ll be redirected to checkout (total: $0)
                    </p>
                  )}
                </>
              )}
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
                  Limited Time Offer
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
                  Skip the wait — get FOAM now at a special price
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

              <button
                onClick={handlePurchaseDiscounted}
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

          </>
        )}
      </div>
    </div>
  )
}
*/
