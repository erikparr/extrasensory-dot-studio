'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { track } from '@vercel/analytics/react'
import ValueIndicator from '@/components/ValueIndicator'
import VolumetricShader from '@/components/VolumetricShader'
import { getProduct } from '@/lib/products'

export default function VexPage() {
  const product = getProduct('midi-warp')
  const [trialPlatform, setTrialPlatform] = useState('macos')
  const [geoPrice, setGeoPrice] = useState(null)

  useEffect(() => {
    fetch('/api/geo')
      .then(res => res.json())
      .then(data => setGeoPrice(data))
      .catch(() => setGeoPrice(null))
  }, [])

  const handlePurchase = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          countryCode: geoPrice?.countryCode,
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

  const handleTrialDownload = () => {
    track('trial_download', { platform: trialPlatform, product: product.id })
    window.location.href = `/api/trial-download?product_id=${product.id}&platform=${trialPlatform}`
  }

  // Create flowing wave effect: each bar progressively phase-shifted
  // Phase offset in radians (2π = full cycle)
  const phaseStep = (2 * Math.PI) / 10 // Divide full circle by 10 bars

  const indicatorPairs = [
    [
      { label: 'IN', color: '#D9D9D9', value: 85, animated: true, phaseOffset: phaseStep * 0, amplitude: 0.6, frequency: 1 },
      { label: 'OUT', color: '#ccff33', value: 62, animated: true, phaseOffset: phaseStep * 1, amplitude: 0.8, frequency: 1 }
    ],
    [
      { label: 'IN', color: '#D9D9D9', value: 108, animated: true, phaseOffset: phaseStep * 2, amplitude: 0.6, frequency: 1 },
      { label: 'OUT', color: '#ccff33', value: 45, animated: true, phaseOffset: phaseStep * 3, amplitude: 0.8, frequency: 1 }
    ],
    [
      { label: 'IN', color: '#D9D9D9', value: 95, animated: true, phaseOffset: phaseStep * 4, amplitude: 0.6, frequency: 1 },
      { label: 'OUT', color: '#ccff33', value: 73, animated: true, phaseOffset: phaseStep * 5, amplitude: 0.8, frequency: 1 }
    ],
    [
      { label: 'IN', color: '#D9D9D9', value: 50, animated: true, phaseOffset: phaseStep * 6, amplitude: 0.6, frequency: 1 },
      { label: 'OUT', color: '#ccff33', value: 110, animated: true, phaseOffset: phaseStep * 7, amplitude: 0.8, frequency: 1 }
    ],
    [
      { label: 'IN', color: '#D9D9D9', value: 120, animated: true, phaseOffset: phaseStep * 8, amplitude: 0.6, frequency: 1 },
      { label: 'OUT', color: '#ccff33', value: 30, animated: true, phaseOffset: phaseStep * 9, amplitude: 0.8, frequency: 1 }
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
      {/* Volumetric Shader Header */}
      <div className="relative" style={{ height: '50vh' }}>
        <VolumetricShader
          className="absolute inset-0 w-full h-full"
        />
        {/* Gradient fade to black at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, transparent, #000000)'
          }}
        />
      </div>

      {/* VEX Title Section */}
      <div className="pt-8 pb-16 text-center px-6">
        <h1 style={{
          fontFamily: '"Bitcount Grid Single", monospace',
          fontSize: 'clamp(36px, 8vw, 48px)',
          fontWeight: '900',
          letterSpacing: '-0.02em',
          color: '#ccff33',
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
          margin: '0 0 24px 0'
        }}>
          Expressive MIDI
        </p>
        <p style={{
          fontSize: '16px',
          color: '#aaaaaa',
          maxWidth: '400px',
          margin: '0 auto 24px auto',
          lineHeight: '1.5'
        }}>
          Turn any MIDI controller into a physics-based performance instrument.
        </p>
        <a
          href="#purchase"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            backgroundColor: '#ccff33',
            color: '#000000',
            fontWeight: '600',
            fontSize: '15px',
            borderRadius: '4px',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          Free Download
        </a>
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

      {/* Hero Section */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 style={{
          fontSize: 'clamp(24px, 4vw, 32px)',
          fontWeight: '400',
          lineHeight: '1.4',
          letterSpacing: '-0.01em',
          color: '#ffffff',
          marginBottom: '32px'
        }}>
          Turn any MIDI controller into a physics-based performance instrument.
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#purchase"
            className="btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px 28px',
              fontSize: '15px'
            }}
          >
            Free Trial
          </a>
          <a
            href="#purchase"
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px 28px',
              fontSize: '15px'
            }}
          >
            Buy VEX – ${geoPrice?.adjustedPrice ? (geoPrice.adjustedPrice / 100).toFixed(0) : '25'}
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
              Five physics modes—<strong style={{ color: '#D9D9D9' }}>gravity, springs, curves, jitter, and note-triggers</strong>—transform static CC into dynamic expression.
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
              color: '#ccff33',
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
              color: '#ccff33',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              macOS • Windows • Linux
            </h3>
            <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.6' }}>
              VST3 and AU formats work seamlessly on macOS and Windows with all major DAWs.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Video Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div style={{
          maxWidth: '640px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '24px'
          }}>
            See VEX in Action
          </h3>
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
              src="https://www.youtube.com/embed/WPRROqgEx1U"
              title="VEX Demo Video"
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
      </div>

      {/* Setup Guides Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: '8px',
          padding: '32px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '12px'
          }}>
            DAW Setup Guides
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#888888',
            marginBottom: '24px',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Step-by-step instructions for setting up VEX in Ableton Live, Logic Pro, REAPER, and other DAWs.
          </p>
          <Link
            href="/projects/vex/guides"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#ccff33',
              backgroundColor: 'transparent',
              border: '1px solid #ccff33',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
          >
            View Setup Guides
          </Link>
        </div>
      </div>

      {/* Purchase Section */}
      <div id="purchase" className="max-w-4xl mx-auto px-6 py-24 border-t" style={{ borderColor: '#2a2a2a' }}>
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
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '32px'
        }}>
          {/* Trial Card */}
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Try Free
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>
                14-Day Trial
              </div>
              <div style={{ fontSize: '14px', color: '#888888' }}>
                Full features included
              </div>
            </div>

            {/* Platform Selection */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                Select Platform
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { id: 'macos', label: 'macOS', formats: 'VST3, AU' },
                  { id: 'windows', label: 'Windows', formats: 'VST3' },
                  { id: 'linux', label: 'Linux', formats: 'VST3' }
                ].map((platform) => (
                  <label
                    key={platform.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: trialPlatform === platform.id ? '#2a2a2a' : 'transparent',
                      border: `1px solid ${trialPlatform === platform.id ? '#ccff33' : '#333333'}`,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input
                      type="radio"
                      name="platform"
                      value={platform.id}
                      checked={trialPlatform === platform.id}
                      onChange={(e) => setTrialPlatform(e.target.value)}
                      style={{ accentColor: '#ccff33' }}
                    />
                    <div>
                      <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
                        {platform.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666666' }}>
                        {platform.formats}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleTrialDownload}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#ffffff',
                backgroundColor: 'transparent',
                border: '2px solid #ccff33',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginTop: 'auto'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#ccff33'
                e.target.style.color = '#000000'
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#ffffff'
              }}
            >
              Download Trial
            </button>
          </div>

          {/* Purchase Card */}
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '2px solid #ccff33',
            borderRadius: '8px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#ccff33', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Full License
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ fontSize: '48px', fontWeight: '700', color: '#ccff33' }}>
                  ${geoPrice?.adjustedPrice ? (geoPrice.adjustedPrice / 100).toFixed(0) : '25'}
                </div>
                {geoPrice?.discount > 0 ? (
                  <div style={{ fontSize: '20px', color: '#666666', textDecoration: 'line-through' }}>
                    $25
                  </div>
                ) : (
                  <div style={{ fontSize: '20px', color: '#666666', textDecoration: 'line-through' }}>
                    $30
                  </div>
                )}
              </div>
              {geoPrice?.discount > 0 && (
                <div style={{ fontSize: '13px', color: '#ccff33', marginBottom: '4px' }}>
                  {geoPrice.discount}% off for {geoPrice.countryName || geoPrice.countryCode}
                </div>
              )}
              <div style={{ fontSize: '14px', color: '#888888' }}>
                One-time payment
              </div>
            </div>

            {/* Benefits */}
            <div style={{ marginBottom: '24px', flex: 1 }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Lifetime license',
                  'All platforms included',
                  'No subscription',
                  'Support development'
                ].map((benefit, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 0',
                    fontSize: '14px',
                    color: '#aaaaaa'
                  }}>
                    <span style={{ color: '#ccff33' }}>✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handlePurchase}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#000000',
                backgroundColor: '#ccff33',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginTop: 'auto'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#b8e600'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ccff33'}
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
