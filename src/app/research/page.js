const mockArticles = [
  {
    id: 1,
    title: "The Future of Generative Audio Interfaces",
    excerpt: "Exploring how machine learning can transform real-time audio manipulation and creative expression through intelligent user interfaces.",
    category: "Research",
    date: "2024-08-15",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Building Responsive Data Visualizations",
    excerpt: "A deep dive into creating adaptive visualizations that respond to both data complexity and user context in real-time.",
    category: "Process",
    date: "2024-07-22",
    readTime: "12 min read"
  },
  {
    id: 3,
    title: "Physical Computing in Creative Practice",
    excerpt: "Documenting experiments in bridging digital and physical realms through sensors, actuators, and custom hardware.",
    category: "Experiment",
    date: "2024-06-18",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Collaborative Tools for Remote Creativity",
    excerpt: "Investigating new paradigms for creative collaboration when traditional co-location isn't possible.",
    category: "Theory",
    date: "2024-05-30",
    readTime: "10 min read"
  }
]

export default function ResearchPage() {
  return (
    <div className="max-w-9xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Research</h1>
        <p className="text-lg text-studio-gray-600 max-w-2xl">
          Ongoing investigations into creative technology, process documentation, 
          and experimental approaches to digital art and design.
        </p>
      </div>
      
      <div className="space-y-12">
        {mockArticles.map((article) => (
          <article key={article.id} className="border-b border-studio-gray-200 pb-12 last:border-b-0">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 text-sm bg-studio-gray-200 text-studio-gray-700 rounded-full">
                  {article.category}
                </span>
                <span className="text-sm text-studio-gray-500 font-mono">
                  {article.date}
                </span>
                <span className="text-sm text-studio-gray-500">
                  {article.readTime}
                </span>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4 hover:underline cursor-pointer">
              {article.title}
            </h2>
            
            <p className="text-studio-gray-600 text-lg leading-relaxed mb-6">
              {article.excerpt}
            </p>
            
            <button className="text-sm font-medium hover:underline">
              Read Article →
            </button>
          </article>
        ))}
      </div>
      
      <div className="mt-16 pt-12 border-t border-studio-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Want to collaborate?</h3>
          <p className="text-studio-gray-600 mb-6">
            Always interested in research partnerships and experimental projects.
          </p>
          <button className="btn-primary">Get in Touch</button>
        </div>
      </div>
    </div>
  )
}