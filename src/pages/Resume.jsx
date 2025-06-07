import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEye, FaFilePdf, FaPrint, FaShare, FaCertificate } from 'react-icons/fa';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [showPDF, setShowPDF] = useState(false);

  // Resume data
  const resumeData = {
    name: "Deepak Shukla",
    title: "B.Tech Computer Science Student",
    contact: {
      email: "deepak.shukla@example.com",
      phone: "+91 98765 43210",
      location: "India",
      linkedin: "linkedin.com/in/deepakshukla",
      github: "github.com/deepakshukla"
    },
    summary: "Passionate B.Tech Computer Science student with strong foundation in programming, web development, and software engineering. Experienced in full-stack development with modern technologies and frameworks.",
    education: [
      {
        degree: "Bachelor of Technology in Computer Science",
        institution: "ABC University",
        location: "City, State",
        duration: "2021 - 2025",
        gpa: "8.5/10",
        relevant_courses: ["Data Structures & Algorithms", "Database Management", "Web Development", "Software Engineering", "Machine Learning"]
      }
    ],
    experience: [
      {
        title: "Web Development Intern",
        company: "Tech Solutions Pvt Ltd",
        location: "Remote",
        duration: "Jun 2023 - Aug 2023",
        description: [
          "Developed responsive web applications using React.js and Node.js",
          "Collaborated with design team to implement UI/UX improvements",
          "Optimized application performance resulting in 30% faster load times"
        ]
      },
      {
        title: "Frontend Developer",
        company: "StartupXYZ",
        location: "Remote",
        duration: "Jan 2023 - May 2023",
        description: [
          "Built interactive user interfaces using React and CSS frameworks",
          "Implemented responsive design principles for mobile compatibility",
          "Worked with RESTful APIs to integrate frontend with backend services"
        ]
      }
    ],
    skills: {
      "Programming Languages": ["JavaScript", "Python", "Java", "C++", "HTML/CSS"],
      "Frameworks & Libraries": ["React.js", "Node.js", "Express.js", "Bootstrap", "Tailwind CSS"],
      "Databases": ["MySQL", "MongoDB", "PostgreSQL"],
      "Tools & Technologies": ["Git", "Docker", "AWS", "VS Code", "Postman"]
    },
    projects: [
      {
        name: "E-Commerce Platform",
        technologies: ["React", "Node.js", "MongoDB"],
        description: "Full-stack e-commerce application with user authentication, product catalog, and payment integration."
      },
      {
        name: "Task Management App",
        technologies: ["React", "Firebase"],
        description: "Real-time task management application with collaborative features and cloud synchronization."
      },
      {
        name: "Weather Dashboard",
        technologies: ["JavaScript", "API Integration"],
        description: "Interactive weather application with location-based forecasts and dynamic visualizations."
      }
    ],
    certifications: [
      "AWS Cloud Practitioner",
      "Google Analytics Certified",
      "React Developer Certification",
      "JavaScript Algorithms and Data Structures"
    ]
  };

  const handleDownload = () => {
    // Create a downloadable PDF or doc file
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // You would have this file in your public folder
    link.download = 'Deepak_Shukla_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Deepak Shukla - Resume',
          text: 'Check out my resume',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Resume URL copied to clipboard!');
    }
  };

  return (
    <div className="resume-page">
      <div className="resume-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="resume-header"
        >
          <h1 className="resume-title">
            My Resume
          </h1>
          <p className="resume-subtitle">
            Download or view my professional resume showcasing my skills, experience, and achievements.
          </p>

          {/* Action Buttons */}
          <div className="resume-actions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="resume-action-btn btn-primary"
            >
              <FaDownload />
              <span>Download PDF</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPDF(!showPDF)}
              className="resume-action-btn btn-secondary"
            >
              <FaEye />
              <span>{showPDF ? 'Hide' : 'View'} Preview</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="resume-action-btn btn-accent"
            >
              <FaPrint />
              <span>Print</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="resume-action-btn btn-outline"
            >
              <FaShare />
              <span>Share</span>
            </motion.button>
          </div>
        </motion.div>

        {/* PDF Viewer Section */}
        {showPDF && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="pdf-viewer-section"
          >
            <div className="pdf-viewer-container">
              <div className="pdf-viewer-header">
                <div className="pdf-viewer-title">
                  <FaFilePdf className="pdf-icon" />
                  <span className="pdf-title-text">Resume Preview</span>
                </div>
                <div className="pdf-controls">
                  <div className="zoom-controls">
                    <button
                      onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                      className="zoom-btn"
                    >
                      -
                    </button>
                    <span className="zoom-display">
                      {Math.round(scale * 100)}%
                    </span>
                    <button
                      onClick={() => setScale(Math.min(2.0, scale + 0.1))}
                      className="zoom-btn"
                    >
                      +
                    </button>
                  </div>
                  <div className="page-controls">
                    <button
                      onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                      disabled={pageNumber <= 1}
                      className="page-btn"
                    >
                      Previous
                    </button>
                    <span className="page-display">
                      Page {pageNumber} of {numPages || 1}
                    </span>
                    <button
                      onClick={() => setPageNumber(Math.min(numPages || 1, pageNumber + 1))}
                      disabled={pageNumber >= (numPages || 1)}
                      className="page-btn"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              <div className="pdf-viewer">
                <Document
                  file="/resume.pdf"
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  loading={<div className="pdf-loading">Loading PDF...</div>}
                  error={<div className="pdf-error">Failed to load PDF. Please download instead.</div>}
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    loading={<div className="page-loading">Loading page...</div>}
                  />
                </Document>
              </div>
            </div>
          </motion.div>
        )}

        {/* Resume Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="resume-content"
        >
          <div className="resume-grid">
            {/* Left Column - Main Content */}
            <div className="resume-main-content">
              {/* Professional Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="resume-section-card"
              >
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="section-icon">💼</span>
                    Professional Summary
                  </h2>
                </div>
                <p className="summary-text">{resumeData.summary}</p>
              </motion.div>

              {/* Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="resume-section-card"
              >
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="section-icon">💼</span>
                    Experience
                  </h2>
                </div>
                <div className="experience-list">
                  {resumeData.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="experience-item"
                    >
                      <div className="experience-header">
                        <h3 className="job-title">{exp.title}</h3>
                        <span className="job-duration">{exp.duration}</span>
                      </div>
                      <p className="company-info">
                        {exp.company} • {exp.location}
                      </p>
                      <ul className="job-responsibilities">
                        {exp.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="resume-section-card"
              >
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="section-icon">⚡</span>
                    Featured Projects
                  </h2>
                </div>
                <div className="projects-list">
                  {resumeData.projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      className="project-item"
                    >
                      <h3 className="project-name">{project.name}</h3>
                      <div className="project-technologies">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      <p className="project-description">{project.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="resume-sidebar">
              {/* Education */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="resume-section-card"
              >
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="section-icon">🎓</span>
                    Education
                  </h2>
                </div>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <div className="education-header">
                      <h3 className="education-degree">{edu.degree}</h3>
                      <span className="education-duration">{edu.duration}</span>
                    </div>
                    <p className="education-institution">
                      {edu.institution}, {edu.location}
                    </p>
                    <div className="education-details">
                      <p className="education-gpa">
                        <strong>GPA:</strong> {edu.gpa}
                      </p>
                      <div className="education-courses">
                        <strong>Relevant Courses:</strong>
                        <div className="courses-tags">
                          {edu.relevant_courses.map((course, i) => (
                            <span key={i} className="course-tag">{course}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Technical Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="resume-section-card"
              >
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="section-icon">⚙️</span>
                    Technical Skills
                  </h2>
                </div>
                <div className="skills-container">
                  {Object.entries(resumeData.skills).map(([category, skills]) => (
                    <div key={category} className="skills-category">
                      <h3 className="skills-category-title">{category}</h3>
                      <div className="skills-tags">
                        {skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                            className="skill-tag"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="resume-section-card"
              >
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="section-icon">🏆</span>
                    Certifications
                  </h2>
                </div>
                <div className="certifications-list">
                  {resumeData.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                      className="certification-item"
                    >
                      <FaCertificate className="cert-icon" />
                      <span className="cert-name">{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="resume-section-card contact-card"
              >
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="section-icon">📧</span>
                    Contact
                  </h2>
                </div>
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-label">Email:</span>
                    <a href={`mailto:${resumeData.contact.email}`} className="contact-link">
                      {resumeData.contact.email}
                    </a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Phone:</span>
                    <a href={`tel:${resumeData.contact.phone}`} className="contact-link">
                      {resumeData.contact.phone}
                    </a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Location:</span>
                    <span className="contact-value">{resumeData.contact.location}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">LinkedIn:</span>
                    <a href={`https://${resumeData.contact.linkedin}`} className="contact-link" target="_blank" rel="noopener noreferrer">
                      {resumeData.contact.linkedin}
                    </a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">GitHub:</span>
                    <a href={`https://${resumeData.contact.github}`} className="contact-link" target="_blank" rel="noopener noreferrer">
                      {resumeData.contact.github}
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;
