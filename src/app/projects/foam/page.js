'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { track } from '@vercel/analytics/react'
import { getProduct } from '@/lib/products'

// Dynamic import for SSR safety - Three.js needs browser APIs
const FoamLogo3D = dynamic(() => import('@/components/FoamLogo3D'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '50vh', backgroundColor: 'var(--color-bg-elevated)' }} />
  )
})

const FoamTabs = dynamic(() => import('@/components/FoamTabs'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', maxWidth: '800px', height: '500px', backgroundColor: 'var(--color-bg-elevated)', margin: '0 auto' }} />
  )
})

export default function FoamPage() {
  var product = getProduct('foam-sampler')
  var [trialPlatform, setTrialPlatform] = useState('macos')
  var [geoPrice, setGeoPrice] = useState(null)
  var [hoveredMode, setHoveredMode] = useState('voice')

  useEffect(() => {
    fetch('/api/geo')
      .then(res => res.json())
      .then(data => setGeoPrice(data))
      .catch(() => setGeoPrice(null))
  }, [])

  var handlePurchase = async () => {
    try {
      var response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          countryCode: geoPrice?.countryCode,
        }),
      })

      var data = await response.json()

      if (!response.ok) {
        console.error('Checkout error:', data.error)
        alert(data.error || 'Something went wrong. Please try again.')
        return
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  var handleTrialDownload = () => {
    track('trial_download', { platform: trialPlatform, product: product.id })
    window.location.href = `/api/trial-download?product_id=${product.id}&platform=${trialPlatform}`
  }

  return (
    <div className="min-h-screen bg-surface-base">
      {/* FoamLogo3D Header */}
      <div className="relative" style={{ height: '50vh' }}>
        <FoamLogo3D
          className="absolute inset-0"
          autoRotate={true}
        />
        {/* Gradient fade to black at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--color-bg-base))'
          }}
        />
      </div>

      {/* FOAM Title Section */}
      <div className="pt-8 pb-16 text-center px-6">
        <h1
          className="font-display text-content-primary lowercase"
          style={{
            fontSize: 'clamp(36px, 8vw, 48px)',
            fontWeight: '900',
            letterSpacing: '-0.02em',
            margin: '0 0 8px 0'
          }}
        >
          foam
        </h1>
        <p className="text-content-tertiary text-xl uppercase tracking-wider mb-6">
          synthetic hypervocal instrument
        </p>
        <p className="text-content-secondary text-md max-w-lg mx-auto mb-6 leading-relaxed">
          FOAM is a new kind of vocal instrument that deconstructs synthetic AI speech into high-velocity phonemes.
        </p>
        <a
          href="#purchase"
          className="btn-primary inline-block px-8 py-3.5 uppercase tracking-wider"
        >
          Get Started
        </a>
      </div>

      {/* Hero Section */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-content-secondary text-lg leading-relaxed mb-6">
          FOAM generates speech using AI voice models allowing expressive range of voices and affects.
        </p>
        <div className="flex flex-col gap-2 mb-8">
          <p className="text-content-tertiary text-base">Over 10 distinct voices</p>
          <p className="text-content-tertiary text-base">Control voice emotion, speed, tone, intensity and more</p>
          <p className="text-content-accent text-base">Includes 250 generations upon purchase</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#purchase"
            className="btn-secondary px-7 py-3.5"
          >
            Download Trial
          </a>
          <a
            href="#purchase"
            className="btn-primary px-7 py-3.5"
          >
            Buy FOAM – $20
          </a>
        </div>
      </div>

      {/* Vocal Content Creation Section */}
      <div className="max-w-xl mx-auto px-6 py-16">
        <p className="text-content-tertiary text-lg uppercase tracking-widest text-center mb-6">
          Two ways of creating vocal content:
        </p>
        <div className="flex">
          <div
            className="flex-1 p-4 text-center cursor-pointer transition-all"
            style={{
              backgroundColor: hoveredMode === 'voice' ? 'var(--color-accent)' : 'var(--color-bg-card)',
              border: '1px solid var(--color-border-subtle)',
              borderRight: 'none'
            }}
            onMouseEnter={() => setHoveredMode('voice')}
          >
            <div
              className="font-mono text-sm uppercase tracking-wide mb-1 transition-colors"
              style={{ color: hoveredMode === 'voice' ? 'var(--color-accent-text)' : 'var(--color-text-tertiary)' }}
            >
              AI Voice Generation
            </div>
            <p
              className="text-xs transition-colors"
              style={{
                color: hoveredMode === 'voice' ? 'var(--color-accent-text)' : 'var(--color-text-muted)',
                opacity: hoveredMode === 'voice' ? 0.8 : 1
              }}
            >
              AI generated vocals
            </p>
          </div>
          <div
            className="flex-1 p-4 text-center cursor-pointer transition-all"
            style={{
              backgroundColor: hoveredMode === 'audio' ? 'var(--color-accent)' : 'var(--color-bg-card)',
              border: '1px solid var(--color-border-subtle)'
            }}
            onMouseEnter={() => setHoveredMode('audio')}
          >
            <div
              className="font-mono text-sm uppercase tracking-wide mb-1 transition-colors"
              style={{ color: hoveredMode === 'audio' ? 'var(--color-accent-text)' : 'var(--color-text-tertiary)' }}
            >
              Audio Upload
            </div>
            <p
              className="text-xs transition-colors"
              style={{
                color: hoveredMode === 'audio' ? 'var(--color-accent-text)' : 'var(--color-text-muted)',
                opacity: hoveredMode === 'audio' ? 0.8 : 1
              }}
            >
              Upload your own voice recordings
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-4xl mx-auto px-6 py-16">
        <div className="card mb-6 p-8">
          <h3 className="text-content-primary text-md font-semibold uppercase tracking-widest mb-3">
            Granular / Sequencer / MIDI Triggering
          </h3>
          <p className="text-content-secondary text-base leading-relaxed mb-4">
            Full control for sonic expression: from hyper-rhythms to granulated masses of shifting vocal fragments.
          </p>
          <p className="text-content-tertiary text-sm leading-relaxed">
            Trigger phonemes from pads/keys, or lock them into rhythmic patterns with the built-in step sequencer (4 / 8 / 16 steps).
          </p>
        </div>

        <div className="card-featured p-8">
          <h3 className="text-content-accent text-md font-semibold uppercase tracking-widest mb-3">
            Designed for Sound Design
          </h3>
          <p className="text-content-secondary text-base leading-relaxed">
            From clean vocal fragments to stutters, glitch consonants, vowel pads, and impossible mouth-noise textures.
          </p>
        </div>

        <div className="card mt-6 p-8">
          <h3 className="text-content-primary text-md font-semibold uppercase tracking-widest mb-3">
            macOS • Windows • Linux
          </h3>
          <p className="text-content-secondary text-base leading-relaxed">
            VST3 and AU plugin formats. Works with Ableton Live, Logic Pro, FL Studio, Bitwig, REAPER, and other major DAWs.
          </p>
        </div>
      </div>

      {/* Tabbed Section: How It Works, FOAM Studio, FOAM Player, Quickstart */}
      <div id="studio" className="max-w-4xl mx-auto px-6 py-16">
        <FoamTabs />
      </div>

      {/* Demo Video Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-content-primary text-xl font-semibold mb-6">
            See FOAM in Action
          </h3>
          <div
            className="relative overflow-hidden bg-surface-card border border-border-subtle rounded-lg"
            style={{ paddingBottom: '56.25%', height: 0 }}
          >
            <iframe
              src="https://www.youtube.com/embed/V0OO1mATkkw"
              title="FOAM Demo Video"
              className="absolute top-0 left-0 w-full h-full border-none rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Second Promo Video */}
          <div
            className="relative overflow-hidden bg-surface-card border border-border-subtle rounded-lg mt-6"
            style={{ paddingBottom: '56.25%', height: 0 }}
          >
            <iframe
              src="https://www.youtube.com/embed/Vj3b3qqbN68"
              title="FOAM Promo Video"
              className="absolute top-0 left-0 w-full h-full border-none rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* Purchase Section */}
      <div id="purchase" className="max-w-4xl mx-auto px-6 py-24 border-t border-border-subtle">
        <h2 className="text-content-primary text-3xl font-bold mb-4 text-center">
          Get FOAM
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Demo Card */}
          <div className="card flex flex-col p-8">
            <div className="mb-6 text-center">
              <div className="text-content-tertiary text-sm uppercase tracking-widest mb-2">
                Try Free
              </div>
              <div className="text-content-primary text-3xl font-bold mb-2">
                Demo Mode
              </div>
              <div className="text-content-tertiary text-sm">
                Full plugin, no generations included
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
              Download Demo
            </button>
          </div>

          {/* Purchase Card */}
          <div className="card-featured flex flex-col p-8">
            <div className="mb-6 text-center">
              <div className="text-content-accent text-sm uppercase tracking-widest mb-2">
                Release Sale
              </div>
              <div className="flex items-baseline justify-center gap-3 mb-2">
                <div className="text-content-accent text-5xl font-bold">
                  $20
                </div>
                <div className="text-content-muted text-2xl line-through">
                  $25
                </div>
              </div>
              <div className="text-content-tertiary text-sm">
                Includes 250 generations
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-6 flex-1">
              <ul className="list-none p-0 m-0">
                {[
                  'Lifetime plugin license',
                  'All platforms included',
                  '250 generations included',
                  'AI speech at cost—zero markup'
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
              Buy FOAM
            </button>
          </div>
        </div>

        {/* How Generations Work */}
        <div className="mt-12 p-6 bg-surface-elevated border border-border-subtle rounded-lg text-center">
          <h4 className="text-content-tertiary text-sm font-semibold uppercase tracking-widest mb-4">
            How Generations Work
          </h4>
          <p className="text-content-secondary text-base mb-2">
            1 generation = 1 speech bundle = 1 audio file
          </p>
          <p className="text-content-tertiary text-sm mb-2">
            Speech is synthesized by third-party AI providers.
          </p>
          <p className="text-content-tertiary text-sm mb-2">
            AI speech will always be provided at cost.
          </p>
          <p className="text-content-tertiary text-sm">
            Your 250 generations = 250 audio files at our cost.
          </p>
        </div>

        {/* Final CTA */}
        <div className="mt-12 text-center">
          <p className="text-content-secondary text-lg mb-2">
            Make speech playable
          </p>
          <p className="text-content-tertiary text-sm">
            FOAM is a weirdly serious instrument for anyone who treats voice as raw material.
          </p>
        </div>
      </div>
    </div>
  )
}
