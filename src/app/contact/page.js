<<<<<<< HEAD
'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const ContactCard = ({ icon: Icon, title, content, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onMouseMove={(e) => {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
      if (!window.matchMedia?.("(pointer: fine)").matches) return;

      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty("--tilt-x", `${x.toFixed(0)}px`);
      el.style.setProperty("--tilt-y", `${y.toFixed(0)}px`);

      const px = (x / rect.width) * 2 - 1;
      const py = (y / rect.height) * 2 - 1;

      const max = 8;
      const ry = px * max;
      const rx = -py * max;

      el.style.setProperty("--tilt-rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--tilt-ry", `${ry.toFixed(2)}deg`);
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      el.style.setProperty("--tilt-rx", "0deg");
      el.style.setProperty("--tilt-ry", "0deg");
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget;
      el.style.setProperty("--tilt-rx", "0deg");
      el.style.setProperty("--tilt-ry", "0deg");
    }}
    className="tilt-card flex items-center space-x-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all bg-white dark:bg-gray-800 group"
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

        <div className="max-w-xl mx-auto space-y-6">
          <ContactCard
            icon={Mail}
            title="Email Me"
            content="danspelt24@gmail.com"
            href="mailto:danspelt24@gmail.com"
          />
          <ContactCard
            icon={MapPin}
            title="Based in"
            content="Victoria, BC, Canada"
            href="https://www.google.com/maps/place/Victoria,+BC/@48.4262362,-123.376775,12z"
          />
        </div>
      </div>
    </div>
  );
}
=======
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Github, Linkedin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

  const inputClasses =
    "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Send a Message</h2>
            <p className="text-sm text-muted-foreground mt-1">
              I&apos;ll get back to you as soon as possible.
            </p>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClasses}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClasses}
              required
            />
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows="4"
              className={`${inputClasses} resize-none`}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <>
                Sending...
                <Send className="ml-2 w-4 h-4 animate-pulse" />
              </>
            ) : (
              <>
                Send Message
                <Send className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>

          {submitStatus === 'success' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 dark:text-green-400 text-center text-sm font-medium"
            >
              Thanks for reaching out! I&apos;ll respond to your message soon.
            </motion.p>
          )}
          {submitStatus === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-destructive text-center text-sm font-medium"
            >
              Something went wrong. Please try again or email me directly.
            </motion.p>
          )}
        </CardContent>
      </Card>
    </motion.form>
  );
};

const ContactCard = ({ icon: Icon, title, content, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="block group"
  >
    <Card className="transition-shadow hover:shadow-lg">
      <CardContent className="pt-6 flex items-center gap-4">
        <div className="p-3 rounded-full border border-primary/20 group-hover:border-primary transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground">{content}</p>
        </div>
      </CardContent>
    </Card>
  </a>
);

const SocialLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 border border-border rounded-full hover:shadow-md hover:border-primary transition-all group"
  >
    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" aria-label={label} />
  </a>
);

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <motion.div
        className="text-center mb-12"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Let&apos;s Connect
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you have a project in mind or just want to chat about technology,
          I&apos;m always excited to collaborate and share ideas.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
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
          <div className="flex justify-center gap-3 pt-2">
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
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
>>>>>>> develop
