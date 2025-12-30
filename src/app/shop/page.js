'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import ValueIndicator from '@/components/ValueIndicator'

// Dynamic import for SSR safety - Three.js needs browser APIs
const FoamLogo3D = dynamic(() => import('@/components/FoamLogo3D'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '50vh', backgroundColor: '#0a0a0a' }} />
  )
})

export default function ShopPage() {
  // VEX indicator pairs - flowing wave effect
  const phaseStep = (2 * Math.PI) / 10
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
      {/* FOAM Section */}
      <section>
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
            color: '#e0e0e0',
            textTransform: 'lowercase',
            margin: '0 0 8px 0'
          }}>
            foam
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#666666',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            margin: '0 0 24px 0'
          }}>
            generate synthetic hypervocals
          </p>
          <p style={{
            fontSize: '16px',
            color: '#aaaaaa',
            maxWidth: '500px',
            margin: '0 auto 24px auto',
            lineHeight: '1.5'
          }}>
            FOAM is a new kind of vocal instrument that deconstructs synthetic AI speech into high-velocity phonemes.
          </p>
          <Link
            href="/foam"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              backgroundColor: 'rgb(51, 0, 255)',
              color: '#ffffff',
              fontWeight: '600',
              fontSize: '15px',
              borderRadius: '4px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Explore
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div style={{
        borderTop: '1px solid #2a2a2a',
        margin: '0 auto',
        maxWidth: '800px'
      }} />

      {/* VEX Section */}
      <section style={{ paddingTop: '64px' }}>
        {/* Value Indicators */}
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

        {/* VEX Title Section */}
        <div className="pt-8 pb-16 text-center px-6">
          <h2 style={{
            fontFamily: '"Bitcount Grid Single", monospace',
            fontSize: 'clamp(36px, 8vw, 48px)',
            fontWeight: '900',
            letterSpacing: '-0.02em',
            color: '#ccff33',
            textTransform: 'lowercase',
            margin: '0 0 8px 0'
          }}>
            vex
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#666666',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            margin: '0 0 24px 0'
          }}>
            expressive midi
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
          <Link
            href="/vex"
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
            Explore
          </Link>
        </div>
      </section>
    </div>
  )
}
