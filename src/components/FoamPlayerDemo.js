'use client'

import { useState } from 'react'

const PLAYBACK_MODES = ['Sequencer', 'Granular', 'MIDI', 'Interactive']
const FILTER_PRESETS = ['All', 'Stops', 'Vowels', 'Fricatives', 'Nasals']

const MOCK_WORDS = [
  { text: 'zero', phonemes: ['Z', 'IH', 'R', 'OW'] },
  { text: 'one', phonemes: ['W', 'AH', 'N'] },
  { text: 'two', phonemes: ['T', 'UW'] },
  { text: 'three', phonemes: ['TH', 'R', 'IY'] },
  { text: 'four', phonemes: ['F', 'AO', 'R'] }
]

const MOCK_SEQUENCE = ['Z', 'W', 'T', 'TH', 'F', 'IH', 'AH', 'UW']

export default function FoamPlayerDemo() {
  const [activeMode, setActiveMode] = useState('Sequencer')
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeStep, setActiveStep] = useState(2)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loopEnabled, setLoopEnabled] = useState(true)

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: '"NotoSans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#0a0a0a',
      border: '1px solid #2a2a2a'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid #2a2a2a',
        backgroundColor: '#1a1a1a'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          <span style={{
            padding: '6px 12px',
            fontSize: '12px',
            fontFamily: '"SF Mono", Monaco, monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            backgroundColor: '#CCFF00',
            color: '#000000'
          }}>
            Player
          </span>
          <span style={{
            padding: '6px 12px',
            fontSize: '12px',
            fontFamily: '"SF Mono", Monaco, monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            backgroundColor: '#2a2a2a',
            color: '#666666'
          }}>
            Studio
          </span>
        </div>
        <button style={{
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          backgroundColor: 'transparent',
          border: '1px solid #2a2a2a',
          color: '#666666',
          cursor: 'pointer'
        }}>
          ⚙
        </button>
      </div>

      {/* Visualization Area */}
      <div style={{
        padding: '24px 16px',
        minHeight: '120px',
        backgroundColor: '#111111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        borderBottom: '1px solid #2a2a2a'
      }}>
        {MOCK_WORDS.map((word, wordIdx) => {
          const activePhoneme = MOCK_SEQUENCE[activeStep]
          const hasActivePhoneme = word.phonemes.includes(activePhoneme)
          return (
            <span
              key={wordIdx}
              style={{
                padding: '8px 12px',
                fontSize: '20px',
                fontFamily: '"SF Mono", Monaco, monospace',
                fontWeight: '700',
                color: hasActivePhoneme ? '#000000' : '#ffffff',
                backgroundColor: hasActivePhoneme ? '#5577ff' : 'transparent',
                opacity: hasActivePhoneme ? 1 : 0.7,
                transition: 'all 0.15s'
              }}
            >
              {word.text}
            </span>
          )
        })}
      </div>

      {/* Playback Mode Selector */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #2a2a2a'
      }}>
        {PLAYBACK_MODES.map((mode) => {
          const isActive = mode === 'Sequencer'
          const isDisabled = mode !== 'Sequencer'
          return (
            <button
              key={mode}
              disabled={isDisabled}
              style={{
                flex: 1,
                padding: '10px 8px',
                fontSize: '11px',
                fontFamily: '"SF Mono", Monaco, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                backgroundColor: isActive ? '#CCFF00' : 'transparent',
                color: isActive ? '#000000' : '#444444',
                border: 'none',
                borderRight: '1px solid #2a2a2a',
                cursor: isDisabled ? 'default' : 'pointer',
                opacity: isDisabled ? 0.5 : 1,
                transition: 'all 0.15s'
              }}
            >
              {mode}
            </button>
          )
        })}
      </div>

      {/* Filter Presets */}
      <div style={{
        display: 'flex',
        padding: '12px 16px',
        gap: '8px',
        borderBottom: '1px solid #2a2a2a',
        overflowX: 'auto'
      }}>
        {FILTER_PRESETS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              padding: '6px 12px',
              fontSize: '11px',
              fontFamily: '"SF Mono", Monaco, monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.3px',
              backgroundColor: activeFilter === filter ? '#2a2a2a' : 'transparent',
              color: activeFilter === filter ? '#ffffff' : '#666666',
              border: `1px solid ${activeFilter === filter ? '#444444' : '#2a2a2a'}`,
              cursor: 'pointer',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap'
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Step Sequencer Grid */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #2a2a2a'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <span style={{
            fontSize: '10px',
            fontFamily: '"SF Mono", Monaco, monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#666666'
          }}>
            Sequencer
          </span>
          <span style={{
            fontSize: '10px',
            fontFamily: '"SF Mono", Monaco, monospace',
            color: '#666666'
          }}>
            120 BPM
          </span>
        </div>
        <div style={{
          display: 'flex',
          gap: '4px'
        }}>
          {MOCK_SEQUENCE.map((phoneme, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              style={{
                flex: 1,
                aspectRatio: '1',
                minWidth: '40px',
                maxWidth: '56px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                fontSize: '12px',
                fontFamily: '"SF Mono", Monaco, monospace',
                fontWeight: '600',
                backgroundColor: idx === activeStep ? '#CCFF00' : '#1a1a1a',
                color: idx === activeStep ? '#000000' : '#888888',
                border: `1px solid ${idx === activeStep ? '#CCFF00' : '#2a2a2a'}`,
                cursor: 'pointer',
                transition: 'all 0.15s',
                boxShadow: idx === activeStep ? '0 0 12px rgba(204, 255, 0, 0.4)' : 'none'
              }}
            >
              <span style={{ fontSize: '10px', opacity: 0.6 }}>{idx + 1}</span>
              <span>{phoneme}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Transport Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: '#1a1a1a'
      }}>
        {/* Transport Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {/* Play Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              backgroundColor: isPlaying ? '#00ff66' : 'transparent',
              color: isPlaying ? '#000000' : '#00ff66',
              border: `1px solid ${isPlaying ? '#00ff66' : '#2a2a2a'}`,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            {isPlaying ? '■' : '▶'}
          </button>

          {/* Loop Button */}
          <button
            onClick={() => setLoopEnabled(!loopEnabled)}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              backgroundColor: loopEnabled ? '#CCFF00' : 'transparent',
              color: loopEnabled ? '#000000' : '#666666',
              border: `1px solid ${loopEnabled ? '#CCFF00' : '#2a2a2a'}`,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            ⟳
          </button>

          {/* Volume */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginLeft: '8px'
          }}>
            <span style={{ fontSize: '12px', color: '#666666' }}>♪</span>
            <div style={{
              width: '60px',
              height: '4px',
              backgroundColor: '#2a2a2a',
              position: 'relative'
            }}>
              <div style={{
                width: '75%',
                height: '100%',
                backgroundColor: '#CCFF00'
              }} />
            </div>
          </div>
        </div>

        {/* File Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '2px'
        }}>
          <span style={{
            fontSize: '11px',
            fontFamily: '"SF Mono", Monaco, monospace',
            color: '#CCFF00'
          }}>
            numbers.foam
          </span>
          <span style={{
            fontSize: '10px',
            fontFamily: '"SF Mono", Monaco, monospace',
            color: '#666666'
          }}>
            16 phonemes
          </span>
        </div>
      </div>
    </div>
  )
}
