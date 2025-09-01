const mockProducts = [
  {
    id: 1,
    title: "Generative Art Print Series",
    price: "$45",
    category: "Print",
    image: "/api/placeholder/300/400",
    description: "Limited edition algorithmic art prints, 12\"x16\" archival quality"
  },
  {
    id: 2,
    title: "Audio Plugin Bundle", 
    price: "$89",
    category: "Digital",
    image: "/api/placeholder/300/400",
    description: "Collection of experimental audio processing tools for creative production"
  },
  {
    id: 3,
    title: "Custom Design Consultation",
    price: "$150/hr",
    category: "Service",
    image: "/api/placeholder/300/400",
    description: "One-on-one creative consultation for digital projects and tools"
  },
  {
    id: 4,
    title: "Workshop: Creative Coding",
    price: "$200",
    category: "Workshop",
    image: "/api/placeholder/300/400",
    description: "4-hour intensive workshop on creative coding fundamentals"
  }
]

export default function ShopPage() {
  return (
    <div className="max-w-9xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Shop</h1>
        <p className="text-lg text-studio-gray-600 max-w-2xl">
          Digital tools, physical prints, and creative services. 
          All proceeds support ongoing research and experimental projects.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {mockProducts.map((product) => (
          <div key={product.id} className="project-card group">
            <div className="aspect-[3/4] bg-studio-gray-200 mb-4 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-studio-gray-300 to-studio-gray-400 flex items-center justify-center">
                <span className="text-studio-gray-600 text-sm">Image</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-studio-gray-600 px-2 py-1 bg-studio-gray-200 rounded-full">
                  {product.category}
                </span>
                <span className="font-semibold">
                  {product.price}
                </span>
              </div>
              
              <h3 className="font-medium text-lg mb-2 group-hover:underline">
                {product.title}
              </h3>
              
              <p className="text-sm text-studio-gray-600 mb-4 leading-relaxed">
                {product.description}
              </p>
              
              <button className="w-full btn-primary">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 pt-12 border-t border-studio-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Custom Projects</h3>
          <p className="text-studio-gray-600 mb-6 max-w-2xl mx-auto">
            Looking for something specific? I create custom tools, installations, 
            and digital experiences tailored to your needs.
          </p>
          <button className="btn-secondary">Discuss a Project</button>
        </div>
      </div>
    </div>
  )
}