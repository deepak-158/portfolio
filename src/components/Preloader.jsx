import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: 'Loading assets...' },
      { progress: 40, text: 'Preparing components...' },
      { progress: 60, text: 'Setting up theme...' },
      { progress: 80, text: 'Optimizing performance...' },
      { progress: 100, text: 'Ready!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setProgress(loadingSteps[currentStep].progress);
        setLoadingText(loadingSteps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: { duration: 0.6 }
      }}
    >
      {/* Floating background elements */}
      <div className="preloader-bg-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>

      <div className="preloader-content">
        <motion.div 
          className="loader"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2 
          }}
        ></motion.div>
        
        <motion.h2
          className="preloader-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Portfolio
        </motion.h2>
        
        <motion.p
          className="preloader-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {loadingText}
        </motion.p>

        <motion.div
          className="preloader-progress"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <motion.div
            className="preloader-progress-bar"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          ></motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
