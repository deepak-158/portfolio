// Enhanced Interactions Utility Functions

/**
 * Initialize enhanced interactions and micro-animations
 */
export const initInteractions = () => {
  initScrollReveal();
  initParallax();
  initMagneticHover();
  initCustomCursor();
  initSmoothScrollLinks();
};

/**
 * Scroll reveal animation system
 */
const initScrollReveal = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all scroll reveal elements
  document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => {
    observer.observe(el);
  });

  // Add stagger delays to grouped elements
  document.querySelectorAll('[data-stagger]').forEach(container => {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
      child.style.transitionDelay = `${index * 0.1}s`;
    });
  });
};

/**
 * Parallax scrolling effect
 */
const initParallax = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let ticking = false;

  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const rateMedium = scrolled * -0.3;
    const rateFast = scrolled * -0.7;

    document.documentElement.style.setProperty('--parallax-offset-slow', rate + 'px');
    document.documentElement.style.setProperty('--parallax-offset-medium', rateMedium + 'px');
    document.documentElement.style.setProperty('--parallax-offset-fast', rateFast + 'px');

    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestTick, { passive: true });
};

/**
 * Magnetic hover effect for buttons and interactive elements
 */
const initMagneticHover = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  document.querySelectorAll('.magnetic').forEach(element => {
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.15;
      const deltaY = (e.clientY - centerY) * 0.15;
      
      element.style.setProperty('--mouse-x', deltaX + 'px');
      element.style.setProperty('--mouse-y', deltaY + 'px');
    };

    const handleMouseLeave = () => {
      element.style.setProperty('--mouse-x', '0px');
      element.style.setProperty('--mouse-y', '0px');
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
  });
};

/**
 * Custom cursor system
 */
const initCustomCursor = () => {
  // Skip on touch devices
  if ('ontouchstart' in window) return;
  
  // Skip if reduced motion is preferred
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Create cursor elements
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  
  const cursorOutline = document.createElement('div');
  cursorOutline.className = 'cursor-outline';
  
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);
  
  // Add custom cursor class to body
  document.body.classList.add('custom-cursor');

  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  const updateCursor = () => {
    // Update dot position (instant)
    cursorDot.style.left = mouseX - 4 + 'px';
    cursorDot.style.top = mouseY - 4 + 'px';
    
    // Update outline position (with lag)
    outlineX += (mouseX - outlineX) * 0.1;
    outlineY += (mouseY - outlineY) * 0.1;
    
    cursorOutline.style.left = outlineX - 16 + 'px';
    cursorOutline.style.top = outlineY - 16 + 'px';
    
    requestAnimationFrame(updateCursor);
  };

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Add hover states
  document.querySelectorAll('a, button, .clickable').forEach(element => {
    element.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    
    element.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  updateCursor();
};

/**
 * Smooth scroll for anchor links
 */
const initSmoothScrollLinks = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80; // Adjust for fixed header
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};

/**
 * Enhanced theme toggle with animation
 */
export const enhanceThemeToggle = (toggleButton) => {
  if (!toggleButton) return;

  toggleButton.classList.add('theme-toggle');
  
  // Add loading state during theme transition
  const addLoadingState = () => {
    document.body.classList.add('theme-transitioning');
    
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 300);
  };

  toggleButton.addEventListener('click', addLoadingState);
};

/**
 * Add page loading animation
 */
export const showPageLoading = () => {
  const loadingBar = document.createElement('div');
  loadingBar.className = 'page-loading active';
  loadingBar.innerHTML = '<div class="page-loading-bar"></div>';
  
  document.body.appendChild(loadingBar);
  
  return () => {
    setTimeout(() => {
      loadingBar.classList.remove('active');
      setTimeout(() => {
        document.body.removeChild(loadingBar);
      }, 300);
    }, 1000);
  };
};

/**
 * Enhanced form interactions
 */
export const enhanceFormInputs = () => {
  document.querySelectorAll('input, textarea').forEach(input => {
    const label = input.previousElementSibling || input.parentElement.querySelector('label');
    
    if (label) {
      // Add focus and blur handlers for floating labels
      input.addEventListener('focus', () => {
        label.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          label.classList.remove('focused');
        }
      });
      
      // Check if input has value on load
      if (input.value) {
        label.classList.add('focused');
      }
    }
    
    // Add ripple effect to inputs
    input.classList.add('ripple');
  });
};

/**
 * Typewriter effect utility
 */
export const typewriterEffect = (element, text, speed = 50) => {
  if (!element) return;
  
  element.innerHTML = '';
  let i = 0;
  
  const typeWriter = () => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  };
  
  typeWriter();
};

/**
 * Number counter animation
 */
export const animateNumber = (element, endValue, duration = 2000) => {
  if (!element) return;
  
  const startValue = 0;
  const increment = endValue / (duration / 16); // 60fps
  let currentValue = startValue;
  
  const updateNumber = () => {
    currentValue += increment;
    
    if (currentValue >= endValue) {
      element.textContent = endValue;
    } else {
      element.textContent = Math.floor(currentValue);
      requestAnimationFrame(updateNumber);
    }
  };
  
  updateNumber();
};

/**
 * Utility to add interactive classes to elements
 */
export const addInteractiveClasses = () => {
  // Add hover lift to cards
  document.querySelectorAll('.card, .project-card, .skill-card').forEach(card => {
    card.classList.add('hover-lift');
  });
  
  // Add magnetic effect to buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.classList.add('magnetic', 'btn-interactive');
  });
  
  // Add gradient glow to special elements
  document.querySelectorAll('.featured, .highlight').forEach(el => {
    el.classList.add('hover-glow');
  });
};

/**
 * Initialize all interactions on DOM ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInteractions);
} else {
  initInteractions();
}

// Export individual functions for modular use
export {
  initScrollReveal,
  initParallax,
  initMagneticHover,
  initCustomCursor,
  initSmoothScrollLinks
};
