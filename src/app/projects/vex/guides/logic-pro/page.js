import Link from 'next/link'

export default function LogicProGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/projects/vex/guides" className="text-studio-gray-500 hover:text-studio-accent mb-8 inline-block">
        Back to Guides
      </Link>

      <h1 className="text-4xl font-bold mb-4">Logic Pro Setup Guide</h1>
      <p className="text-lg text-studio-gray-600 mb-8">
        How to use VEX MIDI EXPRESSION in Logic Pro to transform your MIDI controller data.
      </p>

      {/* Good News Notice */}
      <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-green-500 mb-2">Native MIDI FX Support</h2>
        <p className="text-studio-gray-600">
          <strong>Good news!</strong> Logic Pro has native support for third-party MIDI FX plugins. VEX appears directly in Logic&apos;s <strong>MIDI FX slot</strong> and can be placed before instruments on the same track. No complex MIDI routing required!
        </p>
      </div>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <p className="text-studio-gray-600 mb-4">
          In Logic Pro, software instrument tracks have a <strong>MIDI FX slot</strong> above the instrument slot. MIDI flows through these slots in order:
        </p>
        <div className="bg-studio-gray-50 rounded-lg p-4 font-mono text-sm">
          MIDI Input &rarr; [MIDI FX Slot] &rarr; [Instrument Slot] &rarr; [Audio FX] &rarr; Output
        </div>
        <p className="text-studio-gray-600 mt-4">
          VEX sits in the MIDI FX slot, transforming your MIDI data before it reaches the instrument.
        </p>
      </section>

      {/* Setup Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Setup Guide</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Step 1: Create a Software Instrument Track</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>Go to <strong>Track &rarr; New Software Instrument Track</strong> (or press Option+Cmd+S)</li>
              <li>Choose an instrument (e.g., Alchemy, Retro Synth, or any third-party synth)</li>
              <li>Click <strong>Create</strong></li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 2: Insert VEX in the MIDI FX Slot</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>Look at the <strong>Channel Strip</strong> on the left side (or in the Mixer)</li>
              <li>Find the <strong>MIDI FX</strong> slot - it&apos;s located <strong>above</strong> the Instrument slot</li>
              <li>Click on the MIDI FX slot</li>
              <li>Navigate to: <strong>AU MIDI-controlled Effects &rarr; Extrasensory &rarr; VEX MIDI EXPRESSION</strong></li>
              <li>Click to insert VEX</li>
            </ol>

            <div className="bg-studio-gray-50 rounded-lg p-4 mt-4 font-mono text-sm">
              <p className="text-studio-gray-600 mb-2">Your channel strip should now show:</p>
              <pre>{`[MIDI FX: VEX MIDI EXPRESSION]
         |
         v
[Instrument: Your Synth]
         |
         v
[Audio FX slots...]`}</pre>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 3: Configure VEX</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>Double-click the VEX slot to open the plugin window</li>
              <li>Add a mapping for your CC number:
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li>Click <strong>+ Add Mapping</strong></li>
                  <li>Set the CC number (e.g., CC1 for Mod Wheel, CC74 for Filter)</li>
                  <li>Choose a transform type (Bouncy, Spring, Warp, etc.)</li>
                </ul>
              </li>
              <li>Move your MIDI controller to verify input is received</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 4: Play!</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>Make sure your MIDI controller is connected and selected in Logic&apos;s preferences</li>
              <li>Record-enable the track (press R on the track header)</li>
              <li>Play your MIDI controller - the instrument receives transformed MIDI data!</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Stacking MIDI FX */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Stacking Multiple MIDI FX</h2>
        <p className="text-studio-gray-600 mb-4">
          Logic Pro allows you to stack multiple MIDI FX plugins:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
          <li>Hover over the top or bottom edge of an existing MIDI FX slot</li>
          <li>When you see a <strong>green line</strong>, click to insert another MIDI FX slot</li>
          <li>Insert additional VEX instances or other MIDI FX plugins</li>
        </ol>
        <p className="text-studio-gray-600 mt-4">
          MIDI flows through them in order from top to bottom.
        </p>
      </section>

      {/* CC Mapping */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">MIDI CC Mapping in Instruments</h2>
        <p className="text-studio-gray-600 mb-4">
          After VEX transforms your CC data, you need to map it to instrument parameters:
        </p>

        <div className="space-y-4">
          <div className="bg-studio-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Logic Pro Instruments (Alchemy, Retro Synth, etc.)</h4>
            <p className="text-sm text-studio-gray-600 mb-2">Most Logic instruments respond to standard MIDI CCs automatically:</p>
            <ul className="list-disc list-inside text-sm text-studio-gray-600 space-y-1">
              <li><strong>CC1</strong> (Mod Wheel) - Often mapped to vibrato or filter</li>
              <li><strong>CC74</strong> - Brightness/Filter cutoff</li>
              <li><strong>CC71</strong> - Resonance</li>
            </ul>
          </div>

          <div className="bg-studio-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Third-Party Instruments</h4>
            <p className="text-sm text-studio-gray-600">
              Most synths have built-in MIDI Learn: right-click the parameter &rarr; &quot;MIDI Learn&quot;, then move your controller through VEX.
            </p>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Troubleshooting</h2>
        <div className="space-y-4">
          <div className="bg-studio-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">VEX doesn&apos;t appear in MIDI FX menu</h4>
            <ul className="list-disc list-inside text-sm text-studio-gray-600 space-y-1">
              <li>Ensure VEX is installed in <code className="bg-studio-gray-100 px-1 rounded">/Library/Audio/Plug-Ins/Components/</code></li>
              <li>Go to <strong>Logic Pro &rarr; Preferences &rarr; Plug-in Manager</strong></li>
              <li>Click <strong>Reset &amp; Rescan Selection</strong> to rescan Audio Units</li>
              <li>Make sure VEX is not disabled in the plugin list</li>
            </ul>
          </div>

          <div className="bg-studio-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">VEX doesn&apos;t receive MIDI input</h4>
            <ul className="list-disc list-inside text-sm text-studio-gray-600 space-y-1">
              <li>Check that your MIDI controller is selected in <strong>Logic Pro &rarr; Preferences &rarr; MIDI</strong></li>
              <li>Ensure the track is record-enabled (R button)</li>
              <li>Verify your controller is sending the correct CC number</li>
            </ul>
          </div>

          <div className="bg-studio-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Plugin validation failed</h4>
            <ol className="list-decimal list-inside text-sm text-studio-gray-600 space-y-1">
              <li>Go to <strong>Logic Pro &rarr; Preferences &rarr; Plug-in Manager</strong></li>
              <li>Find VEX in the list</li>
              <li>Select it and click <strong>Reset &amp; Rescan Selection</strong></li>
              <li>If issues persist, try removing and reinstalling the plugin</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Recording Note */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Recording Transformed MIDI</h2>
        <p className="text-studio-gray-600 mb-4">
          When you record MIDI in Logic with VEX in the MIDI FX slot:
        </p>
        <ul className="list-disc list-inside text-studio-gray-600 space-y-2">
          <li>The <strong>recorded MIDI</strong> will be the <strong>original, untransformed</strong> data</li>
          <li>VEX transforms it in real-time during playback</li>
          <li>This lets you adjust VEX parameters after recording without re-recording</li>
        </ul>
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
