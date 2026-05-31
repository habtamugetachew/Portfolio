import React, { useEffect, useRef, useState } from 'react';

const technicalSkills = [
  { name: 'HTML/CSS', percentage: 90, icon: 'fab fa-html5' },
  { name: 'JavaScript', percentage: 80, icon: 'fab fa-js' },
  { name: 'React', percentage: 85, icon: 'fab fa-react' },
  { name: 'Node.js', percentage: 70, icon: 'fab fa-node-js' },
  { name: 'MongoDB', percentage: 65, icon: 'fas fa-database' },
];

const softSkills = [
  { name: 'Communication', percentage: 85, icon: 'fas fa-comments' },
  { name: 'Problem Solving', percentage: 80, icon: 'fas fa-puzzle-piece' },
  { name: 'Teamwork', percentage: 90, icon: 'fas fa-users' },
  { name: 'Creativity', percentage: 75, icon: 'fas fa-lightbulb' },
  { name: 'Project Management', percentage: 70, icon: 'fas fa-tasks' },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="section bg-light" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title reveal">My <span>Skills</span></h2>
        
        <div className="skills-grid-container">
          <div className="skill-category reveal">
            <h3 className="category-title"><i className="fas fa-laptop-code"></i> Technical Skills</h3>
            <div className="beauty-boxes-grid">
              {technicalSkills.map((skill, index) => (
                <div className="beauty-box" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="box-icon"><i className={skill.icon}></i></div>
                  <div className="box-content">
                    <h4>{skill.name}</h4>
                    <div className="box-progress-bg">
                      <div className="box-progress-fill" style={{ width: isVisible ? `${skill.percentage}%` : '0%' }}></div>
                    </div>
                    <span className="box-percentage">{skill.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="skill-category reveal delay-1">
            <h3 className="category-title"><i className="fas fa-users-cog"></i> Tools & Technologies</h3>    
            <div className="beauty-boxes-grid">
              {softSkills.map((skill, index) => (
                <div className="beauty-box" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="box-icon"><i className={skill.icon}></i></div>
                  <div className="box-content">
                    <h4>{skill.name}</h4>
                    <div className="box-progress-bg">
                      <div className="box-progress-fill" style={{ width: isVisible ? `${skill.percentage}%` : '0%' }}></div>
                    </div>
                    <span className="box-percentage">{skill.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
