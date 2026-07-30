'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, Mail, MapPin, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ContactClient() {
  const reduce = useReducedMotion();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const fade = {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45 },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <motion.div className="mb-12 max-w-2xl" {...fade}>
        <h1 className="text-4xl sm:text-5xl font-semibold mb-3">Let&apos;s connect</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Roles, accessibility projects, or a business challenge that needs practical software —
          send a note and I&apos;ll reply as soon as I can.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-10 md:gap-12">
        <motion.aside className="md:col-span-2 space-y-8" {...fade}>
          <div>
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-2">
              Email
            </p>
            <a
              href="mailto:danspelt24@gmail.com"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              danspelt24@gmail.com
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-2">
              Based in
            </p>
            <p className="inline-flex items-center gap-2 text-foreground">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Victoria, BC, Canada
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-3">
              Elsewhere
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/danspelt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/dan-spelt/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Prefer a conversation-style note?{' '}
            <Link href="/ai-chat" className="text-primary hover:underline underline-offset-4">
              Chat with my AI assistant
            </Link>
            .
          </p>
        </motion.aside>

        <motion.form
          onSubmit={handleSubmit}
          className="md:col-span-3 space-y-5"
          {...fade}
          noValidate
        >
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="field-input"
              required
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="field-input"
              required
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="field-input resize-y min-h-[140px]"
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto" size="lg">
            {isSubmitting ? (
              <>
                Sending…
                <Send className="ml-2 w-4 h-4 animate-pulse" aria-hidden="true" />
              </>
            ) : (
              <>
                Send message
                <Send className="ml-2 w-4 h-4" aria-hidden="true" />
              </>
            )}
          </Button>

          <div role="status" aria-live="polite" className="min-h-6">
            {submitStatus === 'success' && (
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Thanks for reaching out — I&apos;ll respond soon.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-sm font-medium text-destructive">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </div>
  );
}
