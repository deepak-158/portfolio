import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, Heart, Coffee, Music, Camera, Book } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  const education = [
    {
      year: '2023 - 2027',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science Engineering',
      institution: 'VIT Bhopal',
      grade: 'CGPA: 8.72/10',
      description: 'Focused on Data Structures, Algorithms, Web Development, and Machine Learning'
    },
    {
      year: '2020 - 2022',
      degree: 'Higher Secondary Certificate (HSC)',
      field: 'Science Stream',
      institution: 'ABC Higher Secondary School',
      grade: '92.5%',
      description: 'Specialized in Physics, Chemistry, Mathematics, and Computer Science'
    }
  ];
  const interests = [
    { name: 'Coding', icon: Coffee, color: 'interest-brown' },
    { name: 'Music', icon: Music, color: 'interest-purple' },
    { name: 'Photography', icon: Camera, color: 'interest-blue' },
    { name: 'Reading', icon: Book, color: 'interest-green' },
  ];
  const personalInfo = [
    { label: 'Location', value: 'Bhopal, Madhya Pradesh', icon: MapPin },
    { label: 'Age', value: '20 years old', icon: Calendar },
    { label: 'Languages', value: 'English, Hindi', icon: Award },
  ];
  return (
    <div className="about-page">
      <div className="about-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >          {/* Header Section */}
          <motion.div variants={itemVariants} className="about-header">
            <h1 className="section-title">
              About <span className="text-gradient">Me</span>
            </h1>
            <p className="about-subtitle">
              Get to know more about who I am, what I do, and what motivates me in my journey as a developer.
            </p>
          </motion.div>

        <div className="about-grid">
          {/* Profile Image and Basic Info */}
          <motion.div variants={itemVariants} className="about-profile">
            <div className="profile-card">
              <div className="profile-avatar-section">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="profile-avatar"
                >
                  DS
                </motion.div>
                <h2 className="profile-name">
                  Deepak Shukla
                </h2>
                <p className="profile-title">
                  B.Tech Student & Aspiring Developer
                </p>
              </div>

              <div className="profile-info">
                {personalInfo.map((info, index) => {
                  const IconComponent = info.icon;                  return (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="profile-info-item"
                    >
                      <IconComponent size={18} className="text-blue" />
                      <span className="info-label">{info.label}:</span>
                      <span className="info-value">{info.value}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="about-content">
            {/* Bio Section */}
            <motion.div variants={itemVariants}>
              <h3 className="content-section-title">
                My Story
              </h3>
              <div className="bio-text">
                <p className="bio-paragraph">
                  Hello! I'm Deepak, a passionate B.Tech student currently pursuing Computer Science Engineering. 
                  My journey into the world of technology began during my high school years when I first 
                  encountered programming. What started as curiosity quickly evolved into a deep passion for 
                  creating digital solutions.
                </p>
                <p className="bio-paragraph">
                  I'm particularly fascinated by the intersection of web development and machine learning. 
                  I believe that technology has the power to solve real-world problems and make a positive 
                  impact on society. This drives me to continuously learn new technologies, work on challenging 
                  projects, and collaborate with like-minded individuals.
                </p>
                <p className="bio-paragraph">
                  When I'm not coding, you'll find me exploring new music, capturing moments through photography, 
                  or diving into a good book. I believe in maintaining a balance between technical skills and 
                  creative pursuits, as they both contribute to my growth as a well-rounded individual.
                </p>
              </div>
            </motion.div>

            {/* Education Timeline */}
            <motion.div variants={itemVariants}>
              <h3 className="content-section-title">
                Education
              </h3>
              <div className="education-timeline">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="education-item"
                  >
                    <div className="timeline-marker"></div>
                    <div className="education-card">
                      <div className="education-header">
                        <h4 className="education-degree">
                          {edu.degree}
                        </h4>
                        <span className="education-year">
                          {edu.year}
                        </span>
                      </div>
                      <p className="education-details">
                        {edu.field} • {edu.institution}
                      </p>
                      <p className="education-grade">
                        {edu.grade}
                      </p>
                      <p className="education-description">
                        {edu.description}
                      </p>
                    </div>
                  </motion.div>                ))}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div variants={itemVariants}>
              <h3 className="content-section-title">
                Interests & Hobbies
              </h3>
              <div className="interests-grid">
                {interests.map((interest, index) => {
                  const IconComponent = interest.icon;
                  return (
                    <motion.div
                      key={interest.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="interest-card"
                    >
                      <IconComponent 
                        size={32} 
                        className={`interest-icon ${interest.color}`} 
                      />
                      <h4 className="interest-name">
                        {interest.name}
                      </h4>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              variants={itemVariants}
              className="about-cta"
            >
              <h3 className="cta-title">
                Let's Connect!
              </h3>
              <p className="cta-text">
                I'm always excited to discuss new opportunities, collaborate on projects, 
                or simply have a chat about technology and innovation.
              </p>              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-button"
              >
                <Heart size={16} className="cta-icon" />
                <span style={{ position: 'relative', zIndex: 1 }}>Get In Touch</span>
              </motion.a></motion.div>
          </div>
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
