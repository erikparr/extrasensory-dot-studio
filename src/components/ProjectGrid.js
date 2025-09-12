'use client'

const mockProjects = [
  {
    id: 1,
    title: "MIDI WARP",
    category: "Audio Plugin",
    year: "2024",
    image: "/MIDI_WARP_screenshot.png",
    featured: true,
    description: "Revolutionary MIDI effect plugin that transforms static MIDI controller input into dynamic, expressive musical performance using real-time physics simulation."
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
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
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