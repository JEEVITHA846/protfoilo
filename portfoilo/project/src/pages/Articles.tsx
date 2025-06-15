import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/shared/PageTransition';
import SectionTitle from '../components/shared/SectionTitle';
import { Calendar, Clock, ExternalLink } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  link: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Creating Immersive 3D Experiences with Three.js and React",
    excerpt: "Learn how to combine the power of Three.js with React to create engaging 3D web experiences that captivate users.",
    date: "May 15, 2023",
    readTime: "8 min read",
    category: "Web Development",
    image: "https://images.pexels.com/photos/7775642/pexels-photo-7775642.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    link: "https://example.com/article1",
  },
  {
    id: 2,
    title: "Advanced Animation Techniques with Framer Motion",
    excerpt: "Dive deep into Framer Motion's capabilities and learn how to create complex, physics-based animations for your web projects.",
    date: "April 3, 2023",
    readTime: "10 min read",
    category: "Animation",
    image: "https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    link: "https://example.com/article2",
  },
  {
    id: 3,
    title: "Building Performant Particle Systems for the Web",
    excerpt: "Explore techniques for optimizing particle systems to create visually stunning effects without sacrificing performance.",
    date: "March 12, 2023",
    readTime: "12 min read",
    category: "Performance",
    image: "https://images.pexels.com/photos/3801426/pexels-photo-3801426.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    link: "https://example.com/article3",
  },
  {
    id: 4,
    title: "From Design to Development: Bridging the Gap",
    excerpt: "Strategies for designers and developers to collaborate more effectively and create cohesive digital experiences.",
    date: "February 28, 2023",
    readTime: "7 min read",
    category: "Design",
    image: "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    link: "https://example.com/article4",
  },
  {
    id: 5,
    title: "WebGL Fundamentals: Understanding the Basics",
    excerpt: "A beginner-friendly introduction to WebGL concepts that form the foundation of browser-based 3D graphics.",
    date: "January 15, 2023",
    readTime: "15 min read",
    category: "WebGL",
    image: "https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    link: "https://example.com/article5",
  },
  {
    id: 6,
    title: "The Future of Web Animation: What's Coming in 2023",
    excerpt: "Explore emerging trends and technologies that will shape the future of web animations and interactive experiences.",
    date: "December 5, 2022",
    readTime: "9 min read",
    category: "Trends",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    link: "https://example.com/article6",
  },
];

const Articles: React.FC = () => {
  return (
    <PageTransition variant="slide-left">
      <div className="container-custom section-padding">
        <SectionTitle 
          title="Articles & Features" 
          subtitle="Thoughts, tutorials, and insights on web development and design"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <article className="card overflow-hidden h-full flex flex-col">
                <div className="overflow-hidden rounded-t-xl">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-primary-500/20 text-primary-400 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 flex-grow">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar size={14} className="mr-1" />
                      <span>{article.date}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock size={14} className="mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2 bg-gray-900/80 rounded-full text-primary-400">
                    <ExternalLink size={16} />
                  </div>
                </div>
              </article>
            </motion.a>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Articles;