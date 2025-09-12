import ProjectGrid from '../components/ProjectGrid'

export default function Home() {
  return (
    <div className="max-w-9xl mx-auto px-6">
      {/* Hero Section */}
      <section className="py-16 border-b border-studio-gray-200">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            extrasensory
          </h1>
          <p className="text-lg text-studio-gray-600 mb-8 max-w-2xl">
            works - tools - research
          </p>
          <div className="flex gap-4">
            <a href="/shop" className="btn-primary">Shop</a>
            <button className="btn-secondary">Get in Touch</button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Featured Project</h2>
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
