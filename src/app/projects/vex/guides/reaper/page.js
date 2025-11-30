import Link from 'next/link'

export default function ReaperGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/projects/vex/guides" className="text-studio-gray-500 hover:text-studio-accent mb-8 inline-block">
        Back to Guides
      </Link>

      <h1 className="text-4xl font-bold mb-4">REAPER Setup Guide</h1>
      <p className="text-lg text-studio-gray-600 mb-8">
        How to use VEX MIDI EXPRESSION in REAPER to transform your MIDI controller data.
      </p>

      {/* Good News Notice */}
      <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-green-500 mb-2">Flexible FX Chain</h2>
        <p className="text-studio-gray-600">
          <strong>Great news!</strong> REAPER has one of the most flexible plugin architectures of any DAW. VEX can be placed directly before your instrument in the FX chain, and MIDI flows through automatically. No complex routing required!
        </p>
      </div>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <p className="text-studio-gray-600 mb-4">
          In REAPER, FX are processed <strong>top to bottom</strong> in the FX chain. Place VEX above your instrument:
        </p>
        <div className="bg-studio-gray-50 rounded-lg p-4 font-mono text-sm">
          <pre>{`FX Chain (top to bottom):
   |
   v
[VEX MIDI EXPRESSION]  <- MIDI Effect
   |
   v
[Virtual Instrument]   <- Synth/Sampler
   |
   v
[Audio Effects...]     <- Optional
   |
   v
Track Output`}</pre>
        </div>
      </section>

      {/* Setup Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Setup Guide</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Step 1: Create a Track</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>Right-click in the track area and select <strong>Insert new track</strong> (or press Cmd+T / Ctrl+T)</li>
              <li>Name the track by double-clicking the track name</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 2: Open the FX Chain</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>Click the <strong>FX button</strong> on the track (or press F on the selected track)</li>
              <li>The FX browser window opens</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 3: Add VEX to the FX Chain</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>In the FX browser, search for &quot;VEX&quot;</li>
              <li>Find <strong>VEX MIDI EXPRESSION</strong> under:
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li><strong>VST3</strong> (Windows/Mac/Linux)</li>
                  <li>or <strong>AU</strong> / Audio Units (Mac only)</li>
                </ul>
              </li>
              <li>Double-click to add it to the FX chain</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 4: Add Your Instrument</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>Click <strong>Add</strong> in the FX chain window (or the + button)</li>
              <li>Search for your instrument (e.g., &quot;Serum&quot;, &quot;Vital&quot;, &quot;ReaSynth&quot;)</li>
              <li>Double-click to add it <strong>below</strong> VEX</li>
            </ol>

            <div className="bg-studio-gray-50 rounded-lg p-4 mt-4 font-mono text-sm">
              <p className="text-studio-gray-600 mb-2">Your FX chain should now show:</p>
              <pre>{`1. VEX MIDI EXPRESSION
2. [Your Instrument]`}</pre>
            </div>

            <p className="text-studio-gray-500 text-sm mt-2">
              <strong>Tip:</strong> You can drag plugins up/down to reorder them. VEX must be <strong>above</strong> the instrument.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 5: Configure VEX</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>Click on VEX in the FX chain to open its window</li>
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
            <h3 className="text-xl font-semibold mb-3">Step 6: Set Up MIDI Input</h3>
            <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
              <li>Right-click the track&apos;s <strong>record arm button</strong> (red circle)</li>
              <li>Select <strong>Input: MIDI &rarr; [Your MIDI Controller] &rarr; All Channels</strong></li>
              <li>Arm the track for recording (click the record arm button)</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 7: Play!</h3>
            <p className="text-studio-gray-600">
              Play your MIDI controller - the instrument receives transformed MIDI data through VEX!
            </p>
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="mb-12">
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-500 mb-2">Important: Use Track FX, Not Input FX</h3>
          <p className="text-studio-gray-600 mb-3">
            REAPER has two FX locations:
          </p>
          <ul className="list-disc list-inside text-studio-gray-600 space-y-1">
            <li><strong>Track FX</strong> (regular FX button) - Use this for VEX</li>
            <li><strong>Input FX</strong> (on the record input) - Avoid for CC processing</li>
          </ul>
          <p className="text-studio-gray-600 mt-3">
            <strong>Warning:</strong> The Input FX chain filters out MIDI CC data in some configurations. Always place VEX in the regular <strong>Track FX</strong> chain.
          </p>
        </div>
      </section>

      {/* MIDI Pass-Through */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">MIDI Pass-Through (If Needed)</h2>
        <p className="text-studio-gray-600 mb-4">
          Most plugins pass MIDI through automatically. If your instrument isn&apos;t receiving MIDI from VEX:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
          <li>In the FX chain, click the <strong>I/O button</strong> (or &quot;2 in 2 out&quot;) on VEX</li>
          <li>In the pin connector window, look for <strong>MIDI Output</strong></li>
          <li>Right-click and select <strong>MIDI Output &rarr; Merge with MIDI bus</strong></li>
        </ol>
      </section>

      {/* Multiple Instances */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Using Multiple VEX Instances</h2>
        <p className="text-studio-gray-600 mb-4">
          You can stack multiple VEX instances in the same FX chain:
        </p>
        <div className="bg-studio-gray-50 rounded-lg p-4 font-mono text-sm">
          <pre>{`1. VEX MIDI EXPRESSION (CC1 mapping)
2. VEX MIDI EXPRESSION (CC74 mapping)
3. [Your Instrument]`}</pre>
        </div>
        <p className="text-studio-gray-600 mt-4">
          Each VEX processes different CCs independently. Alternatively, use a single VEX with multiple mappings.
        </p>
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Troubleshooting</h2>
        <div className="space-y-4">
          <div className="bg-studio-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">VEX doesn&apos;t receive MIDI input</h4>
            <ul className="list-disc list-inside text-sm text-studio-gray-600 space-y-1">
              <li>Check the track&apos;s MIDI input is set to your controller</li>
              <li>Ensure the track is armed for recording</li>
              <li>Verify your controller is sending the correct CC number</li>
              <li>Check <strong>REAPER Preferences &rarr; MIDI Devices</strong> - ensure your controller is enabled</li>
            </ul>
          </div>

          <div className="bg-studio-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Instrument doesn&apos;t respond to transformed MIDI</h4>
            <ul className="list-disc list-inside text-sm text-studio-gray-600 space-y-1">
              <li>Make sure VEX is <strong>above</strong> the instrument in the FX chain</li>
              <li>Check VEX&apos;s MIDI output routing (see &quot;MIDI Pass-Through&quot; section)</li>
              <li>Verify the instrument responds to the CC number you&apos;re transforming</li>
              <li>Look at VEX&apos;s output meter - it should show transformed values</li>
            </ul>
          </div>

          <div className="bg-studio-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Latency issues</h4>
            <ul className="list-disc list-inside text-sm text-studio-gray-600 space-y-1">
              <li>VEX runs at sub-10ms latency</li>
              <li>If experiencing delay, reduce REAPER&apos;s audio buffer size in <strong>Preferences &rarr; Audio &rarr; Device</strong></li>
              <li>Use 128-256 samples for lowest latency during performance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Saving FX Chains */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Saving FX Chains</h2>
        <p className="text-studio-gray-600 mb-4">
          Save your VEX + instrument setup for reuse:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-studio-gray-600">
          <li>In the FX chain window, click the <strong>+</strong> menu (or right-click)</li>
          <li>Select <strong>FX Chains &rarr; Save FX chain</strong></li>
          <li>Name it (e.g., &quot;VEX Bouncy + Serum&quot;)</li>
        </ol>
        <p className="text-studio-gray-600 mt-4">
          To load later, go to <strong>FX Chains</strong> in the browser and double-click your saved chain.
        </p>
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
