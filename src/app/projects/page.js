'use client'
import { useState } from 'react'
import ProjectGrid from '../../components/ProjectGrid'

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  
  const filters = ['All', 'Digital', 'Physical', 'Installation', 'Tool', 'Web']
  
  return (
    <div className="max-w-9xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-lg text-studio-gray-600 max-w-2xl">
          A collection of creative explorations spanning digital interfaces, 
          physical installations, and experimental tools.
        </p>
      </div>
      
      {/* Filters */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      {/* Projects Grid */}
      <ProjectGrid 
        category={activeFilter === 'All' ? null : activeFilter}
      />
    </div>
  )
}