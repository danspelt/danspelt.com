'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Github, Linkedin } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        console.error('Server error:', data.error);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        Send a Message
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        I'll get back to you as soon as possible.
      </p>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-transparent"
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-transparent"
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows="4"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none bg-transparent"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <span>Sending...</span>
            <Send className="animate-pulse" />
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send />
          </>
        )}
      </button>
      
      {submitStatus === 'success' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-600 dark:text-green-400 text-center font-medium"
        >
          Thanks for reaching out! I'll respond to your message soon.
        </motion.div>
      )}
      {submitStatus === 'error' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-600 dark:text-red-400 text-center font-medium"
        >
          Oops! Something went wrong. Please try again or email me directly.
        </motion.div>
      )}
    </motion.form>
  );
};

const ContactCard = ({ icon: Icon, title, content, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all bg-white dark:bg-gray-800 group"
    variants={fadeIn}
  >
    <div className="p-3 rounded-full border border-blue-200 dark:border-blue-700 bg-transparent group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors">
      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    </div>
    <div>
      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{content}</p>
    </div>
  </motion.a>
);

const SocialLink = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 border border-gray-200 dark:border-gray-700 rounded-full hover:shadow-lg transition-all bg-white dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400 group"
    variants={fadeIn}
    whileHover={{ scale: 1.1 }}
  >
    <Icon className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" aria-label={label} />
  </motion.a>
);

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div
          className="text-center space-y-4"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Whether you have a project in mind or just want to chat about technology,
            I'm always excited to collaborate and share ideas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ContactCard
              icon={Mail}
              title="Email Me"
              content="dan@danspelt.com"
              href="mailto:dan@danspelt.com"
            />
            <ContactCard
              icon={MapPin}
              title="Based in"
              content="Victoria, BC, Canada"
              href="https://www.google.com/maps/place/Victoria,+BC/@48.4262362,-123.376775,12z"
            />
            <motion.div
              className="flex justify-center space-x-4"
              variants={fadeIn}
            >
              <SocialLink
                href="https://github.com/danspelt"
                icon={Github}
                label="GitHub"
              />
              <SocialLink
                href="https://linkedin.com/in/danspelt"
                icon={Linkedin}
                label="LinkedIn"
              />
            </motion.div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
