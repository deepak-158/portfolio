// Performance Monitoring and Optimization Utilities
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoad: null,
      themeTransitions: [],
      animations: [],
      interactions: []
    };
    this.observers = [];
    this.init();
  }

  init() {
    this.monitorPageLoad();
    this.monitorLCP();
    this.monitorFID();
    this.monitorCLS();
    this.monitorThemeTransitions();
    this.monitorAnimations();
  }

  // Monitor page load performance
  monitorPageLoad() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            this.metrics.pageLoad = {
              domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
              loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
              firstPaint: this.getFirstPaint(),
              firstContentfulPaint: this.getFirstContentfulPaint(),
              timestamp: Date.now()
            };
            this.reportMetrics();
          }
        }, 0);
      });
    }
  }

  // Monitor Largest Contentful Paint
  monitorLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.metrics.lcp = {
          value: lastEntry.startTime,
          element: lastEntry.element?.tagName || 'unknown',
          timestamp: Date.now()
        };
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    }
  }

  // Monitor First Input Delay
  monitorFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.fid = {
            value: entry.processingStart - entry.startTime,
            timestamp: Date.now()
          };
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    }
  }

  // Monitor Cumulative Layout Shift
  monitorCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.metrics.cls = {
          value: clsValue,
          timestamp: Date.now()
        };
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    }
  }

  // Monitor theme transition performance
  monitorThemeTransitions() {
    document.addEventListener('themeChanged', (event) => {
      const startTime = performance.now();
      
      // Wait for transition to complete
      setTimeout(() => {
        const endTime = performance.now();
        this.metrics.themeTransitions.push({
          theme: event.detail.theme,
          duration: endTime - startTime,
          timestamp: Date.now()
        });
        
        // Keep only last 10 transitions
        if (this.metrics.themeTransitions.length > 10) {
          this.metrics.themeTransitions.shift();
        }
      }, 300); // Match theme transition duration
    });
  }

  // Monitor animation performance
  monitorAnimations() {
    const animationStartTimes = new Map();

    document.addEventListener('animationstart', (event) => {
      animationStartTimes.set(event.animationName, performance.now());
    });

    document.addEventListener('animationend', (event) => {
      const startTime = animationStartTimes.get(event.animationName);
      if (startTime) {
        const duration = performance.now() - startTime;
        this.metrics.animations.push({
          name: event.animationName,
          duration: duration,
          timestamp: Date.now()
        });
        
        animationStartTimes.delete(event.animationName);
        
        // Keep only last 20 animations
        if (this.metrics.animations.length > 20) {
          this.metrics.animations.shift();
        }
      }
    });
  }

  // Get First Paint timing
  getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : null;
  }

  // Get First Contentful Paint timing
  getFirstContentfulPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return firstContentfulPaint ? firstContentfulPaint.startTime : null;
  }

  // Report metrics to console (can be extended to send to analytics)
  reportMetrics() {
    if (process.env.NODE_ENV === 'development') {
      console.group('🚀 Portfolio Performance Metrics');
      
      if (this.metrics.pageLoad) {
        console.log('📊 Page Load:', this.metrics.pageLoad);
      }
      
      if (this.metrics.lcp) {
        console.log('🎯 Largest Contentful Paint:', `${this.metrics.lcp.value.toFixed(2)}ms`);
      }
      
      if (this.metrics.fid) {
        console.log('⚡ First Input Delay:', `${this.metrics.fid.value.toFixed(2)}ms`);
      }
      
      if (this.metrics.cls) {
        console.log('📐 Cumulative Layout Shift:', this.metrics.cls.value.toFixed(4));
      }
      
      if (this.metrics.themeTransitions.length > 0) {
        const avgThemeTransition = this.metrics.themeTransitions.reduce((sum, t) => sum + t.duration, 0) / this.metrics.themeTransitions.length;
        console.log('🎨 Avg Theme Transition:', `${avgThemeTransition.toFixed(2)}ms`);
      }
      
      console.groupEnd();
    }
  }

  // Get performance score
  getPerformanceScore() {
    const score = {
      lcp: this.scoreLCP(),
      fid: this.scoreFID(),
      cls: this.scoreCLS(),
      themeTransition: this.scoreThemeTransition()
    };
    
    score.overall = (score.lcp + score.fid + score.cls + score.themeTransition) / 4;
    return score;
  }

  // Score LCP (0-100)
  scoreLCP() {
    if (!this.metrics.lcp) return 0;
    const lcp = this.metrics.lcp.value;
    if (lcp <= 2500) return 100;
    if (lcp <= 4000) return 50;
    return 0;
  }

  // Score FID (0-100)
  scoreFID() {
    if (!this.metrics.fid) return 100; // No user interaction yet
    const fid = this.metrics.fid.value;
    if (fid <= 100) return 100;
    if (fid <= 300) return 50;
    return 0;
  }

  // Score CLS (0-100)
  scoreCLS() {
    if (!this.metrics.cls) return 100;
    const cls = this.metrics.cls.value;
    if (cls <= 0.1) return 100;
    if (cls <= 0.25) return 50;
    return 0;
  }

  // Score theme transition performance (0-100)
  scoreThemeTransition() {
    if (this.metrics.themeTransitions.length === 0) return 100;
    const avgDuration = this.metrics.themeTransitions.reduce((sum, t) => sum + t.duration, 0) / this.metrics.themeTransitions.length;
    if (avgDuration <= 300) return 100;
    if (avgDuration <= 500) return 75;
    if (avgDuration <= 1000) return 50;
    return 25;
  }

  // Clean up observers
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Memory usage monitoring
class MemoryMonitor {
  constructor() {
    this.measurements = [];
    this.maxMeasurements = 50;
    this.init();
  }

  init() {
    if ('memory' in performance) {
      this.startMonitoring();
    }
  }

  startMonitoring() {
    const measure = () => {
      const memory = performance.memory;
      this.measurements.push({
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        timestamp: Date.now()
      });

      // Keep only recent measurements
      if (this.measurements.length > this.maxMeasurements) {
        this.measurements.shift();
      }
    };

    // Initial measurement
    measure();

    // Measure every 30 seconds
    setInterval(measure, 30000);
  }

  getMemoryUsage() {
    if (this.measurements.length === 0) return null;
    
    const latest = this.measurements[this.measurements.length - 1];
    return {
      usedMB: (latest.used / 1024 / 1024).toFixed(2),
      totalMB: (latest.total / 1024 / 1024).toFixed(2),
      percentage: ((latest.used / latest.total) * 100).toFixed(1),
      trend: this.getMemoryTrend()
    };
  }

  getMemoryTrend() {
    if (this.measurements.length < 5) return 'stable';
    
    const recent = this.measurements.slice(-5);
    const first = recent[0].used;
    const last = recent[recent.length - 1].used;
    const change = ((last - first) / first) * 100;
    
    if (change > 10) return 'increasing';
    if (change < -10) return 'decreasing';
    return 'stable';
  }
}

// Export singleton instances
export const performanceMonitor = new PerformanceMonitor();
export const memoryMonitor = new MemoryMonitor();

// Development helper to display performance info
export const showPerformanceInfo = () => {
  if (process.env.NODE_ENV === 'development') {
    const score = performanceMonitor.getPerformanceScore();
    const memory = memoryMonitor.getMemoryUsage();
    
    console.group('🔍 Portfolio Performance Dashboard');
    console.log('📈 Performance Score:', `${score.overall.toFixed(1)}/100`);
    console.log('📊 Breakdown:', {
      'LCP': `${score.lcp}/100`,
      'FID': `${score.fid}/100`,
      'CLS': `${score.cls}/100`,
      'Theme': `${score.themeTransition}/100`
    });
    if (memory) {
      console.log('💾 Memory Usage:', `${memory.usedMB}MB (${memory.percentage}%) - ${memory.trend}`);
    }
    
    console.groupEnd();
  }
};
