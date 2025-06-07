import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, Instagram } from 'lucide-react';

const Footer = () => {  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/deepak-158',
      color: 'footer-social-github'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/deepak-shukla-27a60628a/',
      color: 'footer-social-linkedin'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:dipakshukla158@gmail.com',
      color: 'footer-social-email'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/deepakshukla',
      color: 'footer-social-instagram'
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <h3 className="footer-brand-title">
                Deepak Shukla
              </h3>
              <p className="footer-brand-desc">
                Passionate B.Tech student and aspiring Full Stack Developer with a keen interest in Machine Learning and innovative technologies.
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="footer-section-title">
                Quick Links
              </h4>              <div className="footer-links-grid">
                {['About', 'Projects', 'Skills', 'Achievements', 'Hire Me', 'Contact'].map((link) => (
                  <motion.a
                    key={link}
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    whileHover={{ x: 5 }}
                    className="footer-link"
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact & Social */}
          <div className="footer-social-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="footer-section-title">
                Connect With Me
              </h4>
              <div className="footer-social-links">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`footer-social-link ${social.color}`}
                      aria-label={social.name}                    >
                      <IconComponent size={20} />
                    </motion.a>
                  );
                })}
              </div>
              <p className="footer-social-desc">
                Feel free to reach out for collaborations or just a friendly chat!
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="footer-bottom"
        >
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Deepak Shukla. All rights reserved.
            </p>
            <div className="footer-made-with">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="footer-heart"
              >
                <Heart size={16} className="text-red fill-current" fill="currentColor" />
              </motion.div>
              <span>and React</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
