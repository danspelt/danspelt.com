'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ClipboardList,
  FolderSearch,
  MessagesSquare,
  Lightbulb,
  MessageCircle,
  Search,
  Hammer,
  Clock,
  Users,
  Wrench,
  FileText,
  HeartHandshake,
  Store,
  Check,
  X,
  Send,
  ExternalLink,
  Mail,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

const COMMUNITY_HIVE_URL = 'http://communityhive.ca/';

/* ── Content ────────────────────────────────────────────────────────── */

const problemCards = [
  {
    icon: ClipboardList,
    title: 'Repetitive Administration',
    description:
      'Hours spent every week copying information between spreadsheets, emails, and documents that could flow automatically.',
  },
  {
    icon: FolderSearch,
    title: 'Hard-to-Track Information',
    description:
      'Important records scattered across inboxes, folders, and sticky notes — hard to find when you actually need them.',
  },
  {
    icon: MessagesSquare,
    title: 'Customer Communication Gaps',
    description:
      'Messages that slip through the cracks, missed follow-ups, and customers left wondering what happens next.',
  },
  {
    icon: Lightbulb,
    title: 'New Service Ideas',
    description:
      'An idea for a better way to serve your customers — you just haven\u2019t had a way to build it.',
  },
];

const processSteps = [
  {
    icon: MessageCircle,
    step: '1',
    title: 'Explain the Challenge',
    description:
      'Tell me about the problem in your own words. No technical knowledge needed — if you can describe what frustrates you, that\u2019s enough.',
  },
  {
    icon: Search,
    step: '2',
    title: 'Explore the Opportunity',
    description:
      'Together we look at how your process works today and where practical software could genuinely save time or reduce friction.',
  },
  {
    icon: Hammer,
    step: '3',
    title: 'Build and Improve',
    description:
      'I build a working solution, you try it in the real world, and we refine it together until it fits the way you actually work.',
  },
];

const discoveryQuestions = [
  'What takes too much time?',
  'What frustrates staff or customers?',
  'What process could work better?',
  'What idea have you wanted to pursue but did not know how to build?',
];

const caseStudyOutcomes = [
  {
    icon: Clock,
    title: 'Reduced Admin Work',
    description: 'Notices, requests, and updates handled in one place instead of scattered email chains and paper.',
  },
  {
    icon: MessagesSquare,
    title: 'Better Communication',
    description: 'Property managers, councils, and residents share one clear, structured channel.',
  },
  {
    icon: Wrench,
    title: 'Earlier Maintenance Reporting',
    description: 'Residents report issues the moment they notice them, before small problems become expensive ones.',
  },
  {
    icon: FileText,
    title: 'Clearer Records',
    description: 'Decisions, documents, and history stay organized and easy to find for everyone who needs them.',
  },
  {
    icon: HeartHandshake,
    title: 'Stronger Engagement',
    description: 'Communities that communicate well see more participation and fewer misunderstandings.',
  },
  {
    icon: Store,
    title: 'Local Partnership Revenue',
    description: 'Built-in local business partnerships create new value for communities and neighbourhood businesses.',
  },
];

const offTheShelfPoints = [
  'Built for average workflows — not yours',
  'Packed with features you\u2019ll never use',
  'Limited flexibility when your needs change',
];

const customPoints = [
  'Designed around your process, from day one',
  'Focused on your goals and the people who use it',
  'Grows and adapts with your future plans',
];

/* ── Animation helpers ──────────────────────────────────────────────── */

const useFade = () => {
  const reduce = useReducedMotion();
  return {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.5 },
  };
};

/* ── Reusable pieces ────────────────────────────────────────────────── */

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card className="h-full">
    <CardContent className="pt-6 space-y-3">
      <div className="w-11 h-11 rounded-lg border border-primary/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

const ProcessStep = ({ icon: Icon, step, title, description }) => (
  <Card className="h-full">
    <CardContent className="pt-6 space-y-3">
      <div className="flex items-center gap-3">
        <span
          className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold"
          aria-hidden="true"
        >
          {step}
        </span>
        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

const OutcomeCard = ({ icon: Icon, title, description }) => (
  <Card className="h-full">
    <CardContent className="pt-6 space-y-2">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

const ComparisonColumn = ({ title, points, positive }) => (
  <Card className={positive ? 'border-primary/40' : undefined}>
    <CardContent className="pt-6 space-y-4">
      <h3 className="font-semibold text-xl">{title}</h3>
      <ul className="space-y-3">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
            {positive ? (
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <X className="w-5 h-5 text-muted-foreground/60 shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

/* ── Contact form ───────────────────────────────────────────────────── */

const initialForm = {
  name: '',
  email: '',
  business: '',
  challenge: '',
  contactMethod: 'email',
  website: '', // honeypot
};

const InquiryForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const startedRef = useRef(false);
  const statusRef = useRef(null);

  const handleChange = (field) => (e) => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent('contact_form_started');
    }
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) {
      next.name = 'Please enter your name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address, e.g. you@example.com.';
    }
    if (form.challenge.trim().length < 10) {
      next.challenge = 'Please describe what you would like to improve in a sentence or two.';
    }
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      statusRef.current?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch('/api/custom-software-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus('success');
        setForm(initialForm);
        startedRef.current = false;
        trackEvent('contact_form_submitted');
      } else {
        setStatus('error');
        trackEvent('contact_form_error');
      }
    } catch {
      setStatus('error');
      trackEvent('contact_form_error');
    }
    statusRef.current?.focus();
  };

  const inputClasses =
    'w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all';
  const labelClasses = 'block font-medium mb-1.5';
  const errorClasses = 'text-sm text-destructive mt-1.5';

  if (status === 'success') {
    return (
      <Card>
        <CardContent className="pt-6 text-center space-y-3" ref={statusRef} tabIndex={-1}>
          <h3 className="text-2xl font-bold">Thank you — message received!</h3>
          <p className="text-muted-foreground">
            I&apos;ll read your message and get back to you within a couple of business days.
            There&apos;s no obligation — this is just the start of a conversation.
          </p>
          <Button variant="outline" onClick={() => setStatus('idle')}>
            Send another message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Card>
        <CardContent className="pt-6 space-y-5">
          <div>
            <label htmlFor="cs-name" className={labelClasses}>
              Name <span aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              id="cs-name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange('name')}
              className={inputClasses}
              aria-invalid={errors.name ? 'true' : undefined}
              aria-describedby={errors.name ? 'cs-name-error' : undefined}
              disabled={status === 'submitting'}
              required
            />
            {errors.name && (
              <p id="cs-name-error" className={errorClasses}>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cs-email" className={labelClasses}>
              Email <span aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              id="cs-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange('email')}
              className={inputClasses}
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? 'cs-email-error' : undefined}
              disabled={status === 'submitting'}
              required
            />
            {errors.email && (
              <p id="cs-email-error" className={errorClasses}>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cs-business" className={labelClasses}>
              Business or organization <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <input
              id="cs-business"
              type="text"
              autoComplete="organization"
              value={form.business}
              onChange={handleChange('business')}
              className={inputClasses}
              disabled={status === 'submitting'}
            />
          </div>

          <div>
            <label htmlFor="cs-challenge" className={labelClasses}>
              What would you like to improve? <span aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <textarea
              id="cs-challenge"
              rows="5"
              value={form.challenge}
              onChange={handleChange('challenge')}
              className={`${inputClasses} resize-none`}
              aria-invalid={errors.challenge ? 'true' : undefined}
              aria-describedby={errors.challenge ? 'cs-challenge-error' : 'cs-challenge-hint'}
              disabled={status === 'submitting'}
              required
            />
            <p id="cs-challenge-hint" className="text-sm text-muted-foreground mt-1.5">
              In your own words — no technical description, budget, or specification needed.
            </p>
            {errors.challenge && (
              <p id="cs-challenge-error" className={errorClasses}>
                {errors.challenge}
              </p>
            )}
          </div>

          <fieldset>
            <legend className={labelClasses}>Preferred way to connect</legend>
            <div className="flex flex-wrap gap-4">
              {[
                { value: 'email', label: 'Email' },
                { value: 'phone', label: 'Phone' },
                { value: 'video', label: 'Video call' },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contactMethod"
                    value={option.value}
                    checked={form.contactMethod === option.value}
                    onChange={handleChange('contactMethod')}
                    className="w-4 h-4 accent-[hsl(var(--primary))] focus-visible:outline-2 focus-visible:outline-offset-2"
                    disabled={status === 'submitting'}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Honeypot — hidden from real users and screen readers */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="cs-website">Leave this field empty</label>
            <input
              id="cs-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={handleChange('website')}
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending...' : 'Start a Conversation'}
            <Send className="ml-2 w-4 h-4" aria-hidden="true" />
          </Button>

          <div ref={statusRef} tabIndex={-1} aria-live="polite">
            {status === 'error' && (
              <p className="text-destructive text-center text-sm font-medium">
                Something went wrong sending your message. Please try again, or email me directly
                at{' '}
                <a href="mailto:danspelt24@gmail.com" className="underline">
                  danspelt24@gmail.com
                </a>
                .
              </p>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Your message is sent directly to my business email and is never shared with anyone
            else or used for marketing.
          </p>
        </CardContent>
      </Card>
    </form>
  );
};

/* ── Page ───────────────────────────────────────────────────────────── */

export default function CustomSoftwareClient() {
  const fade = useFade();

  useEffect(() => {
    trackEvent('custom_software_page_view');
  }, []);

  const scrollToContact = () => {
    trackEvent('custom_software_primary_cta_click');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('cs-name')?.focus({ preventScroll: true });
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 space-y-24">
      {/* ── Hero ── */}
      <motion.section aria-labelledby="hero-heading" className="text-center pt-8" {...fade}>
        <h1
          id="hero-heading"
          className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent leading-tight"
        >
          Have a Business Challenge You Wish Software Could Solve?
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          Repetitive tasks, scattered information, communication problems, or an idea you&apos;ve
          never had a way to build — many everyday business frustrations can be solved with
          practical, purpose-built software. You bring the challenge; I&apos;ll help you explore
          the solution.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" onClick={scrollToContact}>
            Let&apos;s Talk About Your Idea
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href={COMMUNITY_HIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('community_hive_case_study_click')}
            >
              See Community Hive
              <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </motion.section>

      {/* ── Problem recognition ── */}
      <motion.section aria-labelledby="problems-heading" {...fade}>
        <h2 id="problems-heading" className="text-3xl font-bold text-center mb-4">
          Every Business Has Processes That Could Be Easier
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
          If any of these sound familiar, there&apos;s a good chance software could help.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {problemCards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </motion.section>

      {/* ── How it works ── */}
      <motion.section aria-labelledby="process-heading" {...fade}>
        <h2 id="process-heading" className="text-3xl font-bold text-center mb-4">
          Turn Your Ideas Into Practical Solutions
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
          A simple, collaborative process. You never need technical knowledge — describing the
          problem is your only job.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {processSteps.map((step) => (
            <ProcessStep key={step.step} {...step} />
          ))}
        </div>
      </motion.section>

      {/* ── Discovery questions ── */}
      <motion.section aria-labelledby="questions-heading" {...fade}>
        <h2 id="questions-heading" className="text-3xl font-bold text-center mb-10">
          Start With a Simple Question
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 list-none">
          {discoveryQuestions.map((question) => (
            <li key={question}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <p className="text-xl md:text-2xl font-semibold leading-snug text-center">
                    {question}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Community Hive case study ── */}
      <motion.section aria-labelledby="case-study-heading" {...fade}>
        <h2 id="case-study-heading" className="text-3xl font-bold text-center mb-4">
          Real Solutions for Real Business Problems
        </h2>
        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-10 leading-relaxed">
          <strong className="text-foreground">Community Hive</strong> is a communication and
          management platform I built for property managers and residential communities. It
          replaced scattered email chains, paper notices, and social media groups with one
          organized, easy-to-use system — and it started exactly the way your project would:
          with a real business challenge.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {caseStudyOutcomes.map((outcome) => (
            <OutcomeCard key={outcome.title} {...outcome} />
          ))}
        </div>
        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <a
              href={COMMUNITY_HIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('community_hive_case_study_click')}
            >
              Visit Community Hive
              <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </motion.section>

      {/* ── Custom vs off-the-shelf ── */}
      <motion.section aria-labelledby="comparison-heading" {...fade}>
        <h2 id="comparison-heading" className="text-3xl font-bold text-center mb-4">
          Your Business Is Unique. Your Software Should Be Too.
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
          Off-the-shelf tools can be a fine starting point — but when they force you to work
          their way, a custom solution pays for itself.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ComparisonColumn title="Off-the-Shelf Software" points={offTheShelfPoints} />
          <ComparisonColumn title="A Custom Solution" points={customPoints} positive />
        </div>
      </motion.section>

      {/* ── Final CTA + contact form ── */}
      <motion.section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24" {...fade}>
        <h2 id="contact-heading" className="text-3xl font-bold text-center mb-4">
          You Bring the Challenge. Together, We Can Explore the Solution.
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
          No budget, specification, or technical description required — just tell me what
          you&apos;d like to improve. Prefer email? Reach me directly at{' '}
          <a
            href="mailto:danspelt24@gmail.com"
            className="text-primary underline underline-offset-4 inline-flex items-center gap-1"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            danspelt24@gmail.com
          </a>
          .
        </p>
        <div className="max-w-2xl mx-auto">
          <InquiryForm />
        </div>
      </motion.section>
    </div>
  );
}
