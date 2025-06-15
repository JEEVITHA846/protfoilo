import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/shared/PageTransition';
import SectionTitle from '../components/shared/SectionTitle';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <PageTransition variant="slide-up">
      <div className="container-custom section-padding">
        <SectionTitle 
          title="About Me" 
          subtitle="Get to know the person behind the pixels"
        />
        
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-3xl font-bold mb-4 gradient-text"
            variants={itemVariants}
          >
            Creative Developer & Digital Artist
          </motion.h3>
          
          <motion.p 
            className="text-gray-300 mb-6"
            variants={itemVariants}
          >
            I'm a passionate developer with over 6 years of experience creating immersive 
            digital experiences. Based in San Francisco, I combine technical expertise with creative 
            design to build websites that stand out.
          </motion.p>
          
          <motion.p 
            className="text-gray-300 mb-6"
            variants={itemVariants}
          >
            My journey began with traditional web development, but quickly evolved as I discovered 
            my passion for interactive 3D experiences and animations. I believe that the web should 
            be both beautiful and functional, creating memorable experiences for users.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            variants={itemVariants}
          >
            <div className="card">
              <h4 className="text-xl font-semibold text-primary-400 mb-2">Education</h4>
              <p className="text-gray-300">MSc in Computer Science</p>
              <p className="text-gray-400 text-sm">Stanford University, 2018</p>
            </div>
            
            <div className="card">
              <h4 className="text-xl font-semibold text-secondary-400 mb-2">Experience</h4>
              <p className="text-gray-300">Senior Frontend Developer</p>
              <p className="text-gray-400 text-sm">6+ years of professional experience</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-2"
            variants={itemVariants}
          >
            {['ReactJS', 'Three.js', 'WebGL', 'Framer Motion', 'TypeScript', 'Node.js'].map((skill) => (
              <span 
                key={skill}
                className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default About;