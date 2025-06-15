import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/shared/PageTransition';
import SectionTitle from '../components/shared/SectionTitle';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Immersive 3D Product Showcase",
    category: "3D Interactive",
    image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "An interactive 3D product showcase that allows users to view and customize products in real-time with realistic lighting and textures.",
    technologies: ["React", "Three.js", "WebGL", "GSAP"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/alexjohnson",
  },
  {
    id: 2,
    title: "Particle-based Data Visualization",
    category: "Data Visualization",
    image: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "A dynamic data visualization tool that transforms complex datasets into interactive particle systems, allowing for intuitive exploration.",
    technologies: ["D3.js", "React", "TypeScript", "Canvas API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/alexjohnson",
  },
  {
    id: 3,
    title: "Animated E-commerce Experience",
    category: "Web Development",
    image: "https://images.pexels.com/photos/6956912/pexels-photo-6956912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "A fully responsive e-commerce platform with smooth page transitions, micro-interactions, and an immersive shopping experience.",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/alexjohnson",
  },
  {
    id: 4,
    title: "WebGL Audio Visualizer",
    category: "Creative Coding",
    image: "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "An advanced audio visualizer that transforms music into stunning 3D visualizations using WebGL and audio analysis algorithms.",
    technologies: ["WebGL", "Web Audio API", "Three.js", "JavaScript"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/alexjohnson",
  },
  {
    id: 5,
    title: "Interactive Storytelling Platform",
    category: "Web Development",
    image: "https://images.pexels.com/photos/4050347/pexels-photo-4050347.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "A platform for creating and experiencing interactive stories with branching narratives, animations, and immersive elements.",
    technologies: ["React", "Redux", "Firebase", "GSAP"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/alexjohnson",
  },
  {
    id: 6,
    title: "Real-time Collaborative Workspace",
    category: "Web Development",
    image: "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "A collaborative workspace that allows teams to create, edit, and organize projects in real-time with robust 3D UI elements.",
    technologies: ["React", "Socket.io", "Three.js", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/alexjohnson",
  },
];

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <PageTransition variant="slide-left">
      <div className="container-custom section-padding">
        <SectionTitle 
          title="My Projects" 
          subtitle="Explore my latest work and creative experiments"
        />
        
        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="card-3d group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              style={{
                transform: hoveredProject === project.id ? 'perspective(1000px) rotateX(5deg) rotateY(5deg)' : 'perspective(1000px) rotateX(0) rotateY(0)',
              }}
            >
              <div className="overflow-hidden rounded-t-xl relative group">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold px-2 py-1 bg-primary-500/80 rounded-full text-white">
                        {project.category}
                      </span>
                      <div className="flex space-x-2">
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-900/80 rounded-full text-gray-200 hover:text-white transition-colors"
                        >
                          <Github size={16} />
                        </a>
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-900/80 rounded-full text-gray-200 hover:text-white transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gray-800/80 backdrop-blur-sm">
                <h3 className="font-bold text-xl mb-2 text-white">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Projects;