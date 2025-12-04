import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ChevronDown } from 'lucide-react';
import { WHY_CHOOSE_US, COMPANY_STATS, SERVICES } from '../constants';
import * as LucideIcons from 'lucide-react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
    }> = [];

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };

    const initParticles = () => {
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 0.2,
          dy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#fbbf24'; 
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.15)'; 

      particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;

        // Wrap particles
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.globalAlpha = 0.4;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.globalAlpha = 1 - dist / 120; // Fade out as distance increases
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    initParticles();
    draw();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none" />;
};

const Home: React.FC = () => {
  // Use static data directly
  const services = SERVICES;
  const stats = COMPANY_STATS;
  
  // Helper to render icon dynamically
  const renderIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
    return <Icon className="h-12 w-12 text-darew-gold mb-6" />;
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/1033/1920/1080" 
            alt="Offshore Platform" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-darew-blue/95 via-darew-blue/80 to-darew-blue/30"></div>
        </div>

        {/* Animated Particles */}
        <ParticleBackground />

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-3xl">
            <div className="inline-block border-l-4 border-darew-gold pl-4 mb-6">
              <p className="text-darew-gold tracking-widest uppercase font-semibold text-sm">Global Energy Leaders</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-darew-white leading-tight mb-8">
              Driving Energy. <br />
              <span className="gold-gradient-text">Powering Progress.</span>
            </h1>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl">
              Darew Venture Limited delivers world-class expertise in oil & gas exploration, distribution, logistics, and industrial solutions. Fueling the future with precision and integrity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/services" 
                className="bg-darew-gold text-darew-blue px-8 py-4 font-bold text-sm tracking-wide hover:bg-white transition-colors duration-300 text-center"
              >
                EXPLORE SERVICES
              </Link>
              <Link 
                to="/projects" 
                className="border border-white text-white px-8 py-4 font-bold text-sm tracking-wide hover:bg-white hover:text-darew-blue transition-colors duration-300 text-center"
              >
                VIEW PROJECTS
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a 
          href="#stats"
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10 text-darew-gold opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="animate-bounce h-6 w-6" />
        </a>
      </section>

      {/* Intro Stats Bar */}
      <section id="stats" className="bg-darew-gold text-darew-blue py-12 relative z-20 -mt-2">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center border-r border-darew-blue/10 last:border-0">
                <h3 className="text-4xl font-serif font-bold mb-2">{stat.value}</h3>
                <p className="text-sm font-semibold uppercase tracking-wider opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Services Preview */}
      <section id="services-preview" className="py-24 bg-gray-50 dark:bg-darew-blue transition-colors">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-darew-gold text-sm font-bold tracking-widest uppercase mb-2">Our Expertise</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-darew-white">Integrated Energy Solutions</h3>
            </div>
            <Link to="/services" className="text-gray-900 dark:text-darew-white hover:text-darew-gold flex items-center gap-2 mt-6 md:mt-0 transition-colors">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service) => (
              <div key={service.id} className="group relative bg-white dark:bg-darew-lightBlue p-8 border border-gray-200 dark:border-white/5 hover:border-darew-gold/50 shadow-sm dark:shadow-none transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-darew-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                {renderIcon(service.iconName)}
                <h4 className="text-xl font-bold text-gray-900 dark:text-darew-white mb-4">{service.title}</h4>
                <p className="text-sm text-gray-600 dark:text-darew-gray mb-6 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                <Link to="/services" className="inline-flex items-center text-darew-gold text-sm font-semibold group-hover:gap-2 transition-all">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="py-24 bg-white dark:bg-gradient-to-b dark:from-[#0f2444] dark:to-darew-blue relative overflow-hidden transition-colors">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-darew-gold/5 -skew-x-12 transform translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-darew-gold text-sm font-bold tracking-widest uppercase mb-3">Why Darew Venture</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-darew-white mb-6">Built on Trust, Driven by Excellence</h3>
            <p className="text-gray-600 dark:text-darew-gray">
              We combine decades of industry experience with cutting-edge technology to deliver superior results for our partners and stakeholders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-darew-blue/50 backdrop-blur-sm p-8 rounded border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-white/5 shadow-sm dark:shadow-none transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-darew-gold/10 p-3 rounded text-darew-gold">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-darew-white mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-darew-gray leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
         <div className="absolute inset-0">
          <img src="https://picsum.photos/id/203/1920/600" alt="Consultation" className="w-full h-full object-cover grayscale opacity-20" />
          <div className="absolute inset-0 bg-darew-blue/90 dark:bg-darew-blue/80"></div>
         </div>
         <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-darew-white mb-8">Ready to Optimize Your Operations?</h2>
            <p className="text-gray-300 dark:text-darew-gray max-w-2xl mx-auto mb-10 text-lg">
              Contact our expert team today to discuss how Darew Venture Limited can add value to your energy supply chain.
            </p>
            <Link to="/contact" className="inline-block bg-darew-gold text-darew-blue px-10 py-4 font-bold text-lg hover:bg-white transition-colors duration-300 rounded-sm">
              GET A QUOTE
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;