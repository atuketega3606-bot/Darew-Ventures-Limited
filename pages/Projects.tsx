import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { MapPin } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = PROJECTS;
  const [filter, setFilter] = useState<string>('All');
  const filters = ['All', 'Upstream', 'Downstream', 'Infrastructure'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-20">
       {/* Header */}
       <section className="bg-white dark:bg-darew-lightBlue py-20 border-b border-gray-200 dark:border-white/5 transition-colors">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-darew-white mb-4">Our Projects</h1>
          <p className="text-gray-600 dark:text-darew-gray max-w-2xl mx-auto">
            Showcasing our global impact and engineering milestones.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50 dark:bg-darew-blue min-h-screen transition-colors">
        <div className="container mx-auto px-6">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === f 
                  ? 'bg-darew-gold text-darew-blue' 
                  : 'bg-white dark:bg-darew-lightBlue text-gray-600 dark:text-darew-gray hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-transparent'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group bg-white dark:bg-darew-lightBlue rounded overflow-hidden hover:shadow-2xl hover:shadow-gray-200 dark:hover:shadow-darew-gold/10 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-transparent">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-darew-blue/90 px-3 py-1 text-xs font-bold text-darew-gold rounded uppercase tracking-wider">
                    {project.category}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center text-gray-500 dark:text-darew-gray text-xs mb-3">
                    <MapPin className="h-3 w-3 mr-1 text-darew-gold" />
                    {project.location}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-darew-white mb-3 group-hover:text-darew-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-darew-gray leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <button className="text-xs font-bold text-gray-900 dark:text-darew-white border-b border-darew-gold pb-0.5 hover:text-darew-gold transition-colors">
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;