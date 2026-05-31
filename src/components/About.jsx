import React from 'react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title reveal">About <span>Me</span></h2>
        
        <div className="about-modern-layout">
          <div className="about-text-card reveal fade-left">
            <h3 className="about-heading"><i className="fas fa-user-astronaut"></i> Who Am I?</h3>
            <p className="about-paragraph">
              I'm a passionate Full Stack Developer with expertise in both front-end and back-end technologies.
              I specialize in creating responsive, user-friendly web applications that deliver exceptional experiences.
            </p>
            <p className="about-paragraph">
              With a strong foundation in computer science and years of hands-on experience, I bring ideas to
              life through clean, efficient code and intuitive design. My approach combines technical expertise
              with creative problem-solving to deliver solutions that exceed expectations.
            </p>
            
            <div className="personal-info-chips">
              <div className="info-chip">
                <i className="fas fa-id-card chip-icon"></i>
                <div className="chip-details">
                  <span className="chip-label">Name</span>
                  <p className="chip-value">Habtamu Getachew</p>
                </div>
              </div>
              <div className="info-chip">
                <i className="fas fa-envelope chip-icon"></i>
                <div className="chip-details">
                  <span className="chip-label">Email</span>
                  <p className="chip-value">habtamugetachew101@gmail.com</p>
                </div>
              </div>
              <div className="info-chip">
                <i className="fas fa-birthday-cake chip-icon"></i>
                <div className="chip-details">
                  <span className="chip-label">Birthday</span>
                  <p className="chip-value">28 April 2004</p>
                </div>
              </div>
              <div className="info-chip">
                <i className="fas fa-map-marker-alt chip-icon"></i>
                <div className="chip-details">
                  <span className="chip-label">Location</span>
                  <p className="chip-value">Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-stats-grid reveal fade-right delay-1">
            <div className="stat-beauty-box">
              <div className="stat-icon-wrapper"><i className="fas fa-calendar-alt"></i></div>
              <h3>3+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-beauty-box">
              <div className="stat-icon-wrapper"><i className="fas fa-project-diagram"></i></div>
              <h3>3+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-beauty-box">
              <div className="stat-icon-wrapper"><i className="fas fa-smile-beam"></i></div>
              <h3>1+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat-beauty-box">
              <div className="stat-icon-wrapper"><i className="fas fa-star"></i></div>
              <h3>99%</h3>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
