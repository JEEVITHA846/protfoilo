import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import PageTransition from '../components/shared/PageTransition';
import SectionTitle from '../components/shared/SectionTitle';
import { Send, CheckCircle, AlertCircle, Mail, Loader } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // EmailJS configuration with your actual credentials
  const EMAILJS_SERVICE_ID = 'service_gzlnad8';
  const EMAILJS_TEMPLATE_ID = 'template_5tsjfak';
  const EMAILJS_PUBLIC_KEY = '5yF9ifXb8BCDidbM_';

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'jeevithas012@gmail.com', // Your Gmail address
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('Email sent successfully:', response);
      
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  return (
    <PageTransition variant="slide-up">
      <div className="container-custom section-padding">
        <SectionTitle 
          title="Get In Touch" 
          subtitle="Feel free to contact me anytime!"
        />
        
        {/* Contact Information */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center p-4 bg-primary-500/10 rounded-full mb-4">
            <Mail className="text-primary-400" size={32} />
          </div>
          <p className="text-gray-300 mb-4">
            Ready to start your next project? Drop me a line!
          </p>
          <a 
            href="mailto:jeevithas012@gmail.com"
            className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors text-lg font-medium"
          >
            <Mail className="mr-2" size={20} />
            jeevithas012@gmail.com
          </a>
        </motion.div>
        
        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="card p-8 md:p-12">
              <h3 className="text-3xl font-bold mb-8 text-center">Send me a message</h3>
              
              {submitStatus === 'success' && (
                <motion.div
                  className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle className="text-green-400 mr-3" size={20} />
                  <span className="text-green-400">Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="text-red-400 mr-3" size={20} />
                  <span className="text-red-400">There was an error sending your message. Please try again.</span>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-3 text-lg">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 bg-gray-700 border rounded-xl focus:outline-none transition-colors text-white text-lg ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-400' 
                          : 'border-gray-600 focus:border-primary-400'
                      }`}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <motion.p
                        className="text-red-400 text-sm mt-2"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-3 text-lg">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 bg-gray-700 border rounded-xl focus:outline-none transition-colors text-white text-lg ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-400' 
                          : 'border-gray-600 focus:border-primary-400'
                      }`}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <motion.p
                        className="text-red-400 text-sm mt-2"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-3 text-lg">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-6 py-4 bg-gray-700 border rounded-xl focus:outline-none transition-colors text-white text-lg resize-none ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-gray-600 focus:border-primary-400'
                    }`}
                    placeholder="Tell me about your project..."
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <motion.p
                      className="text-red-400 text-sm mt-2"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>
                
                <div className="text-center">
                  <motion.button
                    type="submit"
                    className={`inline-flex items-center justify-center py-4 px-8 rounded-xl font-medium transition-all duration-300 text-lg ${
                      isSubmitting || submitStatus === 'success'
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/25'
                    } text-white min-w-[200px]`}
                    whileHover={!isSubmitting && submitStatus !== 'success' ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting && submitStatus !== 'success' ? { scale: 0.98 } : {}}
                    disabled={isSubmitting || submitStatus === 'success'}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin mr-3" size={20} />
                        <span>Sending...</span>
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircle size={20} className="mr-3" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-3" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Additional Contact Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center p-3 bg-gray-800/50 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-gray-300 text-sm">
              Usually responds within 24 hours
            </span>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Contact;