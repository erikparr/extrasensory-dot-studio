const mockTools = [
  {
    id: 1,
    title: "Generative Pattern Maker",
    description: "Browser-based tool for creating procedural patterns and textures",
    type: "Web App",
    status: "Available",
    link: "#"
  },
  {
    id: 2,
    title: "Audio Visualizer Plugin",
    description: "Real-time audio analysis and visualization for creative applications",
    type: "Plugin",
    status: "Beta",
    link: "#"
  },
  {
    id: 3,
    title: "Color Harmony Generator",
    description: "Algorithmic color palette generation based on perceptual models",
    type: "Web App", 
    status: "Available",
    link: "#"
  },
  {
    id: 4,
    title: "Data Sonification Library",
    description: "JavaScript library for converting data into musical patterns",
    type: "Library",
    status: "Coming Soon",
    link: "#"
  }
]

export default function ToolsPage() {
  return (
    <div className="max-w-9xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Tools</h1>
        <p className="text-lg text-studio-gray-600 max-w-2xl">
          Custom-built tools, libraries, and applications designed to enhance 
          creative workflows and explore new possibilities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mockTools.map((tool) => (
          <div key={tool.id} className="project-card">
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">{tool.title}</h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    tool.status === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : tool.status === 'Beta'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-studio-gray-100 text-studio-gray-600'
                  }`}>
                    {tool.status}
                  </span>
                  <span className="text-sm text-studio-gray-500">{tool.type}</span>
                </div>
              </div>
              
              <p className="text-studio-gray-600 mb-6">
                {tool.description}
              </p>
              
              <div className="flex gap-3">
                {tool.status !== 'Coming Soon' && (
                  <button className="btn-primary">
                    Try Tool
                  </button>
                )}
                <button className="btn-secondary">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}