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
    <div className="min-h-screen bg-surface-base">
      {/* Volumetric Shader Header */}
      <div className="relative" style={{ height: '50vh' }}>
        <VolumetricShader
          className="absolute inset-0 w-full h-full"
        />
        {/* Gradient fade to background at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--color-bg-base))'
          }}
        />
      </div>

      {/* VEX Title Section */}
      <div className="pt-8 pb-16 text-center px-6">
        <h1
          className="font-display text-content-accent lowercase"
          style={{
            fontSize: 'clamp(36px, 8vw, 48px)',
            fontWeight: '900',
            letterSpacing: '-0.02em',
            margin: '0 0 8px 0'
          }}
        >
          vex
        </h1>
        <p className="text-content-tertiary text-lg uppercase tracking-wider mb-6">
          Expressive MIDI
        </p>
        <p className="text-content-secondary text-md max-w-md mx-auto mb-6 leading-relaxed">
          Turn any MIDI controller into a physics-based performance instrument.
        </p>
        <a
          href="#purchase"
          className="btn-primary inline-block px-8 py-3.5 uppercase tracking-wider"
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
        <h2
          className="text-content-primary mb-8"
          style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: '400',
            lineHeight: '1.4',
            letterSpacing: '-0.01em'
          }}
        >
          Turn any MIDI controller into a physics-based performance instrument.
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#purchase"
            className="btn-secondary px-7 py-3.5"
          >
            Free Trial
          </a>
          <a
            href="#purchase"
            className="btn-primary px-7 py-3.5"
          >
            Buy VEX – ${geoPrice?.adjustedPrice ? (geoPrice.adjustedPrice / 100).toFixed(0) : '25'}
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-content-primary text-md font-semibold uppercase tracking-widest mb-3">
              Physics-Based Transform
            </h3>
            <p className="text-content-tertiary text-sm leading-relaxed">
              Five physics modes—<strong className="text-content-primary">gravity, springs, curves, jitter, and note-triggers</strong>—transform static CC into dynamic expression.
            </p>
          </div>

          <div className="card-featured p-6">
            <h3 className="text-content-accent text-md font-semibold uppercase tracking-widest mb-3">
              8 Simultaneous Mappings
            </h3>
            <p className="text-content-tertiary text-sm leading-relaxed">
              Control up to 8 different parameters at once with independent physics simulations.
            </p>
          </div>

          <div className="card p-6">
            <h3 className="text-content-primary text-md font-semibold uppercase tracking-widest mb-3">
              Ultra-Low Latency
            </h3>
            <p className="text-content-tertiary text-sm leading-relaxed">
              Sub-10ms processing time with minimal CPU usage ensures responsive, real-time performance.
            </p>
          </div>

          <div className="card-featured p-6">
            <h3 className="text-content-accent text-md font-semibold uppercase tracking-widest mb-3">
              macOS • Windows • Linux
            </h3>
            <p className="text-content-tertiary text-sm leading-relaxed">
              VST3 and AU formats work seamlessly on macOS and Windows with all major DAWs.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Video Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-content-primary text-xl font-semibold mb-6">
            See VEX in Action
          </h3>
          <div
            className="relative overflow-hidden bg-surface-card border border-border-subtle rounded-lg"
            style={{ paddingBottom: '56.25%', height: 0 }}
          >
            <iframe
              src="https://www.youtube.com/embed/WPRROqgEx1U"
              title="VEX Demo Video"
              className="absolute top-0 left-0 w-full h-full border-none rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* Setup Guides Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="card p-8 text-center">
          <h3 className="text-content-primary text-xl font-semibold mb-3">
            DAW Setup Guides
          </h3>
          <p className="text-content-tertiary text-sm mb-6 max-w-md mx-auto">
            Step-by-step instructions for setting up VEX in Ableton Live, Logic Pro, REAPER, and other DAWs.
          </p>
          <Link
            href="/projects/vex/guides"
            className="btn-secondary inline-block px-6 py-3"
          >
            View Setup Guides
          </Link>
        </div>
      </div>

      {/* Purchase Section */}
      <div id="purchase" className="max-w-4xl mx-auto px-6 py-24 border-t border-border-subtle">
        <h2 className="text-content-primary text-3xl font-bold mb-4 text-center">
          Get VEX
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Trial Card */}
          <div className="card flex flex-col p-8">
            <div className="mb-6 text-center">
              <div className="text-content-tertiary text-sm uppercase tracking-widest mb-2">
                Try Free
              </div>
              <div className="text-content-primary text-3xl font-bold mb-2">
                14-Day Trial
              </div>
              <div className="text-content-tertiary text-sm">
                Full features included
              </div>
            </div>

            {/* Platform Selection */}
            <div className="mb-6">
              <div className="text-content-tertiary text-xs uppercase tracking-wider mb-3">
                Select Platform
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'macos', label: 'macOS', formats: 'VST3, AU' },
                  { id: 'windows', label: 'Windows', formats: 'VST3' },
                  { id: 'linux', label: 'Linux', formats: 'VST3' }
                ].map((platform) => (
                  <label
                    key={platform.id}
                    className="flex items-center gap-3 p-3 rounded cursor-pointer transition-all"
                    style={{
                      backgroundColor: trialPlatform === platform.id ? 'var(--color-bg-card-hover)' : 'transparent',
                      border: `1px solid ${trialPlatform === platform.id ? 'var(--color-accent)' : 'var(--color-border-default)'}`,
                    }}
                  >
                    <input
                      type="radio"
                      name="platform"
                      value={platform.id}
                      checked={trialPlatform === platform.id}
                      onChange={(e) => setTrialPlatform(e.target.value)}
                      style={{ accentColor: 'var(--color-accent)' }}
                    />
                    <div>
                      <div className="text-content-primary text-sm font-medium">
                        {platform.label}
                      </div>
                      <div className="text-content-tertiary text-xs">
                        {platform.formats}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Windows 10 WebView2 note */}
              {trialPlatform === 'windows' && (
                <div
                  className="mt-3 p-2.5 rounded"
                  style={{
                    backgroundColor: 'rgba(251, 191, 36, 0.1)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                  }}
                >
                  <p style={{ fontSize: '12px', color: '#d97706', margin: 0, lineHeight: '1.4' }}>
                    Windows 10 may require{' '}
                    <a
                      href="https://developer.microsoft.com/en-us/microsoft-edge/webview2/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#d97706', textDecoration: 'underline' }}
                    >
                      WebView2 Runtime
                    </a>
                    {' '}(pre-installed on Windows 11)
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleTrialDownload}
              className="btn-secondary w-full py-4 mt-auto"
            >
              Download Trial
            </button>
          </div>

          {/* Purchase Card */}
          <div className="card-featured flex flex-col p-8">
            <div className="mb-6 text-center">
              <div className="text-content-accent text-sm uppercase tracking-widest mb-2">
                Full License
              </div>
              <div className="flex items-baseline justify-center gap-3 mb-2">
                <div className="text-content-accent text-5xl font-bold">
                  ${geoPrice?.adjustedPrice ? (geoPrice.adjustedPrice / 100).toFixed(0) : '25'}
                </div>
                {geoPrice?.discount > 0 ? (
                  <div className="text-content-muted text-2xl line-through">
                    $25
                  </div>
                ) : (
                  <div className="text-content-muted text-2xl line-through">
                    $30
                  </div>
                )}
              </div>
              {geoPrice?.discount > 0 && (
                <div className="text-content-accent text-sm mb-1">
                  {geoPrice.discount}% off for {geoPrice.countryName || geoPrice.countryCode}
                </div>
              )}
              <div className="text-content-tertiary text-sm">
                One-time payment
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-6 flex-1">
              <ul className="list-none p-0 m-0">
                {[
                  'Lifetime license',
                  'All platforms included',
                  'No subscription',
                  'Support development'
                ].map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 py-2 text-content-secondary text-sm"
                  >
                    <span className="text-content-accent">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handlePurchase}
              className="btn-primary w-full py-4 mt-auto"
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
