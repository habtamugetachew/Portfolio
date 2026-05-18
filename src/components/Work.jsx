import React, { useState } from 'react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div id="project-modal" className="modal" style={{ display: 'flex' }} onClick={(e) => {
      if (e.target.id === 'project-modal') onClose();
    }}>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <div className="modal-header">
          <h2>{project.title}</h2>
        </div>
        <div className="modal-body">
          <div className="modal-image">
            {project.image ? (
              <img src={project.image} alt={project.title} className="modal-img" />
            ) : (
              <div className="project-image-placeholder">
                <i className={project.icon}></i>
              </div>
            )}
          </div>
          <div className="modal-details">
            <h3>Project Overview</h3>
            <p>{project.description}</p>
            
            <div className="modal-features">
              <h4>Key Features</h4>
              <ul>
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="modal-tech">
              <h4>Technologies Used</h4>
              <div>
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="modal-links">
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn" onClick={(e) => { 
                if(project.liveDemo === '#') { 
                  e.preventDefault(); 
                  alert('Live demo coming soon!'); 
                } 
              }}>
                <i className="fas fa-external-link-alt"></i> Live Demo
              </a>
              <a href={project.sourceCode} target="_blank" rel="noopener noreferrer" className="btn btn-outline" onClick={(e) => { 
                if(project.sourceCode === '#') { 
                  e.preventDefault(); 
                  alert('Source code is private or coming soon!'); 
                } 
              }}>
                <i className="fab fa-github"></i> Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "FoodExpress",
      icon: "fas fa-utensils",
      image: "/food_express.png",
      shortDescription: "Modern food delivery platform with real-time tracking and 3D globe driver interface.",
      description: "A comprehensive food delivery ecosystem featuring dedicated dashboards for Admins, Customers, and Drivers. It includes real-time order tracking, a dynamic menu management system, and a cutting-edge 3D rotating globe interface for driver route visualization.",
      features: [
          "Multi-role Authentication (Admin, Customer, Driver)",
          "Interactive 3D Globe for Driver tracking",
          "Real-time push notifications for order status",
          "Dynamic cart and checkout system",
          "Modern, glassmorphic UI with theme switching",
          "Admin analytics and menu management"
      ],
      technologies: ["React", "Vite", "Lucide React", "CSS3", "Context API"],
      liveDemo: "http://localhost:5174",
      sourceCode: "#"
    },
    {
      id: 2,
      title: "HG Tech Shop",
      icon: "fas fa-shopping-cart",
      image: "/tech_shop.png",
      shortDescription: "Premium e-commerce platform for tech gadgets with a modern dark/light mode UI.",
      description: "A fully responsive e-commerce front-end showcasing premium technology products. Features include a dynamic product grid, floating theme toggles, custom cursor animations, an interactive shopping cart drawer, and quick-view modals.",
      features: [
          "Dark/Light theme toggle",
          "Custom cursor animation",
          "Interactive shopping cart drawer",
          "Product quick-view modal",
          "Responsive grid layouts"
      ],
      technologies: ["HTML5", "Vanilla CSS", "JavaScript"],
      liveDemo: "/techshop.html",
      sourceCode: "#"
    },
    {
      id: 3,
      title: "Modern Expense Tracker",
      icon: "fas fa-wallet",
      image: "/expense_tracker.png",
      shortDescription: "A sophisticated financial management tool with multi-language and currency support.",
      description: "A premium glassmorphic web application designed for personal finance tracking. It features real-time balance updates, categorical spending charts using Chart.js, and support for multiple currencies and languages (English & Amharic).",
      features: [
          "Real-time Balance, Income, and Expense tracking",
          "Interactive spending overview with Chart.js",
          "Multi-currency support (USD, ETB, EUR, etc.)",
          "Bilingual interface (English & Amharic)",
          "Dark/Light theme persistence",
          "Glassmorphic UI with dynamic background elements"
      ],
      technologies: ["JavaScript (ES6+)", "Chart.js", "HTML5", "CSS3", "Local Storage"],
      liveDemo: "/expense-tracker/index.html",
      sourceCode: "#"
    }
  ];

  return (
    <section id="work" className="section">
      <div className="container">
        <h2 className="section-title reveal">My <span>Work</span></h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card reveal delay-${(index % 3) + 1}`} 
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-image-container">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="project-img" />
                ) : (
                  <div className="project-image-placeholder">
                    <i className={project.icon}></i>
                  </div>
                )}
              </div>
              <div className="project-overlay">
                <h3>{project.title}</h3>
                <p>{project.shortDescription}</p>
                <button className="btn btn-outline" onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(project);
                }}>View Details</button>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.shortDescription}</p>
                <div className="project-tags">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="project-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Work;
