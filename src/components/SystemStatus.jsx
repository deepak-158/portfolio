import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, Battery, Cpu, HardDrive, Zap } from 'lucide-react';
import { performanceMonitor, memoryMonitor } from '../utils/performance-monitor';

const SystemStatus = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState({
    online: navigator.onLine,
    performance: null,
    memory: null,
    battery: null
  });

  useEffect(() => {
    // Update status periodically
    const updateStatus = () => {
      setStatus(prev => ({
        ...prev,
        online: navigator.onLine,
        performance: performanceMonitor.getPerformanceScore(),
        memory: memoryMonitor.getMemoryUsage()
      }));
    };

    // Initial update
    updateStatus();

    // Update every 30 seconds
    const interval = setInterval(updateStatus, 30000);

    // Listen for online/offline events
    const handleOnline = () => setStatus(prev => ({ ...prev, online: true }));
    const handleOffline = () => setStatus(prev => ({ ...prev, online: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Battery API (if supported)
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        const updateBattery = () => {
          setStatus(prev => ({
            ...prev,
            battery: {
              level: Math.round(battery.level * 100),
              charging: battery.charging
            }
          }));
        };

        updateBattery();
        battery.addEventListener('chargingchange', updateBattery);
        battery.addEventListener('levelchange', updateBattery);
      });
    }

    // Show status on specific key combination (Ctrl+Shift+S)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getPerformanceColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getBatteryColor = (level, charging) => {
    if (charging) return 'text-green-500';
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const statusVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={statusVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="system-status"
          onClick={() => setIsVisible(false)}
        >
          <div className="system-status-header">
            <h3>System Status</h3>
            <button 
              className="system-status-close"
              onClick={() => setIsVisible(false)}
              aria-label="Close status"
            >
              ×
            </button>
          </div>

          <div className="system-status-grid">
            {/* Network Status */}
            <div className="status-item">
              <div className="status-icon">
                {status.online ? (
                  <Wifi className="text-green-500" size={16} />
                ) : (
                  <WifiOff className="text-red-500" size={16} />
                )}
              </div>
              <div className="status-content">
                <span className="status-label">Network</span>
                <span className={`status-value ${status.online ? 'text-green-500' : 'text-red-500'}`}>
                  {status.online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            {/* Performance Score */}
            {status.performance && (
              <div className="status-item">
                <div className="status-icon">
                  <Zap className={getPerformanceColor(status.performance.overall)} size={16} />
                </div>
                <div className="status-content">
                  <span className="status-label">Performance</span>
                  <span className={`status-value ${getPerformanceColor(status.performance.overall)}`}>
                    {status.performance.overall.toFixed(0)}/100
                  </span>
                </div>
              </div>
            )}

            {/* Memory Usage */}
            {status.memory && (
              <div className="status-item">
                <div className="status-icon">
                  <Cpu className="text-blue-500" size={16} />
                </div>
                <div className="status-content">
                  <span className="status-label">Memory</span>
                  <span className="status-value">
                    {status.memory.usedMB}MB ({status.memory.percentage}%)
                  </span>
                </div>
              </div>
            )}

            {/* Battery Status */}
            {status.battery && (
              <div className="status-item">
                <div className="status-icon">
                  <Battery className={getBatteryColor(status.battery.level, status.battery.charging)} size={16} />
                </div>
                <div className="status-content">
                  <span className="status-label">Battery</span>
                  <span className={`status-value ${getBatteryColor(status.battery.level, status.battery.charging)}`}>
                    {status.battery.level}% {status.battery.charging ? '⚡' : ''}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="system-status-footer">
            <p className="status-tip">
              Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> to toggle
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SystemStatus;
