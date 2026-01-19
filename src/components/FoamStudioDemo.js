'use client'

import { useState } from 'react'

const MOCK_VOICES = [
  { group: 'Fish Audio', voices: ['Soprano (Female)', 'Alto (Female)', 'Tenor (Male)', 'Baritone (Male)'] },
  { group: 'ElevenLabs', voices: ['Rachel', 'Drew', 'Clyde', 'Paul'] },
  { group: 'OpenAI', voices: ['Alloy', 'Echo', 'Fable', 'Onyx'] }
]

const MOCK_BUNDLES = [
  { name: 'soprano_hello', duration: '2.4s', date: 'Jan 15' },
  { name: 'bass_whisper', duration: '1.8s', date: 'Jan 14' },
  { name: 'tenor_phrase', duration: '3.1s', date: 'Jan 13' }
]

export default function FoamStudioDemo() {
  const [selectedMode, setSelectedMode] = useState('voice')
  const [hoveredBundle, setHoveredBundle] = useState(null)
  const [generateHovered, setGenerateHovered] = useState(false)

  const exampleText = "Hello world, welcome to the future of sound design"

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: '"NotoSans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Main Generation Panel */}
      <div style={{
        backgroundColor: '#0a0a0a',
        border: '1px solid #2a2a2a',
        padding: '24px'
      }}>
        {/* Credits Badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            fontSize: '13px',
            fontFamily: '"SF Mono", Monaco, monospace',
            color: '#00ff88'
          }}>
            <span style={{ fontSize: '8px' }}>●</span>
            <span>250 credits</span>
          </div>
        </div>

        {/* Mode Toggle */}
        <div style={{
          display: 'flex',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => setSelectedMode('voice')}
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '13px',
              fontFamily: '"SF Mono", Monaco, monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              border: '1px solid #2a2a2a',
              borderRight: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s',
              backgroundColor: selectedMode === 'voice' ? '#00ff88' : '#2a2a2a',
              color: selectedMode === 'voice' ? '#000000' : '#666666'
            }}
          >
            Voice Generation
          </button>
          <button
            onClick={() => setSelectedMode('audio')}
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '13px',
              fontFamily: '"SF Mono", Monaco, monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              border: '1px solid #2a2a2a',
              cursor: 'pointer',
              transition: 'all 0.15s',
              backgroundColor: selectedMode === 'audio' ? '#00ff88' : '#2a2a2a',
              color: selectedMode === 'audio' ? '#000000' : '#666666'
            }}
          >
            Audio Upload
          </button>
        </div>

        {/* Voice and Language Selectors */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '16px'
        }}>
          {/* Voice Selector */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontFamily: '"SF Mono", Monaco, monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: '#666666',
              marginBottom: '6px'
            }}>
              Voice
            </label>
            <select
              disabled
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                color: '#ffffff',
                cursor: 'default',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666666' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center'
              }}
            >
              <option>Fish Audio - Soprano</option>
            </select>
          </div>

          {/* Language Selector */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontFamily: '"SF Mono", Monaco, monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: '#666666',
              marginBottom: '6px'
            }}>
              Language
            </label>
            <select
              disabled
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                color: '#ffffff',
                cursor: 'default',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666666' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center'
              }}
            >
              <option>English</option>
            </select>
          </div>
        </div>

        {/* Text Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '11px',
            fontFamily: '"SF Mono", Monaco, monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#666666',
            marginBottom: '6px'
          }}>
            Text
          </label>
          <textarea
            readOnly
            value={exampleText}
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '12px',
              fontSize: '14px',
              fontFamily: '"SF Mono", Monaco, monospace',
              backgroundColor: '#1a1a1a',
              border: '1px solid #2a2a2a',
              color: '#ffffff',
              resize: 'none',
              lineHeight: '1.5',
              boxSizing: 'border-box'
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '6px',
            fontSize: '12px',
            fontFamily: '"SF Mono", Monaco, monospace',
            color: '#666666'
          }}>
            {exampleText.length}/500
          </div>
        </div>

        {/* Generate Button */}
        <button
          onMouseEnter={() => setGenerateHovered(true)}
          onMouseLeave={() => setGenerateHovered(false)}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '14px',
            fontFamily: '"SF Mono", Monaco, monospace',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            backgroundColor: '#CCFF00',
            color: '#000000',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s',
            boxShadow: generateHovered ? '0 0 20px rgba(204, 255, 0, 0.4)' : 'none'
          }}
        >
          Generate
        </button>
      </div>

      {/* Library Panel */}
      <div style={{
        backgroundColor: '#3300ff',
        border: '1px solid #5533ff',
        borderTop: 'none',
        padding: '16px'
      }}>
        {/* Library Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
          paddingBottom: '12px',
          borderBottom: '1px solid #5533ff'
        }}>
          <div style={{
            fontSize: '13px',
            fontFamily: '"SF Mono", Monaco, monospace',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>☁</span>
            <span>My Bundles ({MOCK_BUNDLES.length})</span>
          </div>
          <button style={{
            padding: '4px 8px',
            fontSize: '14px',
            backgroundColor: 'transparent',
            border: '1px solid #5533ff',
            color: '#ffffff',
            cursor: 'pointer'
          }}>
            ⟳
          </button>
        </div>

        {/* Bundle List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          {MOCK_BUNDLES.map((bundle, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredBundle(index)}
              onMouseLeave={() => setHoveredBundle(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                backgroundColor: hoveredBundle === index ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                transition: 'background-color 0.15s'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flex: 1,
                minWidth: 0
              }}>
                <span style={{
                  fontSize: '13px',
                  fontFamily: '"SF Mono", Monaco, monospace',
                  color: '#ffffff',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {bundle.name}
                </span>
                <span style={{
                  fontSize: '12px',
                  fontFamily: '"SF Mono", Monaco, monospace',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  {bundle.duration}
                </span>
              </div>
              <div style={{
                display: 'flex',
                gap: '8px'
              }}>
                <button style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s'
                }}>
                  ▶
                </button>
                <button style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s'
                }}>
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
