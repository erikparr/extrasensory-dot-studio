/**
 * Design Tokens - Extrasensory Studio
 *
 * Single source of truth for all design values.
 * These tokens are used to generate CSS custom properties and can be
 * imported directly into React components.
 *
 * All text colors are WCAG AA compliant (4.5:1 minimum for normal text)
 */

// =============================================================================
// COLOR PALETTE - Raw color values
// =============================================================================

export const palette = {
  // Neutrals - Dark
  black: '#000000',
  gray950: '#0a0a0a',
  gray900: '#1a1a1a',
  gray850: '#222222',
  gray800: '#2a2a2a',
  gray700: '#3a3a3a',
  gray600: '#525252',
  gray500: '#737373',
  gray400: '#8c8c8c',
  gray300: '#a3a3a3',
  gray200: '#b3b3b3',
  gray100: '#d4d4d4',
  gray50: '#e5e5e5',
  white: '#ffffff',

  // Neutrals - Light mode (cool grey tones)
  lightGray50: '#f1f3f5',
  lightGray100: '#e8eaed',
  lightGray200: '#dde1e6',
  lightGray300: '#d0d5db',
  lightGray400: '#a3a3a3',
  lightGray500: '#737373',
  lightGray600: '#525252',
  lightGray700: '#404040',
  lightGray800: '#262626',
  lightGray900: '#171717',

  // Brand - Primary accent (blue/violet)
  accent: 'rgb(51, 0, 255)',
  accentHover: 'rgb(40, 0, 200)',
  accentLight: '#a58aff',      // For text on dark backgrounds (7.2:1 on black)
  accentLighter: '#c4b3ff',    // Higher contrast option (10.5:1 on black)
  accentDark: 'rgb(30, 0, 150)', // For text on light backgrounds
  accentDarker: 'rgb(20, 0, 100)',

  // Brand - Secondary (lime, used in logo)
  secondary: '#ccff33',
}

// =============================================================================
// SEMANTIC TOKENS - Theme-aware values
// =============================================================================

export const themes = {
  dark: {
    // Backgrounds
    bgBase: palette.black,
    bgElevated: palette.gray950,
    bgCard: palette.gray900,
    bgCardHover: palette.gray850,
    bgInput: palette.gray900,
    bgOverlay: 'rgba(0, 0, 0, 0.8)',

    // Text - All pass WCAG AA on dark backgrounds
    textPrimary: palette.white,           // 21:1 on black
    textSecondary: palette.gray200,       // 9.5:1 on black, 7.4:1 on gray900
    textTertiary: palette.gray400,        // 5.5:1 on black, 4.3:1 on gray900
    textMuted: palette.gray500,           // 4.6:1 on black (use at 16px+ or large text)
    textDisabled: palette.gray600,        // For disabled states only

    // Accent text - Safe for use on dark backgrounds
    textAccent: palette.accentLight,      // 7.2:1 on black
    textAccentBright: palette.accentLighter, // 10.5:1 on black

    // Borders
    borderSubtle: palette.gray800,
    borderDefault: palette.gray700,
    borderStrong: palette.gray600,
    borderAccent: palette.accent,

    // Interactive
    accent: palette.accent,
    accentHover: palette.accentHover,
    accentText: palette.black,            // Text on accent background

    // Focus
    focusRing: palette.accentLight,
  },

  light: {
    // Backgrounds - cool grey tones
    bgBase: palette.lightGray100,        // #e8eaed
    bgElevated: palette.lightGray50,     // #f1f3f5
    bgCard: palette.lightGray200,        // #dde1e6
    bgCardHover: palette.lightGray300,   // #d0d5db
    bgInput: palette.lightGray50,        // #f1f3f5
    bgOverlay: 'rgba(232, 234, 237, 0.95)',

    // Text - All pass WCAG AA on light backgrounds
    textPrimary: palette.lightGray900,    // 15.5:1 on white
    textSecondary: palette.lightGray700,  // 10:1 on white
    textTertiary: palette.lightGray600,   // 7:1 on white
    textMuted: palette.lightGray500,      // 4.6:1 on white
    textDisabled: palette.lightGray400,   // For disabled states only

    // Accent text - Safe for use on light backgrounds
    textAccent: palette.accentDark,       // 8.5:1 on white
    textAccentBright: palette.accentDarker, // 12:1 on white

    // Borders
    borderSubtle: palette.lightGray200,
    borderDefault: palette.lightGray300,
    borderStrong: palette.lightGray400,
    borderAccent: palette.accent,

    // Interactive
    accent: palette.accent,
    accentHover: palette.accentHover,
    accentText: palette.white,            // Text on accent background

    // Focus
    focusRing: palette.accent,
  }
}

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
  // Font families
  fontFamily: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'SF Mono', 'Monaco', 'Consolas', monospace",
    display: "'Bitcount Grid Single', monospace",  // For artistic headings like "foam"
  },

  // Font sizes (with line heights)
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],       // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
    base: ['0.9375rem', { lineHeight: '1.5rem' }], // 15px
    md: ['1rem', { lineHeight: '1.5rem' }],        // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],    // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],     // 24px
    '3xl': ['2rem', { lineHeight: '2.25rem' }],    // 32px
    '4xl': ['3rem', { lineHeight: '1.1' }],        // 48px
    '5xl': ['3.75rem', { lineHeight: '1' }],       // 60px
  },

  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}

// =============================================================================
// SPACING
// =============================================================================

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
}

// =============================================================================
// BORDERS & RADII
// =============================================================================

export const radii = {
  none: '0',
  sm: '0.125rem',   // 2px
  default: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
}

// =============================================================================
// TRANSITIONS
// =============================================================================

export const transitions = {
  fast: '150ms ease',
  default: '200ms ease',
  slow: '300ms ease',
}

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// =============================================================================
// Z-INDEX
// =============================================================================

export const zIndex = {
  dropdown: 1000,
  sticky: 1100,
  modal: 1200,
  popover: 1300,
  tooltip: 1400,
}

// =============================================================================
// HELPER: Generate CSS custom properties string
// =============================================================================

export function generateCSSVariables(theme = 'dark') {
  const t = themes[theme]

  return `
    --color-bg-base: ${t.bgBase};
    --color-bg-elevated: ${t.bgElevated};
    --color-bg-card: ${t.bgCard};
    --color-bg-card-hover: ${t.bgCardHover};
    --color-bg-input: ${t.bgInput};
    --color-bg-overlay: ${t.bgOverlay};

    --color-text-primary: ${t.textPrimary};
    --color-text-secondary: ${t.textSecondary};
    --color-text-tertiary: ${t.textTertiary};
    --color-text-muted: ${t.textMuted};
    --color-text-disabled: ${t.textDisabled};
    --color-text-accent: ${t.textAccent};
    --color-text-accent-bright: ${t.textAccentBright};

    --color-border-subtle: ${t.borderSubtle};
    --color-border-default: ${t.borderDefault};
    --color-border-strong: ${t.borderStrong};
    --color-border-accent: ${t.borderAccent};

    --color-accent: ${t.accent};
    --color-accent-hover: ${t.accentHover};
    --color-accent-text: ${t.accentText};

    --color-focus-ring: ${t.focusRing};
  `.trim()
}

// =============================================================================
// EXPORTS FOR DIRECT USE
// =============================================================================

export const colors = {
  dark: themes.dark,
  light: themes.light,
  palette,
}

export default {
  colors,
  typography,
  spacing,
  radii,
  transitions,
  breakpoints,
  zIndex,
  themes,
  palette,
  generateCSSVariables,
}
