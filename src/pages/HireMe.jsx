import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Linkedin, 
  ExternalLink, 
  Briefcase, 
  Users, 
  Quote,
  CheckCircle,
  Star,
  Calendar,
  MapPin,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react';

const HireMe = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const workExperience = [
    {
      title: "Freelance Full Stack Developer",
      company: "Fiverr",
      duration: "2023 – Present",
      location: "Remote",
      description: "Built and delivered high-performance websites for clients worldwide. Integrated custom APIs, deployed to Netlify/Vercel, and implemented CI/CD workflows.",
      skills: ["React.js", "Tailwind CSS", "Node.js", "MongoDB", "Firebase"],
      icon: <Briefcase size={24} />,
      link: "https://fiverr.com/deepakshukla"
    },
    {
      title: "Tech Team Member",
      company: "Technocrat Society, VIT Bhopal",
      duration: "2023 – Present",
      location: "VIT Bhopal",
      description: "Collaborated on campus tech projects, including event websites and automation tools. Participated in peer learning and project reviews.",
      skills: ["Git", "JavaScript", "Team Collaboration", "Project Management"],
      icon: <Users size={24} />,
      link: null
    }
  ];

  const testimonials = [
    {
      quote: "Deepak was highly responsive and delivered the web app with features I hadn't even asked for. Highly recommended!",
      author: "Sarah Johnson",
      role: "Startup Founder",
      platform: "Fiverr Client",
      rating: 5
    },
    {
      quote: "He led our backend integration during the OCR & Translate project. Very dependable and a strong problem solver.",
      author: "Arjun Patel",
      role: "Project Teammate",
      platform: "VIT Bhopal",
      rating: 5
    },
    {
      quote: "Shows strong ownership in team projects. Quick learner and good communicator with excellent technical skills.",
      author: "Priya Sharma",
      role: "Society Senior",
      platform: "Technocrat Society",
      rating: 5
    }
  ];

  const valuePropositions = [
    {
      icon: <TrendingUp size={24} />,
      title: "40+ Projects Completed",
      description: "Full-stack and AI-integrated projects across various domains"
    },
    {
      icon: <Star size={24} />,
      title: "5-Star HackerRank",
      description: "Proven expertise in Java & Python programming"
    },
    {
      icon: <Briefcase size={24} />,
      title: "Real Client Experience",
      description: "Delivered solutions for international clients via freelancing"
    },
    {
      icon: <Award size={24} />,
      title: "Strong Fundamentals",
      description: "Solid foundation in DSA, OOP, and software engineering"
    },
    {
      icon: <Users size={24} />,
      title: "Team Collaborator",
      description: "Excellent communication and teamwork abilities"
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Always Learning",
      description: "Actively growing skills with every project and challenge"
    }  ];

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Deepak_Shukla_Resume.pdf';
    link.download = 'Deepak_Shukla_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="hire-me-page">
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hire-me-hero"
      >
        <div className="container">
          <motion.div variants={itemVariants} className="hire-me-hero-content">
            <h1 className="hire-me-title">
              Why <span className="text-gradient">Hire Me</span>
            </h1>
            <p className="hire-me-subtitle">
              I bring a strong foundation in full-stack development, backed by real-world experience 
              and feedback from those I've worked with. Here's why I'm a valuable addition to your team or project.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Work Experience Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="hire-me-experience"
      >
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Work Experience
          </motion.h2>
          
          <div className="experience-timeline">
            {workExperience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="experience-card"
              >
                <div className="experience-icon">
                  {exp.icon}
                </div>
                <div className="experience-content">
                  <div className="experience-header">
                    <h3 className="experience-title">{exp.title}</h3>
                    <div className="experience-meta">
                      <span className="experience-company">{exp.company}</span>
                      <div className="experience-details">
                        <span className="experience-duration">
                          <Calendar size={16} />
                          {exp.duration}
                        </span>
                        <span className="experience-location">
                          <MapPin size={16} />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="experience-description">{exp.description}</p>
                  <div className="experience-skills">
                    {exp.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="experience-link"
                    >
                      View Profile <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="hire-me-testimonials"
      >
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            What People Say
          </motion.h2>
          
          <div className="testimonials-carousel">
            <button 
              onClick={prevTestimonial}
              className="testimonial-nav testimonial-nav-prev"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="testimonial-card"
            >
              <div className="testimonial-quote-icon">
                <Quote size={32} />
              </div>
              <blockquote className="testimonial-quote">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <div className="testimonial-rating">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <div className="testimonial-author">
                <h4>{testimonials[currentTestimonial].author}</h4>
                <p>{testimonials[currentTestimonial].role}</p>
                <span className="testimonial-platform">
                  {testimonials[currentTestimonial].platform}
                </span>
              </div>
            </motion.div>
            
            <button 
              onClick={nextTestimonial}
              className="testimonial-nav testimonial-nav-next"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`testimonial-indicator ${index === currentTestimonial ? 'active' : ''}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Value Propositions Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="hire-me-value"
      >
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Why Choose Me
          </motion.h2>
          
          <div className="value-grid">
            {valuePropositions.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="value-card"
              >
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="hire-me-cta"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2 className="cta-title">Ready to Work Together?</h2>
            <p className="cta-subtitle">
              Available for internships, freelance projects, and full-time opportunities
            </p>            <div className="button-container">
              <motion.button
                onClick={handleDownloadResume}
                className="btn btn-primary btn-lg cta-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                Download Resume
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="btn btn-primary btn-lg cta-btn"
                >
                  <Mail size={18} />
                  Contact Me
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HireMe;
