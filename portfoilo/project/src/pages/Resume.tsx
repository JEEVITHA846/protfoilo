import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/shared/PageTransition';
import SectionTitle from '../components/shared/SectionTitle';
import { FileDown, GraduationCap, Upload, Award, Trash2, Eye, Download } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: 'resume' | 'certificate';
  uploadDate: string;
  file: File;
}

const education = [
  {
    degree: 'MSc in Computer Science',
    institution: 'Stanford University',
    period: '2016 - 2018',
    location: 'Stanford, CA',
    details: 'Specialization in Computer Graphics and Interactive Techniques',
  },
  {
    degree: 'BSc in Software Engineering',
    institution: 'University of Washington',
    period: '2012 - 2016',
    location: 'Seattle, WA',
    details: 'Graduated with honors. Minor in Digital Arts',
  },
];

const Resume: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const certificateInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'certificate') => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        type,
        uploadDate: new Date().toLocaleDateString(),
        file: file,
      };
      
      // If uploading a new resume, remove the old one
      if (type === 'resume') {
        setUploadedFiles(prev => prev.filter(f => f.type !== 'resume').concat(newFile));
      } else {
        setUploadedFiles(prev => [...prev, newFile]);
      }
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleUploadClick = (type: 'resume' | 'certificate') => {
    if (type === 'resume') {
      resumeInputRef.current?.click();
    } else {
      certificateInputRef.current?.click();
    }
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleViewFile = (file: UploadedFile) => {
    const fileURL = URL.createObjectURL(file.file);
    window.open(fileURL, '_blank');
    
    // Clean up the blob URL after a delay
    setTimeout(() => {
      URL.revokeObjectURL(fileURL);
    }, 1000);
  };

  const handleDownloadFile = (file: UploadedFile) => {
    const fileURL = URL.createObjectURL(file.file);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the blob URL
    setTimeout(() => {
      URL.revokeObjectURL(fileURL);
    }, 1000);
  };

  const resumeFile = uploadedFiles.find(file => file.type === 'resume');
  const certificateFiles = uploadedFiles.filter(file => file.type === 'certificate');

  return (
    <PageTransition variant="fade">
      <div className="container-custom section-padding">
        <SectionTitle 
          title="Resume & Certificates" 
          subtitle="My professional experience and qualifications"
        />
        
        {/* Upload Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Resume Upload Section */}
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-primary-500/20 rounded-full mr-3">
                <FileDown className="text-primary-500" size={24} />
              </div>
              <h3 className="text-xl font-bold">My Resume</h3>
            </div>
            
            <p className="text-gray-400 mb-6">
              Upload your resume to showcase your professional experience
            </p>
            
            <motion.button
              onClick={() => handleUploadClick('resume')}
              className="btn-primary w-full flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Upload className="mr-2" size={20} />
              {resumeFile ? 'Update Resume' : 'Upload Resume'}
            </motion.button>
          </motion.div>
          
          {/* Certificate Upload Section */}
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-accent-500/20 rounded-full mr-3">
                <Award className="text-accent-500" size={24} />
              </div>
              <h3 className="text-xl font-bold">Certificates</h3>
            </div>
            
            <p className="text-gray-400 mb-6">
              Upload your professional certificates and achievements
            </p>
            
            <motion.button
              onClick={() => handleUploadClick('certificate')}
              className="btn-accent w-full flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Upload className="mr-2" size={20} />
              Upload Certificate
            </motion.button>
          </motion.div>
        </div>
        
        {/* Hidden File Inputs */}
        <input
          type="file"
          ref={resumeInputRef}
          onChange={(e) => handleFileUpload(e, 'resume')}
          accept=".pdf"
          className="hidden"
        />
        
        <input
          type="file"
          ref={certificateInputRef}
          onChange={(e) => handleFileUpload(e, 'certificate')}
          accept=".pdf"
          className="hidden"
        />
        
        {/* My Resume Section */}
        {resumeFile && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card p-6">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-primary-500/20 rounded-full mr-3">
                  <FileDown className="text-primary-500" size={24} />
                </div>
                <h3 className="text-2xl font-bold">My Resume</h3>
              </div>
              
              <motion.div
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-primary-500 transition-all duration-300 group"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-primary-500/20 rounded-full mr-4">
                      <FileDown className="text-primary-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{resumeFile.name}</h4>
                      <p className="text-gray-400 text-sm">Uploaded on {resumeFile.uploadDate}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteFile(resumeFile.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors p-2 opacity-0 group-hover:opacity-100"
                    title="Delete resume"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex gap-3">
                  <motion.button 
                    onClick={() => handleViewFile(resumeFile)}
                    className="flex items-center text-primary-400 hover:text-primary-300 transition-colors text-sm bg-primary-500/10 hover:bg-primary-500/20 px-4 py-2 rounded-full flex-1 justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye size={14} className="mr-2" />
                    View Resume
                  </motion.button>
                  
                  <motion.button 
                    onClick={() => handleDownloadFile(resumeFile)}
                    className="flex items-center text-secondary-400 hover:text-secondary-300 transition-colors text-sm bg-secondary-500/10 hover:bg-secondary-500/20 px-4 py-2 rounded-full flex-1 justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={14} className="mr-2" />
                    Download Resume
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {/* My Certificates Section */}
        {certificateFiles.length > 0 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card p-6">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-accent-500/20 rounded-full mr-3">
                  <Award className="text-accent-500" size={24} />
                </div>
                <h3 className="text-2xl font-bold">My Certificates</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificateFiles.map((certificate, index) => (
                  <motion.div
                    key={certificate.id}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-accent-500 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-accent-500/20 rounded-full">
                        <Award className="text-accent-500" size={16} />
                      </div>
                      <button
                        onClick={() => handleDeleteFile(certificate.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100"
                        title="Delete certificate"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <h4 className="font-bold text-white mb-2 text-sm line-clamp-2">{certificate.name}</h4>
                    <p className="text-gray-400 text-xs mb-4">Uploaded on {certificate.uploadDate}</p>
                    
                    <div className="flex gap-2">
                      <motion.button 
                        onClick={() => handleViewFile(certificate)}
                        className="flex items-center text-accent-400 hover:text-accent-300 transition-colors text-xs bg-accent-500/10 hover:bg-accent-500/20 px-3 py-2 rounded-full flex-1 justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Eye size={12} className="mr-1" />
                        View
                      </motion.button>
                      
                      <motion.button 
                        onClick={() => handleDownloadFile(certificate)}
                        className="flex items-center text-secondary-400 hover:text-secondary-300 transition-colors text-xs bg-secondary-500/10 hover:bg-secondary-500/20 px-3 py-2 rounded-full flex-1 justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Download size={12} className="mr-1" />
                        Download
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="card p-6">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-secondary-500/20 rounded-full mr-3">
                <GraduationCap className="text-secondary-500" size={24} />
              </div>
              <h3 className="text-2xl font-bold">Education</h3>
            </div>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div 
                  key={index}
                  className={`relative pl-6 ${
                    index !== education.length - 1 
                      ? 'pb-6 border-l-2 border-gray-700' 
                      : ''
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-secondary-500"></div>
                  
                  <div>
                    <div className="flex justify-between flex-wrap">
                      <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                      <span className="text-sm text-gray-400 font-mono">{edu.period}</span>
                    </div>
                    
                    <div className="flex items-center text-secondary-400 mb-2">
                      <span>{edu.institution}</span>
                      <span className="mx-2">•</span>
                      <span className="text-gray-400">{edu.location}</span>
                    </div>
                    
                    <p className="text-gray-300">{edu.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Resume;