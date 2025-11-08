'use client'
import Link from 'next/link'
import { useState } from 'react'
import ValueIndicator from '@/components/ValueIndicator'
import { getProduct } from '@/lib/products'
import { validateCoupon, calculateDiscountedPrice } from '@/lib/coupons'

export default function VexPage() {
  const product = getProduct('midi-warp')
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')

  const handleApplyCoupon = () => {
    if (!couponCode) return

    const coupon = validateCoupon(couponCode)
    if (coupon) {
      setAppliedCoupon(coupon)
      setCouponError('')
    } else {
      setCouponError('Invalid coupon code')
      setAppliedCoupon(null)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCouponError('')
  }

  const finalPrice = calculateDiscountedPrice(product.price, appliedCoupon)
  const isFree = finalPrice === 0

  const handlePurchase = async () => {
    try {
      if (isFree) {
        const fakeSessionId = 'free_' + Date.now()
        window.location.href = `/success?session_id=${fakeSessionId}&product_id=${product.id}&coupon=${appliedCoupon?.code || ''}&free=true`
        return
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          couponCode: appliedCoupon?.code,
        }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  // Create flowing wave effect: each bar progressively phase-shifted
  // Phase offset in radians (2π = full cycle)
  const phaseStep = (2 * Math.PI) / 10 // Divide full circle by 10 bars

  const indicatorPairs = [
    [
      { label: 'IN', color: '#D9D9D9', value: 85, animated: true, phaseOffset: phaseStep * 0, amplitude: 0.6, frequency: 1 },
      { label: 'OUT', color: '#CCFF00', value: 62, animated: true, phaseOffset: phaseStep * 1, amplitude: 0.8, frequency: 1 }
    ],
    [
      { label: 'IN', color: '#D9D9D9', value: 108, animated: true, phaseOffset: phaseStep * 2, amplitude: 0.6, frequency: 1 },
      { label: 'OUT', color: '#CCFF00', value: 45, animated: true, phaseOffset: phaseStep * 3, amplitude: 0.8, frequency: 1 }
    ],
    [
      { label: 'IN', color: '#D9D9D9', value: 95, animated: true, phaseOffset: phaseStep * 4, amplitude: 0.6, frequency: 1 },
      { label: 'OUT', color: '#CCFF00', value: 73, animated: true, phaseOffset: phaseStep * 5, amplitude: 0.8, frequency: 1 }
    ],
    [
      { label: 'IN', color: '#D9D9D9', value: 50, animated: true, phaseOffset: phaseStep * 6, amplitude: 0.6, frequency: 1 },
      { label: 'OUT', color: '#CCFF00', value: 110, animated: true, phaseOffset: phaseStep * 7, amplitude: 0.8, frequency: 1 }
    ],
    [
      { label: 'IN', color: '#D9D9D9', value: 120, animated: true, phaseOffset: phaseStep * 8, amplitude: 0.6, frequency: 1 },
      { label: 'OUT', color: '#CCFF00', value: 30, animated: true, phaseOffset: phaseStep * 9, amplitude: 0.8, frequency: 1 }
    ]
  ]

  return (
    <div className="min-h-screen" style={{
      backgroundColor: '#000000',
      '--bg-primary': '#000000',
      '--bg-secondary': '#0a0a0a',
      '--bg-tertiary': '#1a1a1a',
      '--border-color': '#2a2a2a',
      '--text-primary': '#ffffff',
      '--text-secondary': '#aaaaaa',
      '--text-tertiary': '#666666'
    }}>
      {/* VEX Title Section */}
      <div className="pt-32 pb-16 text-center px-6">
        <h1 style={{
          fontFamily: '"Bitcount Grid Single", monospace',
          fontSize: 'clamp(36px, 8vw, 48px)',
          fontWeight: '900',
          letterSpacing: '-0.02em',
          color: '#CCFF00',
          textTransform: 'lowercase',
          margin: '0 0 8px 0'
        }}>
          vex
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666666',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          margin: 0
        }}>
          Expressive MIDI
        </p>
      </div>

      {/* Value Indicators Section - 5 pairs of IN/OUT */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '80px',
        padding: '64px 24px'
      }}>
        {indicatorPairs.map((pair, index) => (
          <div key={index} style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center'
          }}>
            <ValueIndicator {...pair[0]} />
            <ValueIndicator {...pair[1]} />
          </div>
        ))}
      </div>

      {/* Description Section */}
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p style={{
          fontSize: '18px',
          color: '#999999',
          lineHeight: '1.75',
          marginBottom: '32px'
        }}>
          Revolutionary MIDI effect plugin that transforms static MIDI controller input
          into dynamic, expressive musical performance using real-time physics simulation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#purchase"
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Get VEX
          </a>
          <a
            href="#features"
            className="btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div style={{
            padding: '24px',
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '0'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#D9D9D9',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Physics-Based Transform
            </h3>
            <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.6' }}>
              Real-time bouncing ball simulation creates organic, expressive MIDI data from static controller input.
            </p>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '0'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#CCFF00',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              8 Simultaneous Mappings
            </h3>
            <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.6' }}>
              Control up to 8 different parameters at once with independent physics simulations.
            </p>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '0'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#D9D9D9',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Ultra-Low Latency
            </h3>
            <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.6' }}>
              Sub-10ms processing time with minimal CPU usage ensures responsive, real-time performance.
            </p>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '0'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#CCFF00',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Cross-Platform
            </h3>
            <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.6' }}>
              VST3 and AU formats work seamlessly on macOS and Windows with all major DAWs.
            </p>
          </div>
        </div>
      </div>

      {/* Purchase Section */}
      <div id="purchase" className="max-w-2xl mx-auto px-6 py-24 border-t" style={{ borderColor: '#2a2a2a' }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#ffffff',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          Get VEX
        </h2>

        <div style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: '8px',
          padding: '32px',
          marginTop: '32px'
        }}>
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            {appliedCoupon && finalPrice !== product.price && (
              <div style={{ fontSize: '18px', color: '#999999', textDecoration: 'line-through', marginBottom: '8px' }}>
                ${(product.price / 100).toFixed(2)}
              </div>
            )}
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#CCFF00' }}>
              {isFree ? 'FREE' : `$${(finalPrice / 100).toFixed(2)}`}
            </div>
            <div style={{ fontSize: '14px', color: '#666666', marginTop: '8px' }}>
              Cross-platform • VST3 & AU
            </div>
          </div>

          {/* Coupon Code Section */}
          <div style={{ marginBottom: '24px' }}>
            {!appliedCoupon ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Have a coupon code?"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: '#ffffff',
                    backgroundColor: '#0a0a0a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '4px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleApplyCoupon}
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    backgroundColor: '#2a2a2a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Apply
                </button>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(204, 255, 0, 0.1)',
                border: '1px solid #CCFF00',
                borderRadius: '4px',
                padding: '12px 16px'
              }}>
                <span style={{ fontSize: '14px', color: '#CCFF00' }}>
                  {appliedCoupon.code} - {appliedCoupon.description}
                </span>
                <button
                  onClick={handleRemoveCoupon}
                  style={{
                    fontSize: '14px',
                    color: '#CCFF00',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            )}
            {couponError && (
              <p style={{ fontSize: '14px', color: '#ff4444', marginTop: '8px' }}>{couponError}</p>
            )}
          </div>

          <button
            onClick={handlePurchase}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '18px',
              fontWeight: '600',
              color: '#000000',
              backgroundColor: '#CCFF00',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#b8e600'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#CCFF00'}
          >
            {isFree ? 'Download Free' : 'Purchase VEX'}
          </button>
        </div>
      </div>
    </div>
  )
}
