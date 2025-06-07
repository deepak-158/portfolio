import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Smartphone, Brain, Settings, Zap, Star } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const skillCategories = [
    { id: 'all', name: 'All Skills', icon: Star },
    { id: 'frontend', name: 'Frontend', icon: Globe },
    { id: 'backend', name: 'Backend', icon: Database },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
    { id: 'ml', name: 'Machine Learning', icon: Brain },
    { id: 'tools', name: 'Tools & Others', icon: Settings },
  ];
  const skills = [
    // Frontend
    { name: 'React.js', level: 90, category: 'frontend', color: 'from-blue-400 to-blue-600', icon: '⚛️' },
    { name: 'JavaScript', level: 85, category: 'frontend', color: 'from-yellow-400 to-yellow-600', icon: '🟨' },
    { name: 'TypeScript', level: 75, category: 'frontend', color: 'from-blue-500 to-blue-700', icon: '🔷' },
    { name: 'HTML/CSS', level: 95, category: 'frontend', color: 'from-orange-400 to-red-500', icon: '🎨' },
    { name: 'Tailwind CSS', level: 88, category: 'frontend', color: 'from-cyan-400 to-blue-500', icon: '🎨' },
    { name: 'Bootstrap', level: 85, category: 'frontend', color: 'from-purple-500 to-purple-700', icon: '🅱️' },
    { name: 'Next.js', level: 80, category: 'frontend', color: 'from-gray-700 to-gray-900', icon: '▲' },
    
    // Backend
    { name: 'Node.js', level: 82, category: 'backend', color: 'from-green-500 to-green-700', icon: '🟢' },
    { name: 'Express.js', level: 85, category: 'backend', color: 'from-gray-600 to-gray-800', icon: '🚀' },
    { name: 'Python', level: 88, category: 'backend', color: 'from-blue-500 to-yellow-500', icon: '🐍' },
    { name: 'Java', level: 80, category: 'backend', color: 'from-red-500 to-orange-600', icon: '☕' },
    { name: 'MongoDB', level: 78, category: 'backend', color: 'from-green-400 to-green-600', icon: '🍃' },
    { name: 'MySQL', level: 75, category: 'backend', color: 'from-blue-600 to-blue-800', icon: '🐬' },
    { name: 'Firebase', level: 80, category: 'backend', color: 'from-yellow-400 to-orange-500', icon: '🔥' },
    { name: 'REST APIs', level: 85, category: 'backend', color: 'from-purple-500 to-purple-700', icon: '🔗' },
    
    // Mobile
    { name: 'React Native', level: 70, category: 'mobile', color: 'from-blue-400 to-purple-600', icon: '📱' },
    { name: 'Flutter', level: 65, category: 'mobile', color: 'from-blue-400 to-cyan-600', icon: '🦋' },
    
    // Machine Learning
    { name: 'Python ML', level: 80, category: 'ml', color: 'from-orange-400 to-red-600', icon: '🤖' },
    { name: 'TensorFlow', level: 70, category: 'ml', color: 'from-orange-500 to-orange-700', icon: '🧠' },
    { name: 'Scikit-learn', level: 75, category: 'ml', color: 'from-blue-500 to-indigo-600', icon: '📊' },
    { name: 'Pandas', level: 85, category: 'ml', color: 'from-purple-500 to-pink-600', icon: '🐼' },
    { name: 'NumPy', level: 82, category: 'ml', color: 'from-blue-600 to-purple-600', icon: '🔢' },
    { name: 'OpenCV', level: 70, category: 'ml', color: 'from-green-500 to-blue-600', icon: '👁️' },
    
    // Tools
    { name: 'Git', level: 88, category: 'tools', color: 'from-red-500 to-red-700', icon: '📝' },
    { name: 'Docker', level: 70, category: 'tools', color: 'from-blue-400 to-blue-600', icon: '🐳' },
    { name: 'VS Code', level: 95, category: 'tools', color: 'from-blue-500 to-purple-600', icon: '💻' },
    { name: 'Figma', level: 75, category: 'tools', color: 'from-purple-400 to-pink-600', icon: '🎨' },
    { name: 'Linux', level: 72, category: 'tools', color: 'from-gray-700 to-black', icon: '🐧' },
    { name: 'Arduino', level: 78, category: 'tools', color: 'from-teal-500 to-cyan-600', icon: '🔧' },
    { name: 'Postman', level: 82, category: 'tools', color: 'from-orange-500 to-red-600', icon: '📮' },
    { name: 'Netlify', level: 85, category: 'tools', color: 'from-teal-400 to-blue-500', icon: '🌐' },
    { name: 'Vercel', level: 88, category: 'tools', color: 'from-black to-gray-700', icon: '▲' },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
  return (
    <div className="skills-page">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container skills-container"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="skills-header">
          <h1 className="skills-title">
            My <span className="text-gradient">Skills</span>
          </h1>
          <p className="skills-subtitle">
            Here's a comprehensive overview of my technical skills and expertise across different domains.
          </p>
        </motion.div>

        {/* Skill Categories Filter */}
        <motion.div variants={itemVariants} className="skills-filter">
          <div className="skill-categories">
            {skillCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`skill-category-btn ${
                    activeCategory === category.id
                      ? 'skill-category-active'
                      : 'skill-category-inactive'
                  }`}
                >
                  <IconComponent size={18} />
                  <span>{category.name}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="skills-grid"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              variants={skillVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="skill-card"
            >
              <div className="skill-header">
                <div className="skill-info">
                  <span className="skill-icon">{skill.icon}</span>
                  <h3 className="skill-name">
                    {skill.name}
                  </h3>
                </div>
                <span className="skill-percentage">
                  {skill.level}%
                </span>
              </div>

              {/* Skill Progress Bar */}
              <div className="skill-progress-container">
                <div className="skill-progress-bg">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.05, ease: "easeOut" }}
                    className={`skill-progress-bar ${skill.color}`}
                  >
                    <div className="skill-progress-shine"></div>
                  </motion.div>
                </div>
              </div>

              {/* Skill Level Description */}
              <div className="skill-level">
                {skill.level >= 90 && "Expert Level"}
                {skill.level >= 80 && skill.level < 90 && "Advanced"}
                {skill.level >= 70 && skill.level < 80 && "Intermediate"}
                {skill.level >= 60 && skill.level < 70 && "Beginner+"}
                {skill.level < 60 && "Learning"}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          variants={itemVariants}
          className="skills-features"
        >
          <div className="feature-card feature-blue">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="feature-icon feature-icon-blue"
            >
              <Code size={32} className="icon-white" />
            </motion.div>
            <h3 className="feature-title">
              Clean Code
            </h3>
            <p className="feature-description">
              I write maintainable, scalable, and well-documented code following best practices.
            </p>
          </div>

          <div className="feature-card feature-purple">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="feature-icon feature-icon-purple"
            >
              <Zap size={32} className="icon-white" />
            </motion.div>
            <h3 className="feature-title">
              Fast Learner
            </h3>
            <p className="feature-description">
              I quickly adapt to new technologies and frameworks, staying updated with industry trends.
            </p>
          </div>

          <div className="feature-card feature-green">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="feature-icon feature-icon-green"
            >
              <Brain size={32} className="icon-white" />
            </motion.div>
            <h3 className="feature-title">
              Problem Solver
            </h3>
            <p className="feature-description">
              I enjoy tackling complex challenges and finding creative solutions to technical problems.
            </p>
          </div>
        </motion.div>        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="skills-cta"
        >
          <h3 className="cta-title">
            Want to see these skills in action?
          </h3>
          <p className="cta-subtitle">
            Check out my projects to see how I apply these technologies to build amazing solutions.
          </p>
          <div className="cta-buttons">            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button"
            >
              <span style={{ position: 'relative', zIndex: 1 }}>View My Projects</span>
              <motion.span
                className="cta-arrow"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                →
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skills;
