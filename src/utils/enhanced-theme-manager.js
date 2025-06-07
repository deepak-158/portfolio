// Enhanced Theme Management System
class EnhancedThemeManager {
  constructor() {
    this.currentTheme = 'auto';
    this.availableThemes = ['light', 'dark', 'auto', 'high-contrast'];
    this.systemPreference = null;
    this.listeners = new Set();
    this.transitions = {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    };
    
    this.init();
  }

  init() {
    this.detectSystemPreference();
    this.loadSavedTheme();
    this.applyTheme(this.currentTheme);
    this.setupEventListeners();
    this.createThemeStatus();
    this.enhanceThemeToggles();
  }

  detectSystemPreference() {
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
      const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      this.systemPreference = {
        dark: darkModeQuery.matches,
        highContrast: highContrastQuery.matches,
        reducedMotion: reducedMotionQuery.matches
      };
      
      // Listen for system preference changes
      darkModeQuery.addEventListener('change', (e) => {
        this.systemPreference.dark = e.matches;
        if (this.currentTheme === 'auto') {
          this.applyTheme('auto');
        }
        this.notifyListeners('system-change', { dark: e.matches });
      });
      
      highContrastQuery.addEventListener('change', (e) => {
        this.systemPreference.highContrast = e.matches;
        if (e.matches && this.currentTheme !== 'high-contrast') {
          this.setTheme('high-contrast');
        }
        this.notifyListeners('contrast-change', { highContrast: e.matches });
      });
      
      reducedMotionQuery.addEventListener('change', (e) => {
        this.systemPreference.reducedMotion = e.matches;
        this.updateAnimationPreferences();
        this.notifyListeners('motion-change', { reducedMotion: e.matches });
      });
    }
  }

  loadSavedTheme() {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved && this.availableThemes.includes(saved)) {
        this.currentTheme = saved;
      }
    } catch (error) {
      console.warn('Could not load saved theme:', error);
    }
  }

  saveTheme(theme) {
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (error) {
      console.warn('Could not save theme:', error);
    }
  }

  applyTheme(theme, animated = true) {
    if (animated) {
      this.addTransitionClass();
    }
    
    // Remove existing theme classes
    document.documentElement.removeAttribute('data-theme');
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-auto', 'theme-high-contrast');
    
    // Apply new theme
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.add(`theme-${theme}`);
    
    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);
    
    // Update CSS custom properties for enhanced theming
    this.updateCustomProperties(theme);
    
    if (animated) {
      setTimeout(() => this.removeTransitionClass(), this.transitions.duration);
    }
    
    this.currentTheme = theme;
    this.saveTheme(theme);
    this.updateThemeToggles();
    this.showThemeStatus(theme);
    this.notifyListeners('theme-change', { theme });
  }

  updateMetaThemeColor(theme) {
    let themeColor = '#ffffff'; // default light
    
    switch (theme) {
      case 'dark':
        themeColor = '#171717';
        break;
      case 'auto':
        themeColor = this.systemPreference?.dark ? '#171717' : '#ffffff';
        break;
      case 'high-contrast':
        themeColor = '#000000';
        break;
    }
    
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = themeColor;
  }

  updateCustomProperties(theme) {
    const root = document.documentElement;
    
    // Dynamic color calculations based on theme
    const colors = this.getThemeColors(theme);
    
    Object.entries(colors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }

  getThemeColors(theme) {
    const baseColors = {
      light: {
        '--dynamic-bg': '#ffffff',
        '--dynamic-text': '#171717',
        '--dynamic-border': '#e5e5e5',
        '--dynamic-shadow': '0, 0, 0',
        '--dynamic-primary': '#3b82f6'
      },
      dark: {
        '--dynamic-bg': '#171717',
        '--dynamic-text': '#fafafa',
        '--dynamic-border': '#525252',
        '--dynamic-shadow': '0, 0, 0',
        '--dynamic-primary': '#60a5fa'
      },
      'high-contrast': {
        '--dynamic-bg': '#000000',
        '--dynamic-text': '#ffffff',
        '--dynamic-border': '#ffffff',
        '--dynamic-shadow': '255, 255, 255',
        '--dynamic-primary': '#ffff00'
      }
    };
    
    if (theme === 'auto') {
      return this.systemPreference?.dark ? baseColors.dark : baseColors.light;
    }
    
    return baseColors[theme] || baseColors.light;
  }

  addTransitionClass() {
    document.body.classList.add('theme-transitioning');
  }

  removeTransitionClass() {
    document.body.classList.remove('theme-transitioning');
  }

  updateAnimationPreferences() {
    if (this.systemPreference?.reducedMotion) {
      document.body.classList.add('reduced-motion');
      // Update transition duration
      document.documentElement.style.setProperty('--theme-transition-duration', '0.01ms');
    } else {
      document.body.classList.remove('reduced-motion');
      document.documentElement.style.setProperty('--theme-transition-duration', '0.3s');
    }
  }

  setTheme(theme) {
    if (this.availableThemes.includes(theme)) {
      this.applyTheme(theme);
    }
  }

  getTheme() {
    return this.currentTheme;
  }

  getResolvedTheme() {
    if (this.currentTheme === 'auto') {
      return this.systemPreference?.dark ? 'dark' : 'light';
    }
    return this.currentTheme;
  }

  toggleTheme() {
    const themes = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  }

  cycleTheme() {
    const currentIndex = this.availableThemes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.availableThemes.length;
    this.setTheme(this.availableThemes[nextIndex]);
  }

  setupEventListeners() {
    // Listen for keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Shift + T to toggle theme
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
      
      // Ctrl/Cmd + Shift + H for high contrast
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'H') {
        e.preventDefault();
        this.setTheme(this.currentTheme === 'high-contrast' ? 'auto' : 'high-contrast');
      }
    });
    
    // Listen for storage changes (sync across tabs)
    window.addEventListener('storage', (e) => {
      if (e.key === 'portfolio-theme' && e.newValue !== this.currentTheme) {
        this.applyTheme(e.newValue, false);
      }
    });
  }

  enhanceThemeToggles() {
    // Find and enhance existing theme toggles
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const targetTheme = toggle.dataset.themeToggle;
        if (targetTheme) {
          this.setTheme(targetTheme);
        } else {
          this.toggleTheme();
        }
      });
      
      // Add keyboard accessibility
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle.click();
        }
      });
      
      // Ensure proper ARIA attributes
      if (!toggle.hasAttribute('role')) {
        toggle.setAttribute('role', 'button');
      }
      if (!toggle.hasAttribute('aria-label')) {
        toggle.setAttribute('aria-label', 'Toggle theme');
      }
    });
    
    this.updateThemeToggles();
  }

  updateThemeToggles() {
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    
    toggles.forEach(toggle => {
      const targetTheme = toggle.dataset.themeToggle;
      
      if (!targetTheme) {
        // Generic toggle - update based on current theme
        toggle.classList.toggle('dark', this.getResolvedTheme() === 'dark');
        toggle.setAttribute('aria-label', `Switch to ${this.getResolvedTheme() === 'dark' ? 'light' : 'dark'} theme`);
      } else {
        // Specific theme toggle
        toggle.classList.toggle('active', this.currentTheme === targetTheme);
        toggle.setAttribute('aria-pressed', this.currentTheme === targetTheme);
      }
    });
    
    // Update theme previews
    document.querySelectorAll('.theme-preview').forEach(preview => {
      const theme = preview.dataset.theme;
      preview.classList.toggle('active', this.currentTheme === theme);
    });
  }

  createThemeStatus() {
    const existingStatus = document.getElementById('theme-status');
    if (existingStatus) return;
    
    const status = document.createElement('div');
    status.id = 'theme-status';
    status.className = 'theme-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    document.body.appendChild(status);
  }

  showThemeStatus(theme) {
    const status = document.getElementById('theme-status');
    if (!status) return;
    
    const themeNames = {
      light: 'Light Theme',
      dark: 'Dark Theme',
      auto: 'Auto Theme',
      'high-contrast': 'High Contrast Theme'
    };
    
    status.textContent = `Switched to ${themeNames[theme] || theme}`;
    status.classList.add('show');
    
    setTimeout(() => {
      status.classList.remove('show');
    }, 2000);
  }

  // Event system for theme changes
  addEventListener(type, callback) {
    this.listeners.add({ type, callback });
  }

  removeEventListener(type, callback) {
    this.listeners.forEach(listener => {
      if (listener.type === type && listener.callback === callback) {
        this.listeners.delete(listener);
      }
    });
  }

  notifyListeners(type, data) {
    this.listeners.forEach(listener => {
      if (listener.type === type) {
        listener.callback(data);
      }
    });
  }

  // Utility methods
  isSystemDark() {
    return this.systemPreference?.dark || false;
  }

  isHighContrast() {
    return this.systemPreference?.highContrast || false;
  }

  isReducedMotion() {
    return this.systemPreference?.reducedMotion || false;
  }

  getSystemPreferences() {
    return { ...this.systemPreference };
  }

  // Advanced color manipulation
  generateColorVariations(baseColor, theme = 'light') {
    // This would be used for dynamic color scheme generation
    // Implementation would depend on specific color manipulation library
    const variations = {};
    
    // Generate 50-900 scale variations
    for (let i = 50; i <= 900; i += 50) {
      variations[`--color-${i}`] = this.adjustColorBrightness(baseColor, theme === 'dark' ? 900 - i : i);
    }
    
    return variations;
  }

  adjustColorBrightness(color, level) {
    // Simple color brightness adjustment
    // In a real implementation, you'd use a proper color manipulation library
    const factor = level / 500; // 500 is the middle value
    return color; // Placeholder return
  }

  // Export theme configuration
  exportThemeConfig() {
    return {
      currentTheme: this.currentTheme,
      systemPreferences: this.systemPreference,
      availableThemes: this.availableThemes,
      timestamp: new Date().toISOString()
    };
  }

  // Import theme configuration
  importThemeConfig(config) {
    if (config.currentTheme && this.availableThemes.includes(config.currentTheme)) {
      this.setTheme(config.currentTheme);
    }
  }

  // Cleanup method
  destroy() {
    this.listeners.clear();
    document.body.classList.remove('theme-transitioning', 'reduced-motion');
    const status = document.getElementById('theme-status');
    if (status) {
      status.remove();
    }
  }
}

// Create and export global theme manager
const themeManager = new EnhancedThemeManager();

// Add to window for global access
window.themeManager = themeManager;

// Export for module systems
export default themeManager;
export { EnhancedThemeManager };
