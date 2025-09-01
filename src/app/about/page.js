export default function AboutPage() {
  return (
    <div className="max-w-9xl mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl leading-relaxed text-studio-gray-700">
                extrasensory.studio is a creative practice focused on exploring the intersection 
                of technology, art, and human experience through experimental projects and tools.
              </p>
              
              <p>
                My work spans digital interfaces, generative systems, audio-visual installations, 
                and custom creative tools. I'm particularly interested in how emerging technologies 
                can enhance rather than replace human creativity.
              </p>
              
              <p>
                Through research, experimentation, and collaboration, I develop projects that 
                challenge conventional approaches to digital art, music production, and 
                interactive design.
              </p>
            </div>
            
            <div className="border-l-2 border-studio-gray-200 pl-6 mt-12">
              <h3 className="text-lg font-semibold mb-4">Currently Working On</h3>
              <ul className="space-y-2 text-studio-gray-600">
                <li>• Machine learning tools for creative audio processing</li>
                <li>• Interactive installation for [upcoming exhibition]</li>
                <li>• Research collaboration on perceptual interfaces</li>
                <li>• Open-source creative coding library</li>
              </ul>
            </div>
            
            <div className="mt-12">
              <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary">Email Me</button>
                <button className="btn-secondary">View CV</button>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-medium mb-3">Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Creative Coding',
                  'Audio Processing', 
                  'Interactive Design',
                  'Machine Learning',
                  'Physical Computing',
                  'Data Visualization',
                  'Web Technologies',
                  'Generative Art'
                ].map(skill => (
                  <span key={skill} className="px-3 py-1 text-sm bg-studio-gray-100 text-studio-gray-700 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Tools & Platforms</h4>
              <div className="text-sm text-studio-gray-600 space-y-1">
                <p>JavaScript, Python, C++</p>
                <p>Max/MSP, SuperCollider, Pure Data</p>
                <p>React, Next.js, Node.js</p>
                <p>Arduino, Raspberry Pi</p>
                <p>Ableton Live, Logic Pro</p>
                <p>Blender, TouchDesigner</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Selected Exhibitions</h4>
              <div className="text-sm text-studio-gray-600 space-y-2">
                <div>
                  <p className="font-medium">Digital Futures Festival</p>
                  <p>Toronto, 2024</p>
                </div>
                <div>
                  <p className="font-medium">Interactive Media Showcase</p>
                  <p>New York, 2023</p>
                </div>
                <div>
                  <p className="font-medium">Sound Art Collective</p>
                  <p>Berlin, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}