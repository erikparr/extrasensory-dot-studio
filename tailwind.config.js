/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Enable dark mode via class (allows programmatic control)
  darkMode: 'class',
  theme: {
    extend: {
      // =======================================================================
      // SEMANTIC COLORS - Reference CSS custom properties for theming
      // =======================================================================
      colors: {
        // Surface/Background colors
        surface: {
          base: 'var(--color-bg-base)',
          elevated: 'var(--color-bg-elevated)',
          card: 'var(--color-bg-card)',
          'card-hover': 'var(--color-bg-card-hover)',
          input: 'var(--color-bg-input)',
          overlay: 'var(--color-bg-overlay)',
        },

        // Content/Text colors
        content: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          muted: 'var(--color-text-muted)',
          disabled: 'var(--color-text-disabled)',
          accent: 'var(--color-text-accent)',
          'accent-bright': 'var(--color-text-accent-bright)',
        },

        // Border colors
        border: {
          subtle: 'var(--color-border-subtle)',
          DEFAULT: 'var(--color-border-default)',
          strong: 'var(--color-border-strong)',
          accent: 'var(--color-border-accent)',
        },

        // Accent/Brand colors
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          text: 'var(--color-accent-text)',
        },

        // Focus ring
        focus: {
          ring: 'var(--color-focus-ring)',
        },

        // Legacy studio colors (for backward compatibility)
        // Note: These have inverted naming - studio-black is white, studio-white is dark
        'studio-black': '#ffffff',
        'studio-white': '#0a0a0a',
        'studio-accent': '#ccff33',
        'studio-gray-50': '#171717',
        'studio-gray-100': '#262626',
        'studio-gray-200': '#404040',
        'studio-gray-300': '#525252',
        'studio-gray-400': '#737373',
        'studio-gray-500': '#a3a3a3',
        'studio-gray-600': '#d4d4d4',
        'studio-gray-700': '#e5e5e5',
        'studio-gray-800': '#f5f5f5',
        'studio-gray-900': '#f9f9f9',
      },

      // =======================================================================
      // TYPOGRAPHY
      // =======================================================================
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'monospace'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],        // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
        'base': ['0.9375rem', { lineHeight: '1.5rem' }],  // 15px
        'md': ['1rem', { lineHeight: '1.5rem' }],         // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],   // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],     // 36px
        '5xl': ['3rem', { lineHeight: '1' }],             // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],          // 60px
      },

      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },

      // =======================================================================
      // SPACING
      // =======================================================================
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // =======================================================================
      // LAYOUT
      // =======================================================================
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },

      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },

      // =======================================================================
      // BORDERS & RADII
      // =======================================================================
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'DEFAULT': 'var(--radius-default)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
      },

      // =======================================================================
      // SHADOWS
      // =======================================================================
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
      },

      // =======================================================================
      // TRANSITIONS
      // =======================================================================
      transitionDuration: {
        'fast': '150ms',
        'default': '200ms',
        'slow': '300ms',
      },

      transitionTimingFunction: {
        'default': 'ease',
      },
    },
  },
  plugins: [],
}
