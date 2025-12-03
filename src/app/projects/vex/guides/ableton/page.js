import Link from 'next/link'

export default function AbletonGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/projects/vex/guides" className="text-studio-gray-500 hover:text-studio-accent mb-8 inline-block">
        Back to Guides
      </Link>

      <h1 className="text-4xl font-bold mb-4">Ableton Live Setup Guide</h1>
      <p className="text-lg text-studio-gray-600 mb-8">
        How to route MIDI through VEX MIDI EXPRESSION in Ableton Live.
      </p>

      {/* Video Tutorial */}
      <div className="mb-12">
        <div style={{
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          overflow: 'hidden',
          borderRadius: '8px'
        }}>
          <iframe
            src="https://www.youtube.com/embed/HfwuxF81ib4"
            title="VEX Ableton Setup Tutorial"
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
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-yellow-500 mb-2">Important: Ableton MIDI Routing</h2>
        <p className="text-studio-gray-600 mb-3">
          <strong>Ableton Live does not support third-party VST3 MIDI effects in the device chain before instruments.</strong> This is an Ableton limitation - only Ableton&apos;s built-in MIDI effects can be placed before instruments on the same track.
        </p>
        <p className="text-studio-gray-600">
          VEX works perfectly in Ableton using <strong>MIDI track routing</strong>, which is the standard method for all third-party MIDI effect plugins.
        </p>
      </div>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <p className="text-studio-gray-600 mb-4">
          VEX receives MIDI input, transforms it using physics-based processing, and outputs transformed MIDI. In Ableton, you route this output to a separate instrument track.
        </p>
        <div className="bg-studio-gray-50 rounded-lg p-4 font-mono text-sm">
          MIDI Controller &rarr; VEX Track &rarr; [MIDI Routing] &rarr; Instrument Track &rarr; Audio Output
        </div>
      </section>

      {/* Setup Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Setup Guide</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Step 1: Create the VEX Track</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>Create a new <strong>MIDI Track</strong> (Cmd+Shift+T / Ctrl+Shift+T)</li>
              <li>Name it &quot;VEX&quot; or &quot;VEX Transform&quot; (double-click the track name)</li>
              <li>Load <strong>VEX MIDI EXPRESSION</strong> on this track:
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li>In the Browser, go to <strong>Plug-ins &rarr; VST3</strong> (or <strong>Audio Units</strong> on macOS)</li>
                  <li>Find &quot;VEX MIDI EXPRESSION&quot;</li>
                  <li>Drag it onto the track</li>
                </ul>
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 2: Set Up MIDI Input on VEX Track</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>In the track&apos;s <strong>I/O Section</strong> (press Cmd+Opt+I / Ctrl+Alt+I if not visible):
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li><strong>MIDI From</strong>: Select your MIDI controller</li>
                  <li><strong>Channel</strong>: &quot;All Channels&quot; (or specific channel if needed)</li>
                  <li><strong>Monitor</strong>: Set to <strong>&quot;In&quot;</strong> to always receive MIDI</li>
                </ul>
              </li>
            </ol>

            <div className="bg-studio-gray-50 rounded-lg p-4 mt-4">
              <h4 className="font-semibold mb-2">Disable Control Surface for Your Controller</h4>
              <p className="text-studio-gray-600 text-sm mb-2">
                Ableton may intercept your MIDI controller&apos;s data for its own remote control features. To fix this:
              </p>
              <ol className="list-decimal list-inside text-sm text-studio-gray-600 space-y-1">
                <li>Go to <strong>Live &rarr; Preferences &rarr; Link, Tempo &amp; MIDI</strong></li>
                <li>In the <strong>Control Surface</strong> section, check if your controller is assigned</li>
                <li>If it appears, set that slot to <strong>&quot;None&quot;</strong></li>
                <li>Or disable <strong>Remote</strong> for your controller&apos;s input (keep <strong>Track</strong> enabled)</li>
              </ol>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 3: Configure VEX</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>Open VEX MIDI EXPRESSION (double-click the device)</li>
              <li>Add a mapping for your CC number:
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li>Click <strong>+ Add Mapping</strong></li>
                  <li>Set the CC number (e.g., CC1 for Mod Wheel, CC74 for Filter)</li>
                  <li>Choose a transform type (Bouncy, Spring, Warp, etc.)</li>
                </ul>
              </li>
              <li>Move your controller to verify input is received</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 4: Create the Instrument Track</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>Create another <strong>MIDI Track</strong> (Cmd+Shift+T / Ctrl+Shift+T)</li>
              <li>Name it &quot;Synth&quot; (or your instrument name)</li>
              <li>Load your instrument (e.g., Analog, Wavetable, Serum, etc.)</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 5: Route VEX Output to Instrument</h3>
            <p className="text-studio-gray-600 mb-2">On the <strong>&quot;Synth&quot; instrument track</strong> (not the VEX track):</p>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>In the I/O Section, find the <strong>MIDI From</strong> dropdown</li>
              <li>Change it from &quot;All Ins&quot; to <strong>&quot;VEX&quot;</strong> (your VEX track name)</li>
              <li>Set the second dropdown to <strong>&quot;Post FX&quot;</strong></li>
              <li>Set <strong>Monitor</strong> to <strong>&quot;In&quot;</strong></li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 6: Arm and Play</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li><strong>Arm</strong> the &quot;VEX&quot; track for recording</li>
              <li>The &quot;Synth&quot; track does NOT need to be armed</li>
              <li>Play your MIDI controller - the instrument responds with transformed CC data!</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Troubleshooting</h2>
        <div className="space-y-4">
          <div className="bg-studio-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">VEX doesn&apos;t receive MIDI input</h4>
            <ul className="list-disc list-inside text-sm text-studio-gray-600 space-y-1">
              <li><strong>Most common cause</strong>: Ableton is intercepting your controller as a Control Surface</li>
              <li>Check <strong>MIDI From</strong> is set to your controller</li>
              <li>Ensure <strong>Monitor</strong> is set to &quot;In&quot;</li>
              <li>Verify your controller is sending on the correct CC number</li>
            </ul>
          </div>

          <div className="bg-studio-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Instrument doesn&apos;t respond to transformed MIDI</h4>
            <ul className="list-disc list-inside text-sm text-studio-gray-600 space-y-1">
              <li>Verify <strong>MIDI From</strong> on the instrument track is set to your VEX track</li>
              <li>Make sure the second dropdown shows <strong>&quot;Post FX&quot;</strong></li>
              <li>Ensure the instrument track&apos;s <strong>Monitor</strong> is set to &quot;In&quot;</li>
              <li>The VEX track should be armed, the instrument track should NOT be armed</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="border-t border-studio-gray-100 pt-8">
        <p className="text-studio-gray-600">
          Need help? Contact us at{' '}
          <a href="mailto:support@extrasensory.studio" className="text-studio-accent hover:underline">
            support@extrasensory.studio
          </a>
        </p>
      </section>
    </div>
  )
}
