'use client'
import { useEffect, useRef } from 'react'

// Global synchronized time reference - all components share this
const GLOBAL_START_TIME = typeof performance !== 'undefined' ? performance.now() : 0

export default function ValueIndicator({
  value: initialValue = 64,
  label = "Value",
  color = "#D9D9D9",
  animated = false,
  phaseOffset = 0, // Phase offset in radians (0 to 2π)
  frequency = 1, // Wave frequency multiplier
  amplitude = 0.8 // Wave amplitude (0-1), how much it oscillates
}) {
  const fillRef = useRef(null)
  const animationIdRef = useRef(null)

  // Smooth 60fps animation using direct DOM manipulation
  useEffect(() => {
    if (!animated) {
      // Static value
      if (fillRef.current) {
        const normalizedValue = initialValue / 127
        fillRef.current.style.height = `${normalizedValue * 100}%`
      }
      return
    }

    const CYCLE_DURATION = 4000 // 4 seconds for one full cycle

    const animate = () => {
      if (!fillRef.current) return

      const elapsed = performance.now() - GLOBAL_START_TIME

      // Calculate sine wave with phase offset
      const baseAngle = (elapsed / CYCLE_DURATION) * 2 * Math.PI * frequency
      const angle = baseAngle + phaseOffset

      // Map sine wave (-1 to 1) to MIDI range with amplitude control
      // Center at 63.5, oscillate based on amplitude
      const sineValue = Math.sin(angle)
      const midiValue = 63.5 + (63.5 * amplitude * sineValue)

      // Convert to percentage (0-127 -> 0-100%)
      const normalizedValue = midiValue / 127
      const heightPercent = normalizedValue * 100

      // Direct DOM update - no React re-render
      fillRef.current.style.height = `${heightPercent}%`

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [animated, phaseOffset, frequency, amplitude, initialValue])

  // Calculate position from MIDI value (0-127) to pixel position (0-200)
  const height = 200
  const gridSize = 10
  const gridColor = '#888888'
  const gridOpacity = 0.5
  const diagonalOpacity = 0.3

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Label */}
      <h3 style={{
        margin: '0 0 16px 0',
        fontSize: '14px',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
        {label}
      </h3>

      {/* Bar Container */}
      <div style={{
        position: 'relative',
        width: '30px',
        height: `${height}px`,
        margin: '0 auto',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '15px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)'
      }}>
        {/* Grid background SVG pattern */}
        <svg
          style={{
            position: 'absolute',
            top: '-20px',
            left: 0,
            width: '100%',
            height: 'calc(100% + 40px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
          viewBox={`0 0 30 ${height + 40}`}
        >
          <defs>
            <pattern
              id={`grid-pattern-${label}`}
              x="0"
              y="0"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              {/* Diagonal lines for Monochrome Neon theme */}
              <path
                d={`M 0 ${gridSize} L ${gridSize} 0`}
                stroke={gridColor}
                strokeWidth="1.5"
                opacity={diagonalOpacity}
                shapeRendering="auto"
              />
            </pattern>
            {/* Clip path for rounded rectangle */}
            <clipPath id={`rounded-clip-${label}`}>
              <rect
                x="0"
                y="20"
                width="30"
                height={height}
                rx="15"
                ry="15"
              />
            </clipPath>
          </defs>
          <rect
            x="0"
            y="0"
            width="30"
            height={height + 40}
            fill={`url(#grid-pattern-${label})`}
            clipPath={`url(#rounded-clip-${label})`}
          />
        </svg>

        {/* Solid fill - using ref for direct DOM manipulation */}
        <div
          ref={fillRef}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: animated ? '0%' : `${(initialValue / 127) * 100}%`,
            backgroundColor: color,
            borderRadius: '0 0 15px 15px',
            boxShadow: `0 0 25px ${color}, inset 0 0 12.5px ${color}`,
            zIndex: 3
          }}
        />

      </div>
    </div>
  )
}
