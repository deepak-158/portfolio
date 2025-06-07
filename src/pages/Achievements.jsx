import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaCertificate, FaMedal, FaAward, FaExternalLinkAlt, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
import { achievements } from '../data/achievements';

const Achievements = () => {
  const [filter, setFilter] = useState('all');
  const categories = [
    { key: 'all', label: 'All', icon: FaTrophy },
    { key: 'certification', label: 'Certifications', icon: FaCertificate },
    { key: 'achievement', label: 'Awards', icon: FaAward },
    { key: 'competition', label: 'Competitions', icon: FaMedal },
    { key: 'academic', label: 'Academic', icon: FaGraduationCap }
  ];

  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const getCategoryIcon = (category) => {
    const categoryData = categories.find(cat => cat.key === category);
    return categoryData ? categoryData.icon : FaTrophy;
  };
  const getCategoryColor = (category) => {
    const colors = {
      certification: 'bg-blue-500',
      achievement: 'bg-yellow-500',
      competition: 'bg-purple-500',
      academic: 'bg-green-500'
    };
    return colors[category] || 'bg-blue-500';
  };

  return (    <div className="achievements-page">
      <div className="achievements-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="achievements-header"
        >
          <h1 className="achievements-title">
            Achievements & Certifications
          </h1>
          <p className="achievements-subtitle">
            A showcase of my professional certifications, academic achievements, and competition victories
          </p>
        </motion.div>        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="achievements-filters"
        >        {categories.map((category) => {
            const IconComponent = category.icon;
            const count = category.key === 'all' 
              ? achievements.length 
              : achievements.filter(a => a.category === category.key).length;
            return (
              <button
                key={category.key}
                onClick={() => setFilter(category.key)}
                className={`achievement-filter-btn ${
                  filter === category.key ? 'active' : ''
                }`}
              >
                <IconComponent className="filter-btn-icon" />
                <span className="filter-btn-text">{category.label}</span>
                <span className="filter-count">{count}</span>
              </button>
            );
          })}
        </motion.div>        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="achievements-grid"
        >
          {filteredAchievements.map((achievement, index) => {
            const IconComponent = getCategoryIcon(achievement.category);
            return (
              <motion.div
                key={achievement.id}
                variants={itemVariants}
                className="achievement-card"
              >
                {/* Achievement Image */}
                <div className="achievement-image">
                  {achievement.image ? (
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="achievement-img"
                    />
                  ) : (
                    <div className="achievement-placeholder">
                      <IconComponent className="achievement-placeholder-icon" />
                    </div>
                  )}
                  <div className="achievement-category-badge">
                    <span className={`category-badge category-${achievement.category}`}>
                      {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                    </span>
                  </div>
                </div>                {/* Achievement Content */}
                <div className="achievement-content">
                  <h3 className="achievement-title">
                    {achievement.title}
                  </h3>
                  <p className="achievement-issuer">
                    {achievement.issuer}
                  </p>
                  <p className="achievement-description">
                    {achievement.description}
                  </p>

                  {/* Date and Skills */}
                  <div className="achievement-meta">
                    <div className="achievement-date">
                      <FaCalendarAlt className="date-icon" />
                      <span className="date-text">{achievement.date}</span>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  {achievement.skills && achievement.skills.length > 0 && (
                    <div className="achievement-skills">
                      {achievement.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="skill-tag"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="achievement-links">
                    {achievement.credentialUrl && (
                      <a
                        href={achievement.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="achievement-link credential-link"
                      >
                        <FaExternalLinkAlt className="link-icon" />
                        View Credential
                      </a>
                    )}
                    {achievement.certificateUrl && (
                      <a
                        href={achievement.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="achievement-link certificate-link"
                      >
                        <FaCertificate className="link-icon" />
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="achievements-empty-state"
          >
            <FaTrophy className="empty-state-icon" />
            <h3 className="empty-state-title">
              No achievements found
            </h3>
            <p className="empty-state-text">
              No achievements match the selected filter.
            </p>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="achievements-stats"
        >
          <h2 className="stats-title">
            Achievement Summary
          </h2>
          <div className="stats-grid">
            {categories.slice(1).map((category) => {
              const count = achievements.filter(a => a.category === category.key).length;
              const IconComponent = category.icon;
              return (
                <div key={category.key} className="stat-item">
                  <div className={`stat-icon stat-${category.key}`}>
                    <IconComponent className="stat-icon-svg" />
                  </div>
                  <div className="stat-number">
                    {count}
                  </div>
                  <div className="stat-label">
                    {category.label}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Achievements;
