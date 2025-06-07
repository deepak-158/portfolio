import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ExternalLink, Github, Linkedin, Download } from 'lucide-react';

// Custom LeetCode Icon Component
const LeetCodeIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/>
  </svg>
);

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    'Full Stack Developer',
    'Machine Learning Enthusiast',
    'B.Tech Student',
    'Problem Solver',
    'Tech Innovator'
  ];

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < currentRole.length) {
          setDisplayText(currentRole.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(currentRole.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentRoleIndex, roles]);

  const handleDownloadResume = () => {
    // Show feedback
    const button = document.querySelector('.download-resume-btn');
    const buttonText = document.querySelector('.download-btn-text');
    const originalText = buttonText?.textContent;
    
    if (button && buttonText) {
      button.classList.add('downloading');
      buttonText.textContent = 'Downloading...';
    }

    // Create download link
    const link = document.createElement('a');
    link.href = '/Deepak_Shukla_Resume.pdf';
    link.download = 'Deepak_Shukla_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Reset button text and remove animation
    setTimeout(() => {
      if (button && buttonText && originalText) {
        button.classList.remove('downloading');
        buttonText.textContent = originalText;
      }
    }, 1200);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about-preview');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-section"
      >
        <div className="hero-content">
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1
              className="hero-title"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Hi, I'm{' '}
              <span className="text-gradient">
                Deepak Shukla
              </span>
            </motion.h1>
            
            <div className="h-16 sm:h-20 flex items-center justify-center">
              <motion.p
                className="role-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                A passionate{' '}
                <span className="text-blue typing-cursor">
                  {displayText}
                </span>
              </motion.p>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="hero-subtitle"
          >
            Welcome to my digital portfolio! I'm a dedicated B.Tech student with a passion for 
            creating innovative solutions through code. I specialize in full-stack development 
            and have a keen interest in machine learning technologies.
          </motion.p>          <motion.div
            variants={itemVariants}
            className="hero-buttons"
          >
            <Link
              to="/projects"
              className="btn btn-primary btn-lg"
            >
              <span>View My Work</span>
              <ExternalLink size={18} className="btn-icon-right" />
            </Link>
            
            <motion.button
              onClick={handleDownloadResume}
              className="btn btn-outline btn-lg download-resume-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="download-btn-text">Download Resume</span>
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Download size={18} />
              </motion.div>
            </motion.button>
          </motion.div><motion.div
            variants={itemVariants}
            className="social-links"
          >            <motion.a
              href="https://github.com/deepak-158"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="social-link"
              data-tooltip="GitHub"
            >
              <Github size={24} />
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/deepak-shukla-27a60628a/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="social-link social-link-linkedin"
              data-tooltip="LinkedIn"
            >
              <Linkedin size={24} />
            </motion.a>

            <motion.a
              href="https://leetcode.com/deepakshukla"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="social-link social-link-leetcode"
              data-tooltip="LeetCode"
            >
              <LeetCodeIcon size={24} />
            </motion.a>
          </motion.div>
        </div>

        {/* Background decorative elements */}
        <div className="hero-bg-elements">
          <motion.div
            className="hero-bg-blob hero-bg-blob-1 floating"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="hero-bg-blob hero-bg-blob-2 floating-delayed"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="hero-bg-blob hero-bg-blob-3 floating"
            animate={{
              scale: [0.8, 1.1, 0.8],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}          onClick={scrollToNext}
        >
          <div className="scroll-indicator-content">
            <span className="scroll-indicator-text">Scroll Down</span>
            <ChevronDown size={24} />
          </div>
        </motion.div>

        {/* Background Elements */}
        <div className="hero-bg-elements">
          <motion.div
            className="hero-bg-blob hero-bg-blob-1"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"            }}
          />
          <motion.div
            className="hero-bg-blob hero-bg-blob-2"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </motion.section>

      {/* Quick About Preview */}
      <section id="about-preview" className="section-padding">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              About Me
            </h2>
            <p className="section-subtitle">
              I'm currently pursuing my B.Tech degree while actively building my skills in 
              modern web technologies and machine learning. My journey in tech is driven by 
              curiosity and a desire to create meaningful solutions that make a difference.
            </p>
            <Link
              to="/about"
              className="btn btn-outline"
            >
              Learn More About Me
              <motion.span
                className="btn-arrow"
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
