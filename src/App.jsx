import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { initInteractions, addInteractiveClasses } from './utils/interactions';
import { ScrollManager, CursorSystem, PageTransitionManager, FormEnhancer } from './utils/advanced-interactions';
import { performanceMonitor, showPerformanceInfo } from './utils/performance-monitor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import BackToTop from './components/BackToTop';
// import SystemStatus from './components/SystemStatus';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Achievements from './pages/Achievements';
import HireMe from './pages/HireMe';
import Contact from './pages/Contact';
// Import modular CSS files
import './styles/critical.css';
import './styles/base.css';
import './styles/navbar.css';
import './styles/footer.css';
import './styles/preloader.css';
import './styles/components.css';
import './styles/advanced-animations.css';
import './styles/enhanced-themes.css';
// import './styles/theme-selector.css';
// import './styles/system-status.css';
import './styles/home.css';
import './styles/about.css';
import './styles/projects.css';
import './styles/skills.css';
import './styles/achievements.css';
import './styles/hire-me.css';
import './styles/contact.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Temporarily disabled advanced systems for debugging
  // useEffect(() => {
  //   // Initialize Enhanced Theme Manager
  //   const themeManager = EnhancedThemeManager.getInstance ? EnhancedThemeManager.getInstance() : new EnhancedThemeManager();
  //   
  //   // Initialize advanced interaction systems
  //   const scrollManager = new ScrollManager();
  //   const cursorSystem = new CursorSystem();
  //   const pageTransitionManager = new PageTransitionManager();
  //   const formEnhancer = new FormEnhancer();

  //   // Show performance info in development
  //   if (process.env.NODE_ENV === 'development') {
  //     setTimeout(() => showPerformanceInfo(), 5000);
  //   }
  //   
  //   // Cleanup function
  //   return () => {
  //     scrollManager.destroy?.();
  //     cursorSystem.destroy?.();
  //     pageTransitionManager.destroy?.();
  //     formEnhancer.destroy?.();
  //     themeManager.destroy?.();
  //     performanceMonitor.destroy();
  //   };
  // }, []);
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Increased to 3 seconds for better loading experience

    return () => clearTimeout(timer);
  }, []);  // Initialize performance monitoring and advanced interaction systems
  useEffect(() => {
    // Initialize advanced interaction systems
    const scrollManager = new ScrollManager();
    const cursorSystem = new CursorSystem();
    const pageTransitionManager = new PageTransitionManager();
    const formEnhancer = new FormEnhancer();
    
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => showPerformanceInfo(), 5000);
    }
    
    // Cleanup function
    return () => {
      scrollManager.destroy?.();
      cursorSystem.destroy?.();
      pageTransitionManager.destroy?.();
      formEnhancer.destroy?.();
      performanceMonitor.destroy();
    };
  }, []);

  // Initialize interactions after loading
  useEffect(() => {
    if (!isLoading) {
      // Add a small delay to ensure DOM is ready
      const interactionTimer = setTimeout(() => {
        initInteractions();
        addInteractiveClasses();
      }, 100);

      return () => clearTimeout(interactionTimer);
    }
  }, [isLoading]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.96]
  };

  if (isLoading) {
    return <Preloader />;
  }
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    key="home"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Home />
                  </motion.div>
                } 
              />
              <Route 
                path="/about" 
                element={
                  <motion.div
                    key="about"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <About />
                  </motion.div>
                } 
              />
              <Route 
                path="/projects" 
                element={
                  <motion.div
                    key="projects"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Projects />
                  </motion.div>
                } 
              />
              <Route 
                path="/skills" 
                element={
                  <motion.div
                    key="skills"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Skills />
                  </motion.div>
                } 
              />              <Route 
                path="/achievements" 
                element={
                  <motion.div
                    key="achievements"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Achievements />
                  </motion.div>
                }
              />
              <Route 
                path="/hire-me" 
                element={
                  <motion.div
                    key="hire-me"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <HireMe />
                  </motion.div>
                }
              />
              <Route 
                path="/contact"
                element={
                  <motion.div
                    key="contact"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Contact />
                  </motion.div>
                } 
              />
            </Routes>          </AnimatePresence>
          <Footer />
          <BackToTop />
          {/* <SystemStatus /> */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
