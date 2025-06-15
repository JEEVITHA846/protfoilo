import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/shared/PageTransition';
import SectionTitle from '../components/shared/SectionTitle';
import { 
  Code, Terminal, Globe, 
  Layers
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  category: string;
}

interface Category {
  name: string;
  skills: Skill[];
}

const skillCategories: Category[] = [
  {
    name: 'Frontend Development',
    skills: [
      { name: 'HTML', level: 95, icon: <Code size={20} />, category: 'Frontend Development' },
      { name: 'CSS', level: 90, icon: <Code size={20} />, category: 'Frontend Development' },
      { name: 'JavaScript', level: 85, icon: <Globe size={20} />, category: 'Frontend Development' },
      { name: 'Angular', level: 80, icon: <Layers size={20} />, category: 'Frontend Development' },
      { name: 'React.js', level: 85, icon: <Layers size={20} />, category: 'Frontend Development' },
    ],
  },
  {
    name: 'Programming Languages',
    skills: [
      { name: 'Java', level: 85, icon: <Terminal size={20} />, category: 'Programming Languages' },
      { name: 'Python', level: 80, icon: <Terminal size={20} />, category: 'Programming Languages' },
      { name: 'C/C++', level: 75, icon: <Terminal size={20} />, category: 'Programming Languages' },
    ],
  },
];

const Skills: React.FC = () => {
  return (
    <PageTransition variant="slide-right">
      <div className="container-custom section-padding">
        <SectionTitle 
          title="My Skills" 
          subtitle="Technologies and tools I specialize in"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 gradient-text">{category.name}</h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, idx) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * idx }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="p-1.5 bg-gray-700 rounded-full mr-2">
                          {skill.icon}
                        </span>
                        <span className="text-gray-200">{skill.name}</span>
                      </div>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Skills;