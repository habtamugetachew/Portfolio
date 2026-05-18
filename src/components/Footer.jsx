import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer">
      <div className="container">
        <div className="footer-content">
          
          <div className="footer-about">
            <div className="footer-logo">
              <div className="footer-logo-icon-wrapper">
                <i className="fas fa-code"></i>
              </div>
              <span className="footer-logo-text">Habtamu Getachew</span>
            </div>
            <p>
              A passionate Full Stack Developer dedicated to creating beautiful, functional websites and applications
              that deliver exceptional user experiences.
            </p>
            <div className="social-icons">
              <a href="https://github.com/HabtamuGetachew" aria-label="GitHub" className="social-btn"><i className="fab fa-github"></i></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home"><i className="fas fa-chevron-right"></i> Home</a></li>
              <li><a href="#about"><i className="fas fa-chevron-right"></i> About</a></li>
              <li><a href="#skills"><i className="fas fa-chevron-right"></i> Skills</a></li>
              <li><a href="#work"><i className="fas fa-chevron-right"></i> Work</a></li>
              <li><a href="#contact"><i className="fas fa-chevron-right"></i> Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>Get in Touch</h3>
            <p>Ready to collaborate or have a question? I'd love to hear from you.</p>
            <div className="footer-contact-details">
              <div className="footer-contact-item">
                <i className="fas fa-envelope"></i>
                <a href="mailto:habtamugetachew101@gmail.com">habtamugetachew101@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <i className="fas fa-phone-alt"></i>
                <a href="tel:+251942306750">+251 942 306 750</a>
              </div>
              <div className="footer-contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
          
        </div>
        <div className="footer-bottom">
          <p>&copy; <span>{currentYear}</span> Habtamu Getachew. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
