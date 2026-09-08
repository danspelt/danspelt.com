'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  ExternalLink,
  HeartHandshake,
  Mail,
  Send,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

const COMMUNITY_HIVE_URL = 'https://communityhive.ca/';
const COMMUNITY_HIVE_SCREENSHOT = '/images/community-hive/screenshots/pm-dashboard.png';

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
      trackEvent('inquiry_started', { form_id: 'custom_software_inquiry' });
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
        trackEvent('inquiry_submit_success', {
          form_id: 'custom_software_inquiry',
          lead_source: 'custom_software_page',
        });
      } else {
        setStatus('error');
        trackEvent('inquiry_submit_error', {
          form_id: 'custom_software_inquiry',
          error_category: 'server',
        });
      }
    } catch {
      setStatus('error');
      trackEvent('inquiry_submit_error', {
        form_id: 'custom_software_inquiry',
        error_category: 'network',
      });
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

function Section({ children, className = '' }) {
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <div className="container mx-auto max-w-3xl px-4">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {children}
        </div>
      </div>
    </section>
  );
}

function H2({ children }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-semibold mt-16 mb-6 text-foreground leading-tight">
      {children}
    </h2>
  );
}

function Paragraph({ children }) {
  return <p className="text-lg text-muted-foreground leading-relaxed mb-5">{children}</p>;
}

export default function CustomSoftwareClient() {
  useEffect(() => {
    trackEvent('custom_software_view', { path: '/custom-software' });
  }, []);

  return (
    <article className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24 text-center">
          <p className="text-sm font-medium tracking-[0.18em] uppercase text-secondary-foreground/75 mb-5">
            Custom software development
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.98] mb-6">
            What If the Problems Holding Your Business Back Are Actually Pointing the Way Forward?
          </h1>
          <p className="text-lg sm:text-xl text-secondary-foreground/90 leading-relaxed max-w-2xl mx-auto mb-8">
            The frustrations that have become part of your process may be showing you exactly where software could make the biggest difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="btn-3d bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="#contact">
                Discuss Your Project
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-3d border-secondary-foreground/35 bg-secondary-foreground/10 text-secondary-foreground hover:bg-secondary-foreground/18 hover:text-secondary-foreground">
              <a
                href={COMMUNITY_HIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('custom_software_cta_click', {
                    cta_id: 'community_hive',
                    placement: 'hero',
                  })
                }
              >
                See Community Hive
                <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <Section className="border-b border-border/60">
        <Paragraph>
          Every business has them: the process that takes far too many steps, the information that has to be entered twice, the spreadsheet that has become indispensable even though everyone knows it isn&apos;t really the right tool, the customer follow-up that depends on someone remembering to make it, or the report that always seems to need a little more work before it is useful.
        </Paragraph>
        <Paragraph>
          Most of these problems aren&apos;t serious enough to stop a business. That&apos;s why they can be so difficult to notice. They become part of the way things are done. Someone develops a workaround. Another person learns the workaround. Eventually, the extra steps become part of the process, and nobody questions them anymore.
        </Paragraph>
        <Paragraph>
          But what if those frustrations are telling you something? What if the places where work becomes slow, repetitive, confusing or unnecessarily complicated are actually showing you where your business has the greatest opportunity to improve?
        </Paragraph>
      </Section>

      {/* When the software doesn't quite fit */}
      <Section className="border-b border-border/60 bg-muted/20">
        <H2>When the software doesn&apos;t quite fit</H2>
        <Paragraph>
          Consider what happens when you try to solve one of these problems with software. You find a system that appears to do what you need. Perhaps it does most of it. It may even offer dozens of additional features that sound impressive. So you begin adapting your processes to fit the system.
        </Paragraph>
        <Paragraph>
          At first, that seems reasonable. After all, the software is supposed to make things easier. Then the compromises begin. Information has to be entered in another place. A report needs to be adjusted. A task requires an extra step because the system works differently from the way you do. Someone has to learn another procedure. An update changes something that was working perfectly well before.
        </Paragraph>
        <Paragraph>
          The software has solved part of the problem, but it has also created work of its own. Eventually a question emerges:
        </Paragraph>
        <blockquote className="border-l-4 border-primary pl-6 italic text-xl text-foreground my-8">
          Why are we adapting the way we work to accommodate the software?
        </blockquote>
        <Paragraph>
          For many years, there was a good reason for this compromise. Software designed specifically around the needs of a smaller organization was often too expensive to develop, while off-the-shelf software was affordable precisely because it was designed to serve a broad market. So businesses adapted.
        </Paragraph>
        <Paragraph>
          But that calculation is beginning to change. Modern software development and AI are making it increasingly practical to consider something that many businesses previously dismissed as unrealistic: What if the technology could be designed around the way the business actually works?
        </Paragraph>
        <Paragraph>
          That doesn&apos;t mean every business needs custom software. But it does mean that businesses have more options than they once did, and that makes some of those everyday frustrations worth looking at differently.
        </Paragraph>
      </Section>

      {/* A quick check for your own business */}
      <Section className="border-b border-border/60">
        <H2>A quick check for your own business</H2>
        <Paragraph>
          Before looking for a new system, it may be worth looking more closely at the systems and processes you already have. As you do, consider a few questions.
        </Paragraph>
        <ul className="space-y-4 my-8 list-none">
          {[
            'Where is time being spent moving, entering, re-entering or formatting information — whether in emails, forms, spreadsheets, databases, reports or other systems?',
            'Where does work depend on people remembering, checking, forwarding, following up or asking for information that could potentially move through the process automatically?',
            'Where do employees, customers or managers have to work around the systems you have — using separate spreadsheets, notes, emails or manual procedures to accomplish something the existing software doesn\'t quite handle?',
            'Where are routine processes taking more steps, handoffs or communication than they should, particularly when the same type of work happens repeatedly?',
            'Where is information difficult to track, find, update or turn into something useful, even though the business already has the information?',
            'What could your business do — or do better — if a process were designed around what you actually need rather than what your current software allows?',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-lg text-muted-foreground leading-relaxed">
              <Check className="w-5 h-5 text-primary shrink-0 mt-1" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Paragraph>
          You don&apos;t need to answer yes to all of these. Even a few answers may point to an opportunity worth investigating.
        </Paragraph>
      </Section>

      {/* Seeing the idea in practice */}
      <Section className="border-b border-border/60 bg-muted/20">
        <H2>Seeing the idea in practice</H2>
        <Paragraph>
          This is the kind of thinking behind the work of Dan Spelt, a senior full-stack software developer. The people running a business know their processes, their frustrations and what they would like to do better. Dan brings the software development expertise to turn that understanding into a practical, customized system.
        </Paragraph>
        <Paragraph>
          One example is Community Hive, a software platform developed for property management and community organizations.
        </Paragraph>

        <figure className="my-10 rounded-xl overflow-hidden ring-1 ring-border/60 bg-card shadow-lg">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={COMMUNITY_HIVE_SCREENSHOT}
              alt="Property manager dashboard showing building overview, open issues, announcements, and requests"
              fill
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="px-4 py-3 text-sm text-muted-foreground bg-muted/30 border-t border-border/60">
            Community Hive dashboard: a single place for announcements, maintenance requests, documents, and community communication.
          </figcaption>
        </figure>

        <Paragraph>
          Consider something as ordinary as a maintenance problem. A resident reports an issue. Someone has to receive the information, determine who should deal with it, pass it along, keep track of what happens next, communicate with the resident, and eventually confirm that the problem has been resolved.
        </Paragraph>
        <Paragraph>
          None of those individual tasks is particularly difficult. The difficulty comes from everything that has to happen around the actual repair.
        </Paragraph>
        <Paragraph>
          Community Hive brings those steps into a connected process. A report can become a trackable issue, the appropriate people can be notified, its status can be followed, communication can be recorded, and the resolution can be documented. The point isn&apos;t that property managers need another place to enter information. It is that the process can be designed so that information follows the work instead of people having to continually move the information around themselves.
        </Paragraph>
        <Paragraph>
          The same thinking can apply to other parts of property management. Booking a shared facility, organizing community votes, communicating with residents, documenting issues or maintaining an audit trail can all involve surprisingly large amounts of coordination when handled through disconnected systems. Community Hive is one example of what happens when those processes are considered as a whole rather than as a collection of separate administrative tasks.
        </Paragraph>
        <div className="mt-8">
          <Button asChild variant="outline">
            <a
              href={COMMUNITY_HIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('custom_software_cta_click', {
                  cta_id: 'community_hive',
                  placement: 'case_study',
                })
              }
            >
              Visit Community Hive
              <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </Section>

      {/* And it doesn't have to be property management */}
      <Section className="border-b border-border/60">
        <H2>And it doesn&apos;t have to be property management</H2>
        <Paragraph>
          The underlying question has very little to do with property management. A manufacturer might spend hours transferring information between orders, production schedules and reports. A professional service firm might have people repeatedly preparing information that already exists somewhere else. A retailer might be managing customer follow-ups, inventory information or supplier communication through a mixture of software, spreadsheets and email. A service business might know exactly what needs to happen after a customer makes an inquiry, yet still rely on someone remembering each step.
        </Paragraph>
        <Paragraph>
          In each case, the issue isn&apos;t necessarily a lack of software. It may be that the available software was never designed around that particular way of working.
        </Paragraph>
        <Paragraph>
          And that is where the change becomes interesting. The question is no longer simply, &ldquo;What software can we buy?&rdquo; It can also be, &ldquo;What would make this process work better, and what is now possible that wasn&apos;t practical before?&rdquo;
        </Paragraph>
        <Paragraph>
          Sometimes the answer may be surprisingly simple. And sometimes it may lead to software built specifically around the problem. That possibility is much more accessible than it once was.
        </Paragraph>
      </Section>

      {/* Start with the problem */}
      <Section className="border-b border-border/60 bg-muted/20">
        <H2>Start with the problem</H2>
        <Paragraph>
          The most useful place to begin isn&apos;t with a software package or a list of features. It is with the work itself. What takes too long? What gets repeated? What falls through the cracks? What requires unnecessary coordination? What information is already available but isn&apos;t being used effectively?
        </Paragraph>
        <Paragraph>
          Those aren&apos;t merely annoyances to be tolerated. They may be telling you where the next improvement is hiding.
        </Paragraph>
      </Section>

      {/* A promise about continuity */}
      <Section className="border-b border-border/60 bg-muted/20">
        <div className="flex items-start gap-4 mb-2">
          <HeartHandshake className="w-8 h-8 text-primary shrink-0 mt-1" aria-hidden="true" />
          <H2>A promise: I won&apos;t leave your software behind</H2>
        </div>
        <Paragraph>
          One concern business owners often have when hiring a solo developer is what happens if that developer takes a full-time job and moves on. It is a reasonable worry, and I want to address it directly.
        </Paragraph>
        <Paragraph>
          If you hire me to build custom software, I will not abandon your system. Every project is written with clean, maintainable code, clear documentation, and a handoff plan in mind. If my circumstances change, I will give you advance notice, transition the work responsibly, and make sure you have everything you need to keep your software running.
        </Paragraph>
        <Paragraph>
          You will never be left with unfinished code, unanswered questions, or a system nobody understands.
        </Paragraph>
      </Section>

      {/* Final CTA + form */}
      <section id="contact" className="scroll-mt-24 py-16 sm:py-24 bg-muted/20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              Have a process that has always seemed unnecessarily complicated?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              If you have a task that consumes more time than it should, or an idea you abandoned because you assumed the technology would be too expensive, it may be worth asking the question again. <strong className="text-foreground">What if the problem itself is pointing you toward the solution?</strong>
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-center text-muted-foreground mb-6">
              Prefer email? Reach me directly at{' '}
              <a
                href="mailto:danspelt24@gmail.com"
                className="text-primary underline underline-offset-4 inline-flex items-center gap-1"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                danspelt24@gmail.com
              </a>
              .
            </p>
            <InquiryForm />
          </div>
        </div>
      </section>
    </article>
  );
}
