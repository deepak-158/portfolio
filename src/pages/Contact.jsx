import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter,
  FaInstagram,
  FaPaperPlane,
  FaUser,
  FaComment,
  FaSpinner,
  FaDownload,
  FaCalendarAlt,
  FaCheckCircle
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xqkndplk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
    // Contact information items
  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'dipakshukla158@gmail.com',
      link: 'mailto:dipakshukla158@gmail.com',
      color: 'contact-icon-email'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+91 9450160224',
      link: 'tel:+919450160224',
      color: 'contact-icon-phone'
    },    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Bhopal, Madhya Pradesh',
      link: 'https://maps.google.com/?q=Bhopal,Madhya Pradesh',
      color: 'contact-icon-location'
    },
    {
      icon: FaCalendarAlt,
      label: 'Availability',
      value: 'Weekdays, 9 AM - 6 PM IST',
      link: '#',
      color: 'contact-icon-calendar'
    }
  ];
    // Social media links
  const socialLinks = [
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/deepak-shukla-27a60628a/',
      color: 'social-linkedin'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      url: 'https://github.com/deepak-158',
      color: 'social-github'
    },
    {
      icon: FaTwitter,
      label: 'Twitter',
      url: 'https://twitter.com/deepakshukla',
      color: 'social-twitter'
    },
    {
      icon: FaInstagram,
      label: 'Instagram',
      url: 'https://instagram.com/deepakshukla',
      color: 'social-instagram'
    }
  ];
  
  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="contact-header"
        >
          <h1 className="contact-title">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="contact-subtitle">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>
        
        <div className="contact-main-grid">
          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="contact-form-card"
          >
            <div className="form-card-header">
              <h2 className="form-title">Send Me a Message</h2>
              <p className="form-subtitle">Let's start a conversation</p>
            </div>              <form 
              onSubmit={handleSubmit} 
              action="https://formspree.io/f/xqkndplk"
              method="POST"
              className="contact-form"
            >
              {/* Hidden field for better spam protection */}
              <input type="hidden" name="_subject" value="New Contact Form Submission from Portfolio" />
              <input type="hidden" name="_captcha" value="false" />
              
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="What's this about?"
                />
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <div className="textarea-with-icon">
                  <FaComment className="textarea-icon" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="form-textarea"
                    placeholder="Tell me about your project, idea, or just say hello!"
                  />
                </div>
              </div>

              {/* Submit Status */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="status-message success"
                >
                  <FaCheckCircle className="status-icon" />
                  <span>Thank you for your message! I'll get back to you soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="status-message error"
                >
                  <span>Oops! Something went wrong. Please try again.</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="icon-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="contact-info-container"
          >
            {/* Contact Details Card */}
            <div className="contact-info-card">
              <h2 className="info-card-title">Contact Information</h2>
              <p className="info-card-subtitle">Here's how you can reach me</p>
              
              <div className="contact-info-items">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.a
                      key={index}
                      href={info.link}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      className="contact-info-item"
                      target={info.link.startsWith('http') ? "_blank" : ""}
                      rel={info.link.startsWith('http') ? "noopener noreferrer" : ""}
                    >
                      <div className={`info-icon ${info.color}`}>
                        <IconComponent />
                      </div>
                      <div className="info-content">
                        <h3 className="info-label">{info.label}</h3>
                        <p className="info-value">{info.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
            
            {/* Social Media Card */}
            <div className="social-media-card">
              <h2 className="social-card-title">Connect With Me</h2>
              <p className="social-card-subtitle">Let's be social</p>
              
              <div className="social-links-grid">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`social-link-item ${social.color}`}
                    >
                      <IconComponent className="social-icon" />
                      <span className="social-label">{social.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="contact-cta-section"
        >
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="cta-title">Let's Work Together</h2>
              <p className="cta-description">
                Have a project in mind? Looking to collaborate or hire me? I'm currently 
                available for freelance work and full-time positions.
              </p>
            </div>            <div className="cta-buttons">
              <a href="mailto:dipakshukla158@gmail.com" className="cta-button primary">
                <FaEnvelope />
                <span>Email Me</span>
              </a>
              
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/Deepak_Shukla_Resume.pdf';
                  link.download = 'Deepak_Shukla_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="cta-button secondary"
              >
                <FaDownload />
                <span>Download CV</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
