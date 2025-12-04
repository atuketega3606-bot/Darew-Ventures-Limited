import React from 'react';
import { Target, Eye, Award, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-white dark:bg-darew-lightBlue py-20 border-b border-gray-200 dark:border-white/5 transition-colors">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-darew-white mb-4">About Us</h1>
          <p className="text-gray-600 dark:text-darew-gray max-w-2xl mx-auto">
            A legacy of excellence in the international oil and gas sector.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50 dark:bg-darew-blue transition-colors">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
              <div className="relative z-10">
                <img 
                  src="https://picsum.photos/id/1031/800/600" 
                  alt="Oil Rig" 
                  className="rounded shadow-2xl shadow-gray-400/20 dark:shadow-black/50"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-darew-gold z-0 hidden md:block"></div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-darew-gold text-sm font-bold tracking-widest uppercase mb-2">Our Story</h2>
              <h3 className="text-3xl font-serif font-bold text-gray-900 dark:text-darew-white mb-6">Pioneering Energy Solutions Since 1998</h3>
              <p className="text-gray-600 dark:text-darew-gray mb-6 leading-relaxed">
                Darew Venture Limited has evolved from a regional logistics provider into a premier international energy company. Through strategic investments in technology and human capital, we have expanded our footprint across the upstream and downstream sectors.
              </p>
              <p className="text-gray-600 dark:text-darew-gray mb-8 leading-relaxed">
                We are committed to sustainable growth, balancing the world's need for energy with responsible environmental stewardship. Our operations adhere to the highest international standards of safety and compliance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <Target className="text-darew-gold h-8 w-8 shrink-0" />
                  <div>
                    <h4 className="text-gray-900 dark:text-darew-white font-bold mb-1">Our Mission</h4>
                    <p className="text-sm text-gray-600 dark:text-darew-gray">To deliver reliable energy solutions that drive economic growth while upholding the highest safety standards.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Eye className="text-darew-gold h-8 w-8 shrink-0" />
                  <div>
                    <h4 className="text-gray-900 dark:text-darew-white font-bold mb-1">Our Vision</h4>
                    <p className="text-sm text-gray-600 dark:text-darew-gray">To be the preferred global partner in the energy sector, known for integrity and innovation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Safety */}
      <section className="py-20 bg-white dark:bg-darew-lightBlue transition-colors">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Safety Commitment */}
            <div className="bg-gray-50 dark:bg-darew-blue p-8 rounded border border-gray-200 dark:border-white/5 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <ShieldCheckIcon />
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-darew-white">Safety & Compliance</h3>
              </div>
              <p className="text-gray-600 dark:text-darew-gray mb-6">
                At Darew Venture, safety is not just a policy; it is our culture. We operate under strict HSSE (Health, Safety, Security, and Environment) guidelines.
              </p>
              <ul className="space-y-3">
                {['ISO 9001:2015 Certified', 'Zero Harm Policy', 'Environmental Impact Assessments', 'Regular Safety Audits'].map((item, idx) => (
                   <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-darew-white">
                      <CheckCircle className="h-4 w-4 text-darew-gold" /> {item}
                   </li>
                ))}
              </ul>
            </div>

            {/* Operational Excellence */}
            <div className="bg-gray-50 dark:bg-darew-blue p-8 rounded border border-gray-200 dark:border-white/5 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <Award className="h-8 w-8 text-darew-gold" />
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-darew-white">Operational Excellence</h3>
              </div>
              <p className="text-gray-600 dark:text-darew-gray mb-6">
                 We leverage cutting-edge technology and data analytics to optimize our exploration and distribution processes, ensuring maximum efficiency and minimal downtime.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center mt-8">
                  <div>
                    <div className="text-3xl text-gray-900 dark:text-darew-white font-bold">99.9%</div>
                    <div className="text-xs text-gray-500 dark:text-darew-gray uppercase mt-1">Reliability</div>
                  </div>
                  <div>
                    <div className="text-3xl text-gray-900 dark:text-darew-white font-bold">24/7</div>
                    <div className="text-xs text-gray-500 dark:text-darew-gray uppercase mt-1">Support</div>
                  </div>
                  <div>
                    <div className="text-3xl text-gray-900 dark:text-darew-white font-bold">Global</div>
                    <div className="text-xs text-gray-500 dark:text-darew-gray uppercase mt-1">Reach</div>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

// Helper Icon for local usage if needed, or import directly
const ShieldCheckIcon = () => (
    <svg className="h-8 w-8 text-darew-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

export default About;