'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const FoamStudioDemo = dynamic(() => import('@/components/FoamStudioDemo'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', maxWidth: '600px', height: '500px', backgroundColor: '#0a0a0a', margin: '0 auto' }} />
  )
})

const TABS = [
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'foam-studio', label: 'FOAM Studio' },
  { id: 'foam-player', label: 'FOAM Player' },
  { id: 'quickstart', label: 'Quickstart' }
]

export default function FoamTabs() {
  const [activeTab, setActiveTab] = useState('how-it-works')

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #2a2a2a',
        marginBottom: '32px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: '1 0 auto',
              padding: '16px 24px',
              fontSize: '13px',
              fontFamily: '"SF Mono", Monaco, monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid rgb(51, 0, 255)' : '2px solid transparent',
              color: activeTab === tab.id ? '#ffffff' : '#666666',
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.color = '#999999'
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.color = '#666666'
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ minHeight: '400px' }}>
        {/* How It Works */}
        {activeTab === 'how-it-works' && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              maxWidth: '700px',
              margin: '0 auto',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              {/* Step 1 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1 1 140px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: 'rgb(51, 0, 255)',
                  border: '1px solid #2a2a2a',
                  backgroundColor: '#1a1a1a'
                }}>
                  1
                </div>
                <h4 style={{ fontSize: '14px', color: '#ffffff', margin: '0 0 4px 0' }}>Type some text</h4>
              </div>

              {/* Arrow 1 */}
              <div style={{
                fontSize: '24px',
                color: '#ffffff',
                flex: '0 0 auto',
                height: '48px',
                display: 'flex',
                alignItems: 'center'
              }}>
                →
              </div>

              {/* Step 2 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1 1 140px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: 'rgb(51, 0, 255)',
                  border: '1px solid #2a2a2a',
                  backgroundColor: '#1a1a1a'
                }}>
                  2
                </div>
                <h4 style={{ fontSize: '14px', color: '#ffffff', margin: '0 0 4px 0' }}>Generate phonemes</h4>
                <p style={{ fontSize: '12px', color: '#666666', margin: 0 }}>from AI speech OR upload audio</p>
              </div>

              {/* Arrow 2 */}
              <div style={{
                fontSize: '24px',
                color: '#ffffff',
                flex: '0 0 auto',
                height: '48px',
                display: 'flex',
                alignItems: 'center'
              }}>
                →
              </div>

              {/* Step 3 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1 1 140px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: 'rgb(51, 0, 255)',
                  border: '1px solid #2a2a2a',
                  backgroundColor: '#1a1a1a'
                }}>
                  3
                </div>
                <h4 style={{ fontSize: '14px', color: '#ffffff', margin: '0 0 4px 0' }}>Play via FOAM Player</h4>
                <p style={{ fontSize: '12px', color: '#666666', margin: 0 }}>Sequencer / Granular / MIDI / Interactive</p>
              </div>
            </div>
          </div>
        )}

        {/* FOAM Studio */}
        {activeTab === 'foam-studio' && (
          <div>
            <p style={{
              fontSize: '15px',
              color: '#888888',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              Create AI-generated phoneme content with the companion web app
            </p>
            <FoamStudioDemo />
            <p style={{
              fontSize: '13px',
              color: '#666666',
              textAlign: 'center',
              marginTop: '24px'
            }}>
              Generate speech bundles, then load them into the FOAM plugin
            </p>
          </div>
        )}

        {/* FOAM Player */}
        {activeTab === 'foam-player' && (
          <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              border: '1px solid #2a2a2a',
              backgroundColor: '#1a1a1a',
              color: '#666666'
            }}>
              ▶
            </div>
            <h4 style={{ fontSize: '18px', color: '#ffffff', marginBottom: '12px' }}>
              FOAM Player
            </h4>
            <p style={{
              fontSize: '15px',
              color: '#888888',
              maxWidth: '400px',
              margin: '0 auto 24px',
              lineHeight: '1.5'
            }}>
              The VST/AU plugin that plays your phoneme bundles inside your DAW
            </p>
            <div style={{
              padding: '16px 24px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #2a2a2a',
              display: 'inline-block'
            }}>
              <p style={{ fontSize: '13px', color: '#666666', margin: 0 }}>
                Interactive demo coming soon
              </p>
            </div>
          </div>
        )}

        {/* Quickstart */}
        {activeTab === 'quickstart' && (
          <div>
            <p style={{
              fontSize: '15px',
              color: '#888888',
              textAlign: 'center',
              marginBottom: '32px'
            }}>
              Get up and running in minutes
            </p>

            {/* Ableton Section */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'rgb(51, 0, 255)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '8px 16px',
                  backgroundColor: 'rgba(51, 0, 255, 0.1)'
                }}>
                  Ableton Live
                </span>
                <div style={{
                  flex: 1,
                  height: '1px',
                  backgroundColor: '#2a2a2a'
                }} />
              </div>

              <div style={{
                maxWidth: '640px',
                margin: '0 auto'
              }}>
                <div style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a'
                }}>
                  <iframe
                    src="https://www.youtube.com/embed/uf-g1Escxug"
                    title="FOAM Tutorial - Creating Rhythmic Loops in Ableton"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#666666',
                  marginTop: '12px',
                  textAlign: 'center'
                }}>
                  Creating rhythmic loops with FOAM's step sequencer
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
