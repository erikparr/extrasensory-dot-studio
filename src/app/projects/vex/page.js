'use client'
import ValueIndicator from '@/components/ValueIndicator'
import { getProduct } from '@/lib/products'

export default function VexPage() {
  const product = getProduct('midi-warp')

  const handlePurchase = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
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
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 style={{
          fontSize: 'clamp(28px, 5vw, 36px)',
          fontWeight: '500',
          lineHeight: '1.3',
          letterSpacing: '-0.01em',
          color: '#ffffff',
          marginBottom: '24px'
        }}>
          VEX transforms any MIDI device into an interactive control instrument.
        </h2>

        <p style={{
          fontSize: 'clamp(16px, 2.5vw, 18px)',
          color: '#aaaaaa',
          lineHeight: '1.7',
          marginBottom: '40px',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          A real-time physics engine for MIDI expression. Transform static controller movements into organic, bouncing, and elastic motion. Add gravity, springs, dynamic curves, and jitter to any MIDI CC—bringing natural momentum and life to your music production and live performances.
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
              macOS • Windows • Linux
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
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#CCFF00' }}>
                $25
              </div>
              <div style={{ fontSize: '24px', color: '#999999', textDecoration: 'line-through' }}>
                $30
              </div>
            </div>
            <div style={{ fontSize: '14px', color: '#666666' }}>
              macOS • Windows • Linux
            </div>
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
            Purchase VEX
          </button>
        </div>
      </div>
    </div>
  )
}
