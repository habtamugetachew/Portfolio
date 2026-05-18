import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, select, .beauty-box, .stat-beauty-box, .contact-item-box, .nav-links li, .logo-container, .theme-toggle, .social-icon, .social-btn, .project-card, .skill-pill')) {
        setIsHovered(true);
      }
    };
    
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, input, textarea, select, .beauty-box, .stat-beauty-box, .contact-item-box, .nav-links li, .logo-container, .theme-toggle, .social-icon, .social-btn, .project-card, .skill-pill')) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div 
        className={`custom-cursor-dot ${isHovered ? 'hovered' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`custom-cursor-ring ${isHovered ? 'hovered' : ''}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          /* We add a small delay for a smooth trailing effect */
          transition: 'left 0.1s ease-out, top 0.1s ease-out, width 0.25s, height 0.25s, border-color 0.25s, background-color 0.25s' 
        }}
      />
    </>
  );
};

export default CustomCursor;
