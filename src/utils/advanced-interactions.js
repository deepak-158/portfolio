// Enhanced Scroll and Viewport Management System
class ScrollManager {
  constructor() {
    this.scrollElements = new Map();
    this.parallaxElements = new Map();
    this.counters = new Map();
    this.observers = new Map();
    this.rafId = null;
    this.isScrolling = false;
    
    this.init();
  }

  init() {
    this.setupScrollProgress();
    this.setupIntersectionObservers();
    this.setupSmoothScroll();
    this.setupParallax();
    this.setupCounters();
    this.bindEvents();
  }

  setupScrollProgress() {
    // Create scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.id = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
      const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    });
  }

  setupIntersectionObservers() {
    // Main observer for reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed', 'in-view');
          
          // Trigger stagger animation for containers
          if (entry.target.classList.contains('stagger-container')) {
            entry.target.classList.add('animate');
          }
          
          // Trigger text reveal
          if (entry.target.classList.contains('text-reveal')) {
            entry.target.classList.add('animate');
          }
          
          // Trigger image reveal
          if (entry.target.classList.contains('image-reveal')) {
            entry.target.classList.add('animate');
          }
          
          // Start counter animation
          if (entry.target.classList.contains('counter')) {
            this.animateCounter(entry.target);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe reveal elements
    document.querySelectorAll('.reveal-section, .scroll-trigger, .stagger-container, .text-reveal, .image-reveal, .counter').forEach(el => {
      revealObserver.observe(el);
    });

    // Store observer
    this.observers.set('reveal', revealObserver);
  }

  setupSmoothScroll() {
    // Enhanced smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = targetPosition - 100; // Account for fixed header
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without triggering scroll
          history.pushState(null, null, `#${targetId}`);
        }
      });
    });
  }

  setupParallax() {
    // Setup parallax elements
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      this.parallaxElements.set(element, { speed: parseFloat(speed) });
    });

    // Update parallax on scroll
    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', () => {
        if (!this.rafId) {
          this.rafId = requestAnimationFrame(() => this.updateParallax());
        }
      });
    }
  }

  updateParallax() {
    const scrollTop = window.pageYOffset;
    
    this.parallaxElements.forEach((config, element) => {
      const elementTop = element.getBoundingClientRect().top + scrollTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Only animate elements that are in or near the viewport
      if (elementTop < scrollTop + windowHeight && elementTop + elementHeight > scrollTop) {
        const yPos = -(scrollTop - elementTop) * config.speed;
        element.style.transform = `translateY(${yPos}px)`;
      }
    });
    
    this.rafId = null;
  }

  setupCounters() {
    // Setup counter animation
    const counterElements = document.querySelectorAll('.counter[data-count]');
    
    counterElements.forEach(element => {
      const targetCount = parseInt(element.dataset.count);
      const duration = parseInt(element.dataset.duration) || 2000;
      const prefix = element.dataset.prefix || '';
      const suffix = element.dataset.suffix || '';
      
      this.counters.set(element, {
        target: targetCount,
        duration: duration,
        prefix: prefix,
        suffix: suffix,
        hasAnimated: false
      });
    });
  }

  animateCounter(element) {
    const config = this.counters.get(element);
    if (!config || config.hasAnimated) return;
    
    config.hasAnimated = true;
    let currentCount = 0;
    const increment = config.target / (config.duration / 16); // 60fps
    
    const updateCounter = () => {
      currentCount += increment;
      
      if (currentCount >= config.target) {
        currentCount = config.target;
        element.textContent = `${config.prefix}${Math.floor(currentCount)}${config.suffix}`;
      } else {
        element.textContent = `${config.prefix}${Math.floor(currentCount)}${config.suffix}`;
        requestAnimationFrame(updateCounter);
      }
    };
    
    updateCounter();
  }

  bindEvents() {
    // Scroll direction detection
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop) {
        document.body.classList.add('scroll-down');
        document.body.classList.remove('scroll-up');
      } else {
        document.body.classList.add('scroll-up');
        document.body.classList.remove('scroll-down');
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Scroll start/end detection
    let scrollTimer = null;
    
    window.addEventListener('scroll', () => {
      if (!this.isScrolling) {
        document.body.classList.add('is-scrolling');
        this.isScrolling = true;
      }
      
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
        this.isScrolling = false;
      }, 150);
    });
  }

  // Public methods for external use
  revealElement(element) {
    if (element) {
      element.classList.add('revealed', 'in-view');
    }
  }

  hideElement(element) {
    if (element) {
      element.classList.remove('revealed', 'in-view');
    }
  }

  scrollToElement(elementId, offset = 100) {
    const element = document.getElementById(elementId);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  destroy() {
    // Cleanup observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    
    // Clear maps
    this.scrollElements.clear();
    this.parallaxElements.clear();
    this.counters.clear();
    
    // Cancel animation frame
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}

// Enhanced Cursor System
class CursorSystem {
  constructor() {
    this.cursor = null;
    this.cursorOutline = null;
    this.isSupported = this.checkSupport();
    
    if (this.isSupported) {
      this.init();
    }
  }

  checkSupport() {
    // More comprehensive check for cursor support
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isDesktop = window.innerWidth > 768;
    const hasPointerEvents = 'PointerEvent' in window;
    
    // Only enable custom cursor on desktop non-touch devices
    return isDesktop && !isTouchDevice && hasPointerEvents;
  }

  init() {
    this.createCursor();
    this.bindEvents();
    this.setupInteractiveElements();
    this.setupFallbacks();
  }

  createCursor() {
    // Create cursor dot
    this.cursor = document.createElement('div');
    this.cursor.className = 'cursor-dot';
    document.body.appendChild(this.cursor);

    // Create cursor outline
    this.cursorOutline = document.createElement('div');
    this.cursorOutline.className = 'cursor-outline';
    document.body.appendChild(this.cursorOutline);

    // Hide default cursor on appropriate elements
    document.body.classList.add('custom-cursor');
  }

  setupFallbacks() {
    // Add fallback for when custom cursor fails
    const fallbackCheck = () => {
      if (!this.cursor || !this.cursorOutline) {
        document.body.classList.remove('custom-cursor');
        return;
      }
      
      // Check if cursor elements are actually visible
      const cursorRect = this.cursor.getBoundingClientRect();
      if (cursorRect.width === 0 || cursorRect.height === 0) {
        document.body.classList.remove('custom-cursor');
      }
    };

    // Check after a delay to ensure elements are rendered
    setTimeout(fallbackCheck, 1000);
    
    // Re-check on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        document.body.classList.remove('custom-cursor');
      }
    });
  }
  bindEvents() {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
      if (!this.cursor || !this.cursorOutline) return;
      
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update cursor dot position immediately with proper centering
      this.cursor.style.left = `${mouseX - 4}px`;
      this.cursor.style.top = `${mouseY - 4}px`;
    });

    // Smooth outline following
    const updateOutline = () => {
      if (!this.cursorOutline) return;
      
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      
      this.cursorOutline.style.left = `${outlineX - 16}px`;
      this.cursorOutline.style.top = `${outlineY - 16}px`;
      
      requestAnimationFrame(updateOutline);
    };
    updateOutline();

    // Handle mouse leave/enter to show/hide custom cursor
    document.addEventListener('mouseenter', () => {
      if (this.cursor && this.cursorOutline) {
        this.cursor.style.opacity = '1';
        this.cursorOutline.style.opacity = '0.5';
      }
    });

    document.addEventListener('mouseleave', () => {
      if (this.cursor && this.cursorOutline) {
        this.cursor.style.opacity = '0';
        this.cursorOutline.style.opacity = '0';
      }
    });
  }

  setupInteractiveElements() {
    // Scale cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-pointer');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.cursorOutline.style.width = '50px';
        this.cursorOutline.style.height = '50px';
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      
      element.addEventListener('mouseleave', () => {
        this.cursorOutline.style.width = '30px';
        this.cursorOutline.style.height = '30px';
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }
}

// Page Transition Manager
class PageTransitionManager {
  constructor() {
    this.isTransitioning = false;
    this.init();
  }

  init() {
    this.setupRouteProgress();
    this.bindEvents();
  }

  setupRouteProgress() {
    // Create route progress indicator
    const routeProgress = document.createElement('div');
    routeProgress.className = 'route-progress';
    routeProgress.id = 'route-progress';
    document.body.appendChild(routeProgress);
  }

  startTransition() {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    const progressBar = document.getElementById('route-progress');
    
    if (progressBar) {
      progressBar.classList.add('loading');
      progressBar.style.width = '70%';
    }
  }

  completeTransition() {
    this.isTransitioning = false;
    const progressBar = document.getElementById('route-progress');
    
    if (progressBar) {
      progressBar.style.width = '100%';
      
      setTimeout(() => {
        progressBar.classList.remove('loading');
        progressBar.style.width = '0%';
      }, 500);
    }
  }

  bindEvents() {
    // Listen for route changes (for SPA)
    window.addEventListener('popstate', () => {
      this.startTransition();
      setTimeout(() => this.completeTransition(), 800);
    });
  }
}

// Enhanced Form Interactions
class FormEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.setupFloatingLabels();
    this.setupValidation();
    this.setupSubmissionStates();
  }

  setupFloatingLabels() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
      const input = group.querySelector('input, textarea');
      const label = group.querySelector('label');
      
      if (input && label) {
        input.addEventListener('focus', () => {
          group.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
          if (!input.value) {
            group.classList.remove('focused');
          }
        });
        
        // Check initial state
        if (input.value) {
          group.classList.add('focused');
        }
      }
    });
  }

  setupValidation() {
    const forms = document.querySelectorAll('form[data-enhanced]');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearErrors(input));
      });
      
      form.addEventListener('submit', (e) => this.handleSubmit(e, form));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    let isValid = true;
    let message = '';

    // Clear previous validation
    this.clearFieldErrors(field);

    if (required && !value) {
      isValid = false;
      message = 'This field is required';
    } else if (value) {
      switch (type) {
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
          }
          break;
        case 'tel':
          if (!/^[\+]?[\d\s\-\(\)]+$/.test(value)) {
            isValid = false;
            message = 'Please enter a valid phone number';
          }
          break;
      }
    }

    if (!isValid) {
      this.showFieldError(field, message);
    }

    return isValid;
  }

  showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    if (formGroup) {
      formGroup.classList.add('error');
      
      let errorElement = formGroup.querySelector('.error-message');
      if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
      }
      errorElement.textContent = message;
    }
  }

  clearFieldErrors(field) {
    const formGroup = field.closest('.form-group');
    if (formGroup) {
      formGroup.classList.remove('error');
      const errorElement = formGroup.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
      }
    }
  }

  clearErrors(field) {
    this.clearFieldErrors(field);
  }

  handleSubmit(e, form) {
    e.preventDefault();
    
    const inputs = form.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });
    
    if (isFormValid) {
      this.submitForm(form);
    }
  }

  async submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    try {
      // Simulate form submission (replace with actual submission logic)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success state
      submitButton.textContent = 'Sent!';
      submitButton.classList.remove('loading');
      submitButton.classList.add('success');
      
      // Reset form
      setTimeout(() => {
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('success');
      }, 2000);
      
    } catch (error) {
      // Show error state
      submitButton.textContent = 'Error - Try Again';
      submitButton.classList.remove('loading');
      submitButton.classList.add('error');
      
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('error');
      }, 3000);
    }
  }

  setupSubmissionStates() {
    const style = document.createElement('style');
    style.textContent = `
      .form-group {
        position: relative;
        margin-bottom: 1.5rem;
      }
      
      .form-group.focused label {
        transform: translateY(-1.5rem) scale(0.85);
        color: var(--primary-color);
      }
      
      .form-group.error input,
      .form-group.error textarea {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
      
      .error-message {
        position: absolute;
        bottom: -1.2rem;
        left: 0;
        font-size: 0.75rem;
        color: #ef4444;
        opacity: 0;
        animation: fadeInUp 0.3s ease forwards;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(5px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      button.loading {
        pointer-events: none;
        opacity: 0.7;
      }
      
      button.success {
        background: #10b981;
      }
      
      button.error {
        background: #ef4444;
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize all systems when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize systems
  window.scrollManager = new ScrollManager();
  window.cursorSystem = new CursorSystem();
  window.pageTransitionManager = new PageTransitionManager();
  window.formEnhancer = new FormEnhancer();
  
  // Add loading completion event
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
      document.querySelectorAll('.reveal-section').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('revealed');
        }
      });
    }, 500);
  });
});

// Export for external use
export { ScrollManager, CursorSystem, PageTransitionManager, FormEnhancer };
