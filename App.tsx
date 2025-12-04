import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

// Contexts
import { ThemeProvider } from './contexts/ThemeContext';

// Scroll to top wrapper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    const timeout = setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
    }, 50);
    return () => clearTimeout(timeout);
  }, [pathname]);
  
  return null;
};

const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-darew-blue font-sans text-gray-900 dark:text-darew-gray selection:bg-darew-gold selection:text-darew-blue transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;