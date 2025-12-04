import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplets, Sun, Moon } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-darew-blue/95 backdrop-blur-md shadow-lg py-4 text-gray-900 dark:text-white' 
          : 'bg-transparent py-6 text-white' // Text always white on transparent header (Hero image)
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-darew-gold p-2 rounded-sm group-hover:bg-darew-goldHover transition-colors">
            <Droplets className="text-darew-blue h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-serif font-bold tracking-wide ${isScrolled ? 'text-gray-900 dark:text-darew-white' : 'text-white'}`}>
              DAREW
            </span>
            <span className="text-xs text-darew-gold tracking-[0.2em] uppercase">
              Venture Ltd
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm tracking-wide transition-all duration-300 relative group px-1 ${
                  isActive 
                    ? 'text-darew-gold font-bold' 
                    : isScrolled 
                      ? 'text-gray-700 dark:text-darew-gray hover:text-darew-gold dark:hover:text-darew-white' 
                      : 'text-gray-200 hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-darew-gold transform origin-left transition-transform duration-300 ${
                   isActive ? 'scale-x-100 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            );
          })}
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-full transition-colors ${
              isScrolled 
                ? 'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-darew-gold' 
                : 'hover:bg-white/10 text-darew-gold'
            }`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <Link
            to="/contact"
            className="border border-darew-gold text-darew-gold px-6 py-2 text-sm font-semibold hover:bg-darew-gold hover:text-darew-blue transition-all duration-300"
          >
            GET IN TOUCH
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme} 
            className="text-darew-gold p-2"
          >
             {theme === 'dark' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
          </button>
          <button
            className={`${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'} focus:outline-none`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white dark:bg-darew-blue z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden mt-20 border-t border-gray-100 dark:border-gray-800`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-2xl font-serif transition-colors ${
                location.pathname === item.path 
                  ? 'text-darew-gold font-bold' 
                  : 'text-gray-900 dark:text-darew-white hover:text-darew-gold'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;