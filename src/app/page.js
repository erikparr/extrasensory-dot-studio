import ProjectGrid from '../components/ProjectGrid'

export default function Home() {
  return (
    <div className="max-w-9xl mx-auto px-6">
      {/* Hero Section */}
      <section className="py-16 border-b border-studio-gray-200">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Creative studio for digital experiences, tools & research
          </h1>
          <p className="text-lg text-studio-gray-600 mb-8 max-w-2xl">
            Exploring the intersection of technology and creativity through projects, 
            custom tools, and experimental research.
          </p>
          <div className="flex gap-4">
            <button className="btn-primary">View Projects</button>
            <button className="btn-secondary">Get in Touch</button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
          <a href="/projects" className="text-sm hover:underline">View all →</a>
        </div>
        <ProjectGrid featured={true} />
      </section>

      {/* Status */}
      <section className="py-16 border-t border-studio-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium mb-2">Currently</h3>
            <p className="text-studio-gray-600">
              Available for new projects • Based in [Location]
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-studio-gray-500 mb-1">Last updated</p>
            <p className="text-sm font-mono">2024.08.31</p>
          </div>
        </div>
      </section>
    </div>
  );
}
