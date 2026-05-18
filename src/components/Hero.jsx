import React, { useState, useEffect } from 'react';
import Lamp from './Lamp';
import './LampLayout.css';

const Hero = ({ isLampOn, toggleLamp }) => {
  const [typedText, setTypedText] = useState('');
  
  useEffect(() => {
    const professions = ["Full Stack Developer", "Web Designer", "UI/UX Enthusiast"];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentProfession = professions[professionIndex];
      
      if (isDeleting) {
        setTypedText(currentProfession.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentProfession.substring(0, charIndex + 1));
        charIndex++;
      }
      
      if (!isDeleting && charIndex === currentProfession.length) {
        isDeleting = true;
        timeoutId = setTimeout(type, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        timeoutId = setTimeout(type, 500);
      } else {
        const typingSpeed = isDeleting ? 100 : 150;
        timeoutId = setTimeout(type, typingSpeed);
      }
    };

    timeoutId = setTimeout(type, 1000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section id="home" className={`hero ${isLampOn ? 'is-on' : 'is-off'}`}>
      <div className="hero-layout">
        <div className="lamp-section">
          <Lamp isOn={isLampOn} toggleLamp={toggleLamp} />
        </div>
        
        <div className="hero-text-section">
          <div className="hero-content reveal fade-right delay-1">
            <h2 className="greeting modern-greeting">Hello, I'm</h2>
            <h1 className="modern-hero-title"><span className="gradient-text">Habtamu</span> Getachew</h1>
            
            <p className="typing-text modern-typing">{typedText}<span className="cursor">|</span></p>
            <p className="hero-description">I create beautiful, functional websites and applications that deliver exceptional user experiences.</p>
            
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-premium">
                <i className="fas fa-paper-plane"></i> Contact Me
              </a>
              <a href="#work" className="btn btn-outline btn-premium-outline">
                <i className="fas fa-briefcase"></i> My Work
              </a>
            </div>
            
            <div className="social-icons hero-socials">
              <a href="https://github.com/HabtamuGetachew" aria-label="GitHub" className="social-btn"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
