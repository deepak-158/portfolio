import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Contrast, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme, themeManager } = useTheme();

  const themes = [
    {
      id: 'light',
      name: 'Light',
      icon: Sun,
      description: 'Clean and bright interface'
    },
    {
      id: 'dark',
      name: 'Dark',
      icon: Moon,
      description: 'Easy on the eyes'
    },
    {
      id: 'auto',
      name: 'Auto',
      icon: Monitor,
      description: 'Follows system preference'
    },
    {
      id: 'high-contrast',
      name: 'High Contrast',
      icon: Contrast,
      description: 'Maximum accessibility'
    }
  ];

  const handleThemeSelect = (themeId) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="theme-selector">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="theme-selector-trigger"
        aria-label="Theme settings"
        aria-expanded={isOpen}
      >
        <Settings size={16} />
        <span className="theme-selector-label">Theme</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="theme-selector-backdrop"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="theme-selector-dropdown"
            >
              <div className="theme-selector-header">
                <h3>Choose Theme</h3>
                <p>Select your preferred theme</p>
              </div>
              
              <div className="theme-selector-options">
                {themes.map((theme) => {
                  const IconComponent = theme.icon;
                  const isActive = currentTheme === theme.id;
                  
                  return (
                    <motion.button
                      key={theme.id}
                      variants={itemVariants}
                      onClick={() => handleThemeSelect(theme.id)}
                      className={`theme-option ${isActive ? 'theme-option-active' : ''}`}
                      aria-label={`Switch to ${theme.name} theme`}
                      title={theme.description}
                    >
                      <div className="theme-option-icon">
                        <IconComponent size={18} />
                      </div>
                      <div className="theme-option-content">
                        <span className="theme-option-name">{theme.name}</span>
                        <span className="theme-option-description">{theme.description}</span>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeTheme"
                          className="theme-option-indicator"
                          initial={false}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
              
              <div className="theme-selector-footer">
                <p className="theme-selector-tip">
                  <span>💡</span> Use <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd> to quickly toggle themes
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
