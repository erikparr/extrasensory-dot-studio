export const PRODUCTS = {
  'foam-sampler': {
    id: 'foam-sampler',
    title: 'FOAM',
    price: 2000, // $20.00 in cents
    currency: 'usd',
    category: 'Audio Plugin',
    description: 'AI-powered phoneme sampling instrument with text-to-speech integration.',
    longDescription: `FOAM generates realistic vocal phoneme samples using AI text-to-speech, turning any text into playable instrument sounds.

**Key Features:**
• AI-powered phoneme generation via text-to-speech
• Real-time phoneme sampling and playback
• DAW integration (VST3/AU formats)
• Credit-based content generation system
• Cross-platform support (macOS & Windows)

**Pricing Model:**
• One-time purchase: $25 for the plugin
• Credits purchased separately for AI generation
• Buy credits in-app or at foam.extrasensory.studio`,

    features: [
      'AI-powered phoneme sampling',
      'AI text-to-speech integration',
      'Real-time sample playback',
      'VST3 and AU plugin formats',
      'Cross-platform: macOS & Windows',
      'Credit-based AI generation',
      'In-app credit purchases'
    ],

    image: '/foam-screen.png',

    // Platform-specific downloads
    downloads: {
      macos: {
        file: 'FOAM-1.0.6.pkg',
        size: '16.4 MB',
        formats: ['VST3', 'AU']
      },
      windows: {
        file: 'FOAM_v1.0.6_Windows.zip',
        size: '2.3 MB',
        formats: ['VST3']
      },
      linux: {
        file: 'FOAM_v1.0.6_Linux.zip',
        size: '5.2 MB',
        formats: ['VST3']
      }
    },

    systemRequirements: {
      os: 'macOS 10.13+ / Windows 10+',
      architecture: 'Intel, Apple Silicon, x64',
      formats: 'VST3, AU (macOS only)',
      daws: 'Logic Pro, Ableton Live, Cubase, FL Studio, Reaper, Bitwig, and more'
    }
  },
  'midi-warp': {
    id: 'midi-warp',
    title: 'VEX Expressive MIDI',
    price: 2500, // $25.00 in cents
    currency: 'usd',
    category: 'Audio Plugin',
    description: 'Revolutionary MIDI effect plugin that transforms static MIDI controller input into dynamic, expressive musical performance using real-time physics simulation.',
    longDescription: `VEX adds a "physics engine" between your MIDI controller and synthesizer, where your input controls a virtual bouncing ball that generates organic, expressive MIDI data.

**Key Features:**
• Real-time physics-based MIDI CC transformation
• Charge accumulation system for natural momentum
• Support for up to 8 simultaneous CC mappings  
• VST3 and AU formats for maximum DAW compatibility
• Sub-10ms latency with minimal CPU usage
• Background processing capability

**Perfect for:**
• Adding life to static synthesizer controls
• Creating organic filter sweeps and parameter movements
• Transforming rigid sequences into expressive performances
• Sound design and creative MIDI manipulation

**Compatibility:**
• macOS 10.13+ (Intel & Apple Silicon) & Windows 10+
• VST3: Cubase, Ableton Live, FL Studio, Reaper, Bitwig, etc.
• AU: Logic Pro, GarageBand, MainStage (macOS only)
• Works with any MIDI CC source`,
    
    features: [
      'Physics-based MIDI transformation',
      'Real-time bouncing ball simulation',
      'Up to 8 simultaneous CC mappings',
      'VST3 and AU plugin formats',
      'Cross-platform: macOS & Windows',
      'Sub-10ms processing latency',
      'Background processing capability',
      'Comprehensive user manual included'
    ],
    
    image: '/vex-screen.png',

    // Platform-specific downloads
    downloads: {
      macos: {
        file: 'VEX_MIDI_EXPRESSION_v1.0.21_macOS.pkg',
        size: '3.5 MB',
        formats: ['VST3', 'AU']
      },
      windows: {
        file: 'VEX_MIDI_EXPRESSION_v1.0.22_Windows.zip',
        size: '2.6 MB',
        formats: ['VST3']
      },
      linux: {
        file: 'VEX_MIDI_EXPRESSION_v1.0.20_Linux.zip',
        size: '2.1 MB',
        formats: ['VST3']
      }
    },

    // Legacy single download (deprecated)
    downloadFile: 'VEX_MIDI_EXPRESSION_v1.0.zip',
    downloadSize: '3.3 MB',
    
    systemRequirements: {
      os: 'macOS 10.13+ / Windows 10+',
      architecture: 'Intel, Apple Silicon, x64',
      formats: 'VST3, AU (macOS only)',
      daws: 'Logic Pro, Ableton Live, Cubase, Pro Tools, FL Studio, Reaper, Bitwig, and more'
    },
    
    files: [
      'VEX MIDI Expression.vst3',
      'VEX MIDI Expression.component',
      'User_Manual.md',
      'Installation_Instructions.txt'
    ]
  }
}

export const getProduct = (productId) => {
  return PRODUCTS[productId] || null
}

export const getAllProducts = () => {
  return Object.values(PRODUCTS)
}