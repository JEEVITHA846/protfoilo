import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Code } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
    { name: 'Email', icon: Mail, url: 'mailto:contact@example.com' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <footer className="bg-gray-900/30 backdrop-blur-sm mt-auto py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <motion.div
                className="bg-primary-500 text-white p-1.5 rounded-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Code size={18} />
              </motion.div>
              <span className="text-lg font-bold gradient-text">Portfolio</span>
            </div>
            <p className="text-gray-400 mt-2 text-sm">
              Creative Developer & Digital Artist
            </p>
          </div>

          <motion.div 
            className="flex space-x-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                variants={item}
                whileHover={{ y: -3, scale: 1.1 }}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-500 text-sm">
              Designed & Built with 💙
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;