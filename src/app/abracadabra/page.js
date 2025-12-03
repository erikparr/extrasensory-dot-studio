'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const PROMO_CODE = 'ABRACADABRA11'

export default function PromoPage() {
  const [promoStats, setPromoStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)
  const [error, setError] = useState(null)

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
          productId: 'midi-warp',
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

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#000000' }}>
      <div className="text-center max-w-xl">
        <Link href="/projects/vex" className="inline-block mb-8">
          <img
            src="/logo.svg"
            alt="extrasensory logo"
            className="w-24 h-24 mx-auto"
            style={{ filter: 'drop-shadow(0 0 12px rgba(204, 255, 0, 0.6))' }}
          />
        </Link>

        <h1 style={{
          fontFamily: '"Bitcount Grid Single", monospace',
          fontSize: '48px',
          fontWeight: '900',
          color: '#ccff33',
          textTransform: 'lowercase',
          marginBottom: '16px'
        }}>
          Free VEX License
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#aaaaaa',
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Claim one of 11 free licenses for VEX - the physics-based MIDI expression plugin.
        </p>

        {loading ? (
          <div style={{ color: '#666666', fontSize: '16px' }}>Loading...</div>
        ) : error && !isAvailable ? (
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
            <Link
              href="/projects/vex"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#ccff33',
                color: '#000000',
                fontWeight: '600',
                borderRadius: '4px',
                textDecoration: 'none'
              }}
            >
              Get VEX at $25
            </Link>
          </div>
        ) : (
          <>
            {/* Counter */}
            <div style={{
              backgroundColor: '#1a1a1a',
              border: '2px solid #ccff33',
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <div style={{
                fontSize: '64px',
                fontWeight: '900',
                color: '#ccff33',
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
                color: claiming ? '#666666' : '#000000',
                backgroundColor: claiming ? '#333333' : '#ccff33',
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
            href="/projects/vex"
            style={{
              color: '#666666',
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            Learn more about VEX →
          </Link>
        </div>
      </div>
    </div>
  )
}
