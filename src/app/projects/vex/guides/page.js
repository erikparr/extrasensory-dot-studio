import Link from 'next/link'

const guides = [
  {
    id: 'ableton',
    title: 'Ableton Live',
    description: 'Set up VEX using MIDI track routing in Ableton Live. Learn the two-track method for third-party MIDI effects.',
    href: '/projects/vex/guides/ableton'
  },
  {
    id: 'logic-pro',
    title: 'Logic Pro',
    description: 'Use VEX directly in Logic Pro\'s MIDI FX slot. The simplest setup with native Audio Unit support.',
    href: '/projects/vex/guides/logic-pro'
  },
  {
    id: 'reaper',
    title: 'REAPER',
    description: 'Add VEX to your FX chain in REAPER. Place it before any instrument for instant MIDI transformation.',
    href: '/projects/vex/guides/reaper'
  }
]

export default function VexGuidesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/projects/vex" className="text-studio-gray-500 hover:text-studio-accent mb-8 inline-block">
        Back to VEX
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">VEX Setup Guides</h1>
        <p className="text-lg text-studio-gray-600 max-w-2xl">
          Step-by-step instructions for setting up VEX MIDI EXPRESSION in your DAW.
          Choose your DAW below to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.id}
            href={guide.href}
            className="project-card block hover:border-studio-accent transition-colors"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
              <p className="text-studio-gray-600 text-sm">
                {guide.description}
              </p>
              <div className="mt-4 text-studio-accent text-sm font-medium">
                View Guide
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-studio-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Other DAWs</h2>
        <p className="text-studio-gray-600 text-sm">
          VEX works with any DAW that supports VST3 or Audio Unit MIDI effects, including
          Bitwig Studio, Cubase, FL Studio, Studio One, and more. The REAPER guide provides
          a good general reference for DAWs that allow MIDI effects in the FX chain.
        </p>
      </div>
    </div>
  )
}
