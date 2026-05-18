import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLampOn, setIsLampOn] = useState(false);

  useEffect(() => {
    if (!isLampOn) {
      document.body.style.overflow = 'hidden';
      document.body.style.backgroundColor = '#0a0a0a';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.backgroundColor = '';
    }
  }, [isLampOn]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const revealCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };
    const revealObserver = new IntersectionObserver(revealCallback, {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });
    revealElements.forEach((el) => revealObserver.observe(el));
    return () => revealElements.forEach((el) => revealObserver.unobserve(el));
  }, []);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleLamp = () => setIsLampOn(!isLampOn);

  return (
    <div className={`app-container ${isLampOn ? 'lamp-on' : 'lamp-off'}`}>
      <CustomCursor />
      
      {/* Modern Floating Theme Toggle */}
      <div 
        className={`modern-theme-toggle ${isLampOn ? 'active' : ''}`}
        onClick={toggleTheme}
        style={{
          position: 'fixed', bottom: '100px', right: '30px', zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: '8px',
          background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px',
          padding: '4px', cursor: 'pointer', backdropFilter: 'blur(12px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)', width: '84px', height: '42px',
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          opacity: isLampOn ? 1 : 0,
          pointerEvents: isLampOn ? 'auto' : 'none',
          transform: isLampOn ? 'translateX(0)' : 'translateX(100px)'
        }}
        title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      >
        <div style={{
          position: 'absolute', top: '4px', left: theme === 'dark' ? '44px' : '4px',
          width: '32px', height: '32px', borderRadius: '50%',
          background: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'white', 
          transition: 'left 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          boxShadow: theme === 'dark' ? 'none' : '0 2px 10px rgba(0,0,0,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
           <i className={theme === 'light' ? 'fas fa-sun' : 'fas fa-moon'} style={{ color: theme === 'light' ? '#f59e0b' : '#38bdf8', fontSize: '14px' }}></i>
        </div>
        <div style={{ zIndex: 1, flex: 1, display: 'flex', justifyContent: 'center', opacity: theme === 'dark' ? 0.4 : 1 }}>
          <i className="fas fa-sun" style={{ color: theme === 'light' ? '#f59e0b' : '#94a3b8', fontSize: '16px' }}></i>
        </div>
        <div style={{ zIndex: 1, flex: 1, display: 'flex', justifyContent: 'center', opacity: theme === 'dark' ? 1 : 0.4 }}>
          <i className="fas fa-moon" style={{ color: theme === 'dark' ? '#38bdf8' : '#94a3b8', fontSize: '16px' }}></i>
        </div>
      </div>

      <div style={{ opacity: isLampOn ? 1 : 0, pointerEvents: isLampOn ? 'auto' : 'none', transition: 'opacity 0.8s' }}>
        <Header />
      </div>
      <main>
        <Hero isLampOn={isLampOn} toggleLamp={toggleLamp} />
        <div style={{ opacity: isLampOn ? 1 : 0, transition: 'opacity 1s ease 0.3s', pointerEvents: isLampOn ? 'auto' : 'none' }}>
          <About />
          <Skills />
          <Work />
          <Contact />
        </div>
      </main>
      <div style={{ opacity: isLampOn ? 1 : 0, pointerEvents: isLampOn ? 'auto' : 'none' }}>
        <Footer />
      </div>
      
      <div 
        className={`back-to-top ${showBackToTop ? 'active' : ''}`} 
        onClick={scrollToTop}
        id="back-to-top"
      >
        <i className="fas fa-arrow-up"></i>
      </div>
    </div>
  );
}

export default App;
