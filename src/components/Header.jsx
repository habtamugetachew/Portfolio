import React, { useState, useEffect } from 'react';
import './BubbleNav.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = (section) => {
    setIsMobileMenuOpen(false);
    setActiveSection(section);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navItems = [
    { id: 'home', icon: 'fas fa-home', color: '#ef4444' },
    { id: 'about', icon: 'far fa-user', color: '#f59e0b' },
    { id: 'skills', icon: 'fas fa-code', color: '#10b981' },
    { id: 'work', icon: 'fas fa-briefcase', color: '#3b82f6' },
    { id: 'contact', icon: 'far fa-comment-dots', color: '#a855f7' }
  ];

  const activeIndex = navItems.findIndex(item => item.id === activeSection);
  const currentIndex = activeIndex === -1 ? 0 : activeIndex;

  return (
    <header id="main-header" className={isScrolled ? 'scrolled' : ''}>
      <div className="container">
        <nav className="navbar">
          <div className="logo-container">
            <img 
              src="/yona.png" 
              alt="Habtamu" 
              className="logo" 
              onClick={() => setShowPhotoModal(true)}
              style={{ cursor: 'pointer' }}
              onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Habtamu+G&background=random'; }} 
            />
            <span className="logo-text">Habtamu</span>
          </div>
          <div className={`bubble-nav-container ${isMobileMenuOpen ? 'active' : ''}`} id="nav-menu">
            <nav className="bubble-nav">
              <ul>
                {navItems.map((item, index) => (
                  <li 
                    key={item.id} 
                    className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => closeMobileMenu(item.id)}
                  >
                    <a href={`#${item.id}`}>
                      <span className="icon">
                        <i className={item.icon}></i>
                      </span>
                      <span className="text">{item.id.charAt(0).toUpperCase() + item.id.slice(1)}</span>
                    </a>
                  </li>
                ))}
                <div 
                  className="bubble-indicator" 
                  style={{ 
                    transform: `translateX(${currentIndex * 70}px)`,
                    backgroundColor: navItems[currentIndex].color,
                    boxShadow: `0 8px 20px ${navItems[currentIndex].color}80`
                  }}
                ></div>
              </ul>
            </nav>
          </div>
          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

            <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} id="hamburger-btn" onClick={toggleMobileMenu}>
              <i className="fas fa-bars"></i>
            </div>
          </div>
        </nav>
      </div>

      {showPhotoModal && (
        <div className="photo-modal-overlay" onClick={() => setShowPhotoModal(false)}>
          <div className="photo-modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-photo-modal" onClick={() => setShowPhotoModal(false)}>&times;</span>
            <div className="beautiful-4x4-frame">
              <img 
                src="/yona.png" 
                alt="Habtamu Large" 
                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Habtamu+G&background=random&size=400'; }} 
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
