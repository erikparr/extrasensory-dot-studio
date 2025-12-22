'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { track } from '@vercel/analytics/react'
import { getProduct } from '@/lib/products'

// Dynamic import for SSR safety - Three.js needs browser APIs
const FoamLogo3D = dynamic(() => import('@/components/FoamLogo3D'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '50vh', backgroundColor: '#0a0a0a' }} />
  )
})

export default function FoamPage() {
  const product = getProduct('foam-sampler')
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
      {/* FoamLogo3D Header */}
      <div className="relative" style={{ height: '50vh' }}>
        <FoamLogo3D
          className="absolute inset-0"
          width={typeof window !== 'undefined' ? window.innerWidth : 1200}
          height={typeof window !== 'undefined' ? window.innerHeight * 0.5 : 600}
          autoRotate={true}
        />
        {/* Gradient fade to black at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, transparent, #000000)'
          }}
        />
      </div>

      {/* FOAM Title Section */}
      <div className="pt-8 pb-16 text-center px-6">
        <h1 style={{
          fontFamily: '"Bitcount Grid Single", monospace',
          fontSize: 'clamp(36px, 8vw, 48px)',
          fontWeight: '900',
          letterSpacing: '-0.02em',
          color: 'rgb(51, 0, 255)',
          textTransform: 'lowercase',
          margin: '0 0 8px 0'
        }}>
          foam
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666666',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          margin: '0 0 24px 0'
        }}>
          AI Phoneme Sampler
        </p>
        <p style={{
          fontSize: '16px',
          color: '#aaaaaa',
          maxWidth: '400px',
          margin: '0 auto 24px auto',
          lineHeight: '1.5'
        }}>
          Generate expressive vocal samples from text using AI-powered phoneme synthesis.
        </p>
        <a
          href="#purchase"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            backgroundColor: 'rgb(51, 0, 255)',
            color: '#000000',
            fontWeight: '600',
            fontSize: '15px',
            borderRadius: '4px',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          Get Started
        </a>
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
          Transform any text into playable phoneme samples with ElevenLabs TTS integration.
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
            Try Demo
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
            Buy FOAM – ${geoPrice?.adjustedPrice ? (geoPrice.adjustedPrice / 100).toFixed(0) : '20'}
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
              AI-Powered Phoneme Sampling
            </h3>
            <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.6' }}>
              Generate realistic phoneme samples from any text input using advanced AI synthesis. Each phoneme is precisely segmented for musical playback.
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
              color: 'rgb(51, 0, 255)',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              ElevenLabs TTS Integration
            </h3>
            <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.6' }}>
              Powered by industry-leading ElevenLabs text-to-speech technology for natural, expressive vocal generation.
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
              DAW Integration
            </h3>
            <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.6' }}>
              VST3 and AU formats for seamless integration with Logic Pro, Ableton Live, Cubase, FL Studio, and more.
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
              color: 'rgb(51, 0, 255)',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Credit-Based Generation
            </h3>
            <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.6' }}>
              Pay only for what you use. Purchase credits in-app or at <a href="https://foam.extrasensory.studio" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(51, 0, 255)' }}>foam.extrasensory.studio</a>.
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
            See FOAM in Action
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
              src="https://www.youtube.com/embed/PvssdueJEKw"
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
          Get FOAM
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '32px'
        }}>
          {/* Demo Card */}
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
                Demo Mode
              </div>
              <div style={{ fontSize: '14px', color: '#888888' }}>
                Full plugin, no credits included
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
                  { id: 'windows', label: 'Windows', formats: 'VST3' }
                ].map((platform) => (
                  <label
                    key={platform.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: trialPlatform === platform.id ? '#2a2a2a' : 'transparent',
                      border: `1px solid ${trialPlatform === platform.id ? 'rgb(51, 0, 255)' : '#333333'}`,
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
                      style={{ accentColor: 'rgb(51, 0, 255)' }}
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

              {/* Windows 10 WebView2 note */}
              {trialPlatform === 'windows' && (
                <div style={{
                  marginTop: '12px',
                  padding: '10px 12px',
                  backgroundColor: 'rgba(251, 191, 36, 0.1)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  borderRadius: '4px'
                }}>
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
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#ffffff',
                backgroundColor: 'transparent',
                border: '2px solid rgb(51, 0, 255)',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginTop: 'auto'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgb(51, 0, 255)'
                e.target.style.color = '#000000'
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#ffffff'
              }}
            >
              Download Demo
            </button>
          </div>

          {/* Purchase Card */}
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '2px solid rgb(51, 0, 255)',
            borderRadius: '8px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: 'rgb(51, 0, 255)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Full License
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ fontSize: '48px', fontWeight: '700', color: 'rgb(51, 0, 255)' }}>
                  ${geoPrice?.adjustedPrice ? (geoPrice.adjustedPrice / 100).toFixed(0) : '20'}
                </div>
                {geoPrice?.discount > 0 && (
                  <div style={{ fontSize: '20px', color: '#666666', textDecoration: 'line-through' }}>
                    $20
                  </div>
                )}
              </div>
              {geoPrice?.discount > 0 && (
                <div style={{ fontSize: '13px', color: 'rgb(51, 0, 255)', marginBottom: '4px' }}>
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
                  'Lifetime plugin license',
                  'All platforms included',
                  'No subscription',
                  'Credits sold separately'
                ].map((benefit, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 0',
                    fontSize: '14px',
                    color: '#aaaaaa'
                  }}>
                    <span style={{ color: 'rgb(51, 0, 255)' }}>✓</span>
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
                backgroundColor: 'rgb(51, 0, 255)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginTop: 'auto'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgb(40, 0, 200)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'rgb(51, 0, 255)'}
            >
              Purchase
            </button>
          </div>
        </div>

        {/* Credits Info Box */}
        <div style={{
          marginTop: '32px',
          padding: '24px',
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '12px'
          }}>
            About Credits
          </h4>
          <p style={{
            fontSize: '14px',
            color: '#888888',
            marginBottom: '16px',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            AI phoneme generation requires credits. The plugin works in demo mode without credits.
            Purchase credits when you're ready to generate samples.
          </p>
          <a
            href="https://foam.extrasensory.studio"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              color: 'rgb(51, 0, 255)',
              backgroundColor: 'transparent',
              border: '1px solid rgb(51, 0, 255)',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
          >
            Get Credits at foam.extrasensory.studio
          </a>
        </div>
      </div>
    </div>
  )
}
