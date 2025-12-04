import React from 'react';
import { SERVICES } from '../constants';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const Services: React.FC = () => {
  const services = SERVICES;

  const renderIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
    return <Icon className="h-8 w-8 text-darew-gold" />;
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-white dark:bg-darew-lightBlue py-20 border-b border-gray-200 dark:border-white/5 transition-colors">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-darew-white mb-4">Our Services</h1>
          <p className="text-gray-600 dark:text-darew-gray max-w-2xl mx-auto">
            Comprehensive energy solutions tailored to meet the demands of a modern world.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-gray-50 dark:bg-darew-blue transition-colors">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={service.id} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Image */}
                <div className="w-full md:w-1/2 relative group">
                  <div className="overflow-hidden rounded shadow-xl">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-darew-blue/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                  {/* Decorative Box */}
                  <div className={`absolute -bottom-4 ${index % 2 === 1 ? '-left-4' : '-right-4'} w-24 h-24 bg-darew-gold/10 border border-darew-gold/30 -z-10`}></div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white dark:bg-darew-lightBlue rounded-full shadow-sm dark:shadow-none">
                      {renderIcon(service.iconName)}
                    </div>
                    <span className="text-gray-500 dark:text-darew-gray text-sm font-bold tracking-widest uppercase">Service 0{index + 1}</span>
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-darew-white mb-6">{service.title}</h2>
                  <p className="text-gray-600 dark:text-darew-gray text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="text-gray-900 dark:text-darew-white font-semibold">Key Capabilities:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                       {/* Mock Capabilities based on service type - purely for display */}
                       <li className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"><div className="w-1.5 h-1.5 bg-darew-gold rounded-full"></div>Advanced Technology</li>
                       <li className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"><div className="w-1.5 h-1.5 bg-darew-gold rounded-full"></div>Global Compliance</li>
                       <li className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"><div className="w-1.5 h-1.5 bg-darew-gold rounded-full"></div>Expert Teams</li>
                       <li className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"><div className="w-1.5 h-1.5 bg-darew-gold rounded-full"></div>Sustainable Practice</li>
                    </ul>
                  </div>

                  <div className="mt-8">
                     <Link to="/contact" className="inline-flex items-center text-darew-gold font-semibold hover:gap-3 transition-all">
                        Consult with us <ArrowRight className="h-4 w-4 ml-2" />
                     </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;