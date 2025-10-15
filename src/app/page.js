import ProjectGrid from '../components/ProjectGrid'

export default function Home() {
  return (
    <div className="max-w-9xl mx-auto px-6">
      {/* Featured Projects */}
      <section className="py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Featured Project</h2>
        </div>
        <ProjectGrid featured={true} />
      </section>
    </div>
  );
}
