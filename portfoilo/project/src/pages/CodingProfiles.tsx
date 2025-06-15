import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/shared/PageTransition';
import SectionTitle from '../components/shared/SectionTitle';
import { Github, Code, Star, GitFork, Hexagon, ExternalLink } from 'lucide-react';

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

interface CodingProfile {
  platform: string;
  username: string;
  icon: React.ReactNode;
  url: string;
  stats: {
    label: string;
    value: string | number;
  }[];
}

const repositories: Repository[] = [
  {
    name: "interactive-3d-portfolio",
    description: "A highly customizable 3D portfolio template built with Three.js and React",
    stars: 340,
    forks: 56,
    language: "TypeScript",
    url: "https://github.com/alexjohnson/interactive-3d-portfolio",
  },
  {
    name: "react-particle-system",
    description: "A performant particle system for React applications with customizable effects",
    stars: 275,
    forks: 42,
    language: "JavaScript",
    url: "https://github.com/alexjohnson/react-particle-system",
  },
  {
    name: "webgl-shader-collection",
    description: "A collection of GLSL shaders for creative WebGL projects",
    stars: 180,
    forks: 24,
    language: "GLSL",
    url: "https://github.com/alexjohnson/webgl-shader-collection",
  },
  {
    name: "framer-motion-recipes",
    description: "A set of common animation patterns and examples using Framer Motion",
    stars: 156,
    forks: 18,
    language: "TypeScript",
    url: "https://github.com/alexjohnson/framer-motion-recipes",
  },
];

const codingProfiles: CodingProfile[] = [
  {
    platform: "GitHub",
    username: "alexjohnson",
    icon: <Github size={24} />,
    url: "https://github.com/alexjohnson",
    stats: [
      { label: "Repositories", value: 32 },
      { label: "Followers", value: 458 },
      { label: "Stars", value: 1.2 + "k" },
      { label: "Contributions", value: 842 },
    ],
  },
  {
    platform: "LeetCode",
    username: "alexjohnson",
    icon: <Code size={24} />,
    url: "https://leetcode.com/alexjohnson",
    stats: [
      { label: "Problems Solved", value: 248 },
      { label: "Contest Rating", value: 1765 },
      { label: "Global Ranking", value: "Top 5%" },
      { label: "Badges", value: 12 },
    ],
  },
  {
    platform: "HackerRank",
    username: "alexjohnson",
    icon: <Hexagon size={24} />,
    url: "https://hackerrank.com/alexjohnson",
    stats: [
      { label: "Skills Verified", value: 8 },
      { label: "Certificates", value: 5 },
      { label: "Badges", value: 14 },
      { label: "Points", value: 3240 },
    ],
  },
];

const CodingProfiles: React.FC = () => {
  return (
    <PageTransition variant="slide-right">
      <div className="container-custom section-padding">
        <SectionTitle 
          title="Coding Profiles" 
          subtitle="Check out my open-source contributions and coding achievements"
        />
        
        {/* GitHub Repositories */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <Github size={24} className="mr-3 text-primary-400" />
            Featured Repositories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repositories.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-6 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-semibold group-hover:text-primary-400 transition-colors">
                    {repo.name}
                  </h4>
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-primary-400 transition-colors" />
                </div>
                
                <p className="text-gray-400 text-sm mt-2 mb-4 line-clamp-2">
                  {repo.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 ${
                      repo.language === 'TypeScript' ? 'bg-blue-400' :
                      repo.language === 'JavaScript' ? 'bg-yellow-400' :
                      repo.language === 'GLSL' ? 'bg-purple-400' : 'bg-gray-400'
                    }`}></span>
                    <span className="text-sm text-gray-300">{repo.language}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Star size={14} className="mr-1" />
                      <span>{repo.stars}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 text-sm">
                      <GitFork size={14} className="mr-1" />
                      <span>{repo.forks}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        {/* Coding Profiles */}
        <div>
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <Code size={24} className="mr-3 text-primary-400" />
            Coding Platforms
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {codingProfiles.map((profile, index) => (
              <motion.a
                key={profile.platform}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-6 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gray-700 rounded-full mr-3 text-primary-400">
                    {profile.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-primary-400 transition-colors">
                      {profile.platform}
                    </h4>
                    <p className="text-sm text-gray-400">@{profile.username}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {profile.stats.map((stat, idx) => (
                    <div key={idx} className="text-center p-2 bg-gray-800 rounded-lg">
                      <p className="text-lg font-semibold text-primary-400">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <span className="text-xs text-gray-400 flex items-center justify-center group-hover:text-primary-400 transition-colors">
                    View Profile
                    <ExternalLink size={12} className="ml-1" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CodingProfiles;