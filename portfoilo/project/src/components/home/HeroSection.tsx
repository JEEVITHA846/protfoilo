import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const constraintsRef = useRef(null);

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      ref={constraintsRef}
      className="min-h-screen flex items-center justify-center px-4 py-16 md:py-0"
      initial="hidden"
      animate="visible"
    >
      <div className="text-center max-w-3xl">
        <motion.h1 
          className="mb-4"
          variants={titleVariants}
        >
          <span className="block">Welcome to my</span>
          <span className="gradient-text">Portfolio</span>
        </motion.h1>
        
        <motion.h2 
          className="text-2xl md:text-3xl text-gray-300 mb-6"
          variants={subtitleVariants}
        >
          Creative Developer & Digital Artist
        </motion.h2>
        
        <motion.p 
          className="text-gray-400 mb-8 max-w-2xl mx-auto"
          variants={subtitleVariants}
        >
          I craft immersive digital experiences with cutting-edge web technologies.
          Specializing in interactive websites, animations, and creative coding.
        </motion.p>
        
        <motion.div 
          className="flex justify-center space-x-4"
          variants={buttonVariants}
        >
          <Link 
            to="/projects" 
            className="btn-primary flex items-center"
          >
            View My Work
            <ArrowRight className="ml-2" size={18} />
          </Link>
          
          <Link 
            to="/contact" 
            className="btn-secondary"
          >
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;