import Link from 'next/link'
import ValueIndicator from '../components/ValueIndicator'

export default function Home() {
  // Create flowing wave effect for homepage
  const phaseStep = (2 * Math.PI) / 10

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
      {/* Hero Section */}
      <div className="pt-32 pb-16 text-center px-6">
        <h1 style={{
          fontFamily: '"Bitcount Grid Single", monospace',
          fontSize: 'clamp(48px, 10vw, 72px)',
          fontWeight: '900',
          letterSpacing: '-0.02em',
          color: '#CCFF00',
          textTransform: 'lowercase',
          margin: '0 0 16px 0'
        }}>
          vex
        </h1>
        <p style={{
          fontSize: '24px',
          color: '#666666',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '32px'
        }}>
          Expressive MIDI
        </p>
        <p style={{
          fontSize: '18px',
          color: '#999999',
          maxWidth: '600px',
          margin: '0 auto 48px',
          lineHeight: '1.6'
        }}>
          Transform static MIDI input into dynamic, expressive performance using real-time physics simulation.
        </p>
      </div>

      {/* Value Indicators Section */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '80px',
        padding: '32px 24px 64px'
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

      {/* CTA Section */}
      <div className="text-center px-6 pb-24">
        <p style={{
          fontSize: '18px',
          color: '#999999',
          marginBottom: '32px'
        }}>
          Available now for $30
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-primary" style={{ fontSize: '18px' }}>
            Get VEX
          </Link>
          <Link href="/projects/vex" className="btn-secondary" style={{ fontSize: '18px' }}>
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
