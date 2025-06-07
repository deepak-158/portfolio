import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { RiMenu4Line, RiCloseLine } from 'react-icons/ri';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const { isDark, toggleTheme, themeTransition } = useTheme();
  const location = useLocation();const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Hire Me', path: '/hire-me' },
    { name: 'Contact', path: '/contact' },
  ];  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      
      // If switching to desktop view, close the mobile menu
      if (!mobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    // Initialize isMobileView
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Close mobile menu when clicking outside
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.nav-mobile-menu') && !e.target.closest('.nav-mobile-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);
  
  // Effect to close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }
    }
  };
  
  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      scaleY: 0,
      transformOrigin: "top",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      scaleY: 1,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };
  return (    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`navbar ${
        isScrolled 
          ? 'navbar-scrolled' 
          : 'navbar-transparent'
      }`}
    >
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold text-gradient"
          >
            DS
          </motion.div>
        </Link>        {/* Desktop Navigation */}
        <div className="nav-desktop">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path
                  ? 'nav-link-active'
                  : 'nav-link-default'
              }`}
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="underline"
                  className="nav-underline"
                />
              )}
            </Link>
          ))}
        </div>{/* Theme Toggle & Mobile Menu Button */}        <div className="navbar-controls">
          {/* Quick Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`btn btn-icon ${themeTransition ? 'theme-transitioning' : ''}`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </motion.button>          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="btn btn-icon nav-mobile-toggle"
            aria-label="Toggle mobile menu"
            style={{ color: isDark ? 'var(--text-primary-dark)' : 'var(--text-primary)' }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isMobileMenuOpen ? 
                <RiCloseLine size={24} /> : 
                <RiMenu4Line size={24} />
              }
            </motion.div>
          </motion.button>
        </div>
      </div>      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="nav-mobile-menu"
          >
            <div className="nav-mobile-content">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`nav-mobile-link ${
                    location.pathname === item.path
                      ? 'nav-mobile-link-active'
                      : 'nav-mobile-link-default'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
