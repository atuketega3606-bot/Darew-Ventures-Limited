import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-darew-gray pt-20 pb-10 border-t border-darew-lightBlue">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-darew-gold p-2 rounded-sm">
                <Droplets className="text-darew-blue h-6 w-6" />
              </div>
              <span className="text-xl font-serif font-bold text-darew-white tracking-wide">
                DAREW
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Leading the way in global energy solutions. We are committed to innovation, sustainability, and powering the future through responsible oil and gas operations.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                <a key={idx} href="#" className="bg-darew-lightBlue p-2 rounded hover:bg-darew-gold hover:text-darew-blue transition-colors duration-300">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-darew-white font-serif text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Projects', 'Careers', 'Investor Relations'].map((link) => (
                <li key={link}>
                  <Link to="/" className="text-sm hover:text-darew-gold flex items-center gap-2 transition-colors">
                    <ArrowRight className="h-3 w-3" /> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-darew-white font-serif text-lg mb-6">Our Services</h3>
            <ul className="space-y-4">
              {['Exploration', 'Refining', 'Distribution', 'Trading', 'Support Services'].map((link) => (
                <li key={link}>
                  <Link to="/services" className="text-sm hover:text-darew-gold flex items-center gap-2 transition-colors">
                    <ArrowRight className="h-3 w-3" /> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-darew-white font-serif text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-darew-gold shrink-0" />
                <span>124 Energy Boulevard, Victoria Island, Lagos, Nigeria.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-darew-gold shrink-0" />
                <span>+234 1 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-darew-gold shrink-0" />
                <span>contact@darewventure.com</span>
              </li>
              <li className="mt-4 pt-4 border-t border-darew-lightBlue">
                <span className="text-red-400 font-bold block mb-1">Emergency Support:</span>
                <span className="text-darew-white text-lg">+234 800 HELP OIL</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-darew-lightBlue pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Darew Venture Limited. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-darew-white">Privacy Policy</a>
            <a href="#" className="hover:text-darew-white">Terms of Service</a>
            <a href="#" className="hover:text-darew-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;