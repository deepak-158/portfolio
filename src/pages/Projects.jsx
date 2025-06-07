import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Eye, Filter, Calendar, Tag } from 'lucide-react';
import { projects, projectCategories } from '../data/projects';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const projectVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { 
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };
  return (
    <div className="projects-page">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container projects-container"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="projects-header">
          <h1 className="projects-title">
            My <span className="text-gradient">Projects</span>
          </h1>
          <p className="projects-subtitle">
            A collection of projects that showcase my skills and passion for creating innovative digital solutions.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="projects-filter">
          <div className="category-buttons">
            {projectCategories.map((category) => (              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`category-btn ${
                  activeCategory === category.id
                    ? 'category-btn-active'
                    : 'category-btn-inactive'
                }`}
              >
                <Filter size={18} />
                <span>{category.name}</span>
                <span className="category-count">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="projects-grid"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                variants={projectVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="project-card"
              >
                {/* Project Image */}
                <div className="project-image">
                  <div className="project-overlay"></div>
                  <div className="project-status">
                    <span className={`status-badge ${
                      project.status === 'completed' ? 'status-completed' : 'status-progress'
                    }`}>
                      {project.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  <div className="project-title-overlay">
                    <h3 className="project-overlay-title">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Project Content */}
                <div className="project-content">
                  <p className="project-description">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="project-tags">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="project-tag"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="project-tag-more">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="project-actions">
                    <div className="project-links">
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="project-demo-btn"
                      >
                        <ExternalLink size={14} />
                        <span>Demo</span>
                      </motion.a>
                      
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="project-code-btn"
                      >
                        <Github size={14} />
                        <span>Code</span>
                      </motion.a>
                    </div>

                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="project-details-btn"                    >
                      <Eye size={14} />
                      <span>Details</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="project-modal-overlay"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="project-modal"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="modal-header">
                  <div className="modal-header-overlay"></div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="modal-close-btn"
                  >
                    ×
                  </button>
                  <div className="modal-header-content">
                    <h2 className="modal-title">
                      {selectedProject.title}
                    </h2>
                    <div className="modal-meta">
                      <span className="modal-meta-item">
                        <Calendar size={16} />
                        <span>2024</span>
                      </span>
                      <span className="modal-meta-item">
                        <Tag size={16} />
                        <span className="modal-category">{selectedProject.category}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="modal-content">
                  <div className="modal-grid">
                    <div className="modal-main-content">
                      <div className="modal-section">
                        <h3 className="modal-section-title">
                          Project Overview
                        </h3>
                        <p className="modal-section-text">
                          {selectedProject.longDescription}
                        </p>
                      </div>

                      <div className="modal-section">
                        <h3 className="modal-section-title">
                          Key Features
                        </h3>
                        <ul className="feature-list">
                          {selectedProject.features?.map((feature, index) => (
                            <li key={index} className="feature-item">
                              <span className="feature-check">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="modal-sidebar">
                      <div className="modal-section">
                        <h3 className="modal-section-title-sm">
                          Technologies Used
                        </h3>
                        <div className="tech-categories">
                          {selectedProject.technologies && Object.entries(selectedProject.technologies).map(([category, techs]) => (
                            <div key={category} className="tech-category">
                              <h4 className="tech-category-title">
                                {category}:
                              </h4>
                              <div className="tech-tags">
                                {techs.map((tech, index) => (
                                  <span
                                    key={index}
                                    className="tech-tag"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="modal-actions">
                        <motion.a
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="modal-demo-btn"
                        >
                          <ExternalLink size={18} />
                          <span>View Live Demo</span>
                        </motion.a>
                        
                        <motion.a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="modal-code-btn"
                        >
                          <Github size={18} />
                          <span>View Source Code</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="projects-cta"
        >
          <h3 className="cta-title">
            Have a project in mind?
          </h3>
          <p className="cta-subtitle">
            I'm always excited to work on new challenges and bring innovative ideas to life.
          </p>          <div className="cta-buttons">            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="cta-button"
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Let's Collaborate</span>
                <motion.span
                  className="cta-arrow"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Projects;
