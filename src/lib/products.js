export const PRODUCTS = {
  'midi-warp': {
    id: 'midi-warp',
    title: 'MIDI WARP',
    price: 3000, // $30.00 in cents
    currency: 'usd',
    category: 'Audio Plugin',
    description: 'Revolutionary MIDI effect plugin that transforms static MIDI controller input into dynamic, expressive musical performance using real-time physics simulation.',
    longDescription: `MIDI Warp adds a "physics engine" between your MIDI controller and synthesizer, where your input controls a virtual bouncing ball that generates organic, expressive MIDI data.

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
• macOS 10.13+ (Intel & Apple Silicon)
• VST3: Cubase, Ableton Live, FL Studio, Reaper, etc.
• AU: Logic Pro, GarageBand, MainStage
• Works with any MIDI CC source`,
    
    features: [
      'Physics-based MIDI transformation',
      'Real-time bouncing ball simulation',
      'Up to 8 simultaneous CC mappings',
      'VST3 and AU plugin formats',
      'macOS optimized (Intel & Apple Silicon)',
      'Sub-10ms processing latency',
      'Background processing capability',
      'Comprehensive user manual included'
    ],
    
    image: '/MIDI_WARP_screenshot.png',
    downloadFile: 'MIDI_Warp_v1.0.zip',
    downloadSize: '3.3 MB',
    
    systemRequirements: {
      os: 'macOS 10.13 or later',
      architecture: 'Intel or Apple Silicon',
      formats: 'VST3, AU',
      daws: 'Logic Pro, Ableton Live, Cubase, Pro Tools, FL Studio, Reaper, and more'
    },
    
    files: [
      'MIDI Warp.vst3',
      'MIDI Warp.component', 
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