const mockProjects = [
  {
    id: 1,
    title: "Interactive Sound Installation",
    category: "Installation",
    year: "2024",
    image: "/api/placeholder/400/300",
    featured: true
  },
  {
    id: 2,
    title: "Generative Design Tool",
    category: "Tool",
    year: "2024",
    image: "/api/placeholder/400/300",
    featured: true
  },
  {
    id: 3,
    title: "Data Visualization Platform",
    category: "Digital",
    year: "2024",
    image: "/api/placeholder/400/300",
    featured: true
  },
  {
    id: 4,
    title: "Experimental Web Interface",
    category: "Web",
    year: "2023",
    image: "/api/placeholder/400/300",
    featured: false
  },
  {
    id: 5,
    title: "Audio Processing Plugin",
    category: "Tool",
    year: "2023",
    image: "/api/placeholder/400/300",
    featured: false
  },
  {
    id: 6,
    title: "Physical Computing Project",
    category: "Physical",
    year: "2023",
    image: "/api/placeholder/400/300",
    featured: false
  }
]

export default function ProjectGrid({ featured = false, category = null }) {
  let projects = mockProjects
  
  if (featured) {
    projects = projects.filter(p => p.featured)
  }
  
  if (category) {
    projects = projects.filter(p => p.category === category)
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="project-card group">
          <div className="aspect-[4/3] bg-studio-gray-200 mb-4 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-studio-gray-300 to-studio-gray-400 flex items-center justify-center">
              <span className="text-studio-gray-600 text-sm">Image</span>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-lg group-hover:underline">
                {project.title}
              </h3>
              <span className="text-sm text-studio-gray-500 font-mono">
                {project.year}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-studio-gray-600">
                {project.category}
              </span>
              <span className="text-sm text-studio-gray-400">→</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}