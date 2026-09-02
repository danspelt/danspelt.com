'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  ExternalLink,
  Mail,
  Send,
  X,
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
          Every business has them.
        </Paragraph>
        <Paragraph>
          The process that takes far too many steps. The information that has to be entered twice. The spreadsheet that has become indispensable even though everyone knows it isn&apos;t really the right tool. The customer follow-up that depends on someone remembering to make it. The report that always seems to need a little more work before it is useful.
        </Paragraph>
        <Paragraph>
          Most of these problems aren&apos;t serious enough to stop a business. That&apos;s why they can be so difficult to notice. They become part of the way things are done. Someone develops a workaround. Another person learns the workaround. Eventually, the extra steps become part of the process, and nobody questions them anymore.
        </Paragraph>
        <Paragraph>
          But what if those frustrations are telling you something? What if the places where work becomes slow, repetitive, confusing or unnecessarily complicated are actually showing you where your business has the greatest opportunity to improve?
        </Paragraph>
      </Section>

      {/* The off-the-shelf compromise */}
      <Section className="border-b border-border/60 bg-muted/20">
        <H2>Consider what happens when you try to solve one of these problems with software</H2>
        <Paragraph>
          You find a system that appears to do what you need. Perhaps it does most of it. It may even offer dozens of additional features that sound impressive. So you begin adapting your processes to fit the system.
        </Paragraph>
        <Paragraph>
          At first, that seems reasonable. After all, the software is supposed to make things easier. Then the compromises begin.
        </Paragraph>
        <Paragraph>
          Information has to be entered in another place. A report needs to be adjusted. A task requires an extra step because the system works differently from the way you do. Someone has to learn another procedure. An update changes something that was working perfectly well before.
        </Paragraph>
        <Paragraph>
          The software has solved part of the problem, but it has also created work of its own. And eventually a question emerges:
        </Paragraph>
        <blockquote className="border-l-4 border-primary pl-6 italic text-xl text-foreground my-8">
          Why are we adapting the way we work to accommodate the software?
        </blockquote>
        <Paragraph>
          For many years, there was a good reason for this compromise. Software designed specifically around the needs of a smaller organization was often too expensive to develop, while off-the-shelf software was affordable precisely because it was designed to serve a broad market. So businesses adapted.
        </Paragraph>
        <Paragraph>
          But that calculation is beginning to change. Modern software development and AI are making it increasingly practical to consider something that many businesses previously dismissed as unrealistic:
        </Paragraph>
        <blockquote className="border-l-4 border-primary pl-6 italic text-xl text-foreground my-8">
          What if the technology could be designed around the way the business actually works?
        </blockquote>
        <Paragraph>
          That question is where things get interesting. Because once you stop looking for software that almost fits, you can start looking at the problems themselves — and asking whether those problems might actually contain the blueprint for a better solution.
        </Paragraph>
      </Section>

      {/* Stop accepting the process */}
      <Section className="border-b border-border/60">
        <H2>What happens when you stop accepting the process as it is?</H2>
        <Paragraph>
          Imagine taking one of those processes that has always seemed unnecessarily complicated and looking at it without the assumption that it has to remain that way.
        </Paragraph>
        <Paragraph>
          Maybe information is being entered more than once because different people need it in different places. Maybe employees spend part of every day checking whether someone has followed up on something. Maybe customers have to repeat information because the person helping them can&apos;t easily see what has already happened. Perhaps a manager needs to know the status of several things but has to piece it together from emails, spreadsheets, notes and conversations.
        </Paragraph>
        <Paragraph>
          The usual response is to find a better way to manage the process. Sometimes that means buying another software package. Sometimes it means creating a more elaborate spreadsheet. Sometimes it means developing another procedure and asking employees to follow it.
        </Paragraph>
        <Paragraph>
          But there is another possibility. Instead of asking how to manage the process more efficiently, ask whether the process itself needs to exist in its current form.
        </Paragraph>
        <ul className="space-y-3 my-8 list-none">
          {[
            'If information is being entered twice, perhaps it only needs to be entered once.',
            'If someone has to remember to follow up, perhaps the system can remember.',
            'If information is scattered across several places, perhaps it can be brought together.',
            'If a task requires ten steps simply because that is how the existing system works, perhaps it can become three.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-lg text-muted-foreground leading-relaxed">
              <Check className="w-5 h-5 text-primary shrink-0 mt-1" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Paragraph>
          The objective isn&apos;t to remove people from the process. It is to make better use of the time and judgment that people bring to it. People should be spending their time doing the things that require people. The rest deserves to be questioned.
        </Paragraph>
        <Paragraph>
          That way of thinking changes the conversation around technology. Instead of starting with a catalogue of available features and trying to find somewhere to use them, you start with the work itself. Where is the friction? Where does information get lost? Where does duplication occur? Where do errors happen? Where are people spending time on tasks that add little value?
        </Paragraph>
        <Paragraph>
          And perhaps most importantly, what would this process look like if you were free to design it around what you actually need?
        </Paragraph>
        <Paragraph>
          That is the question behind a software project called Community Hive.
        </Paragraph>
      </Section>

      {/* Community Hive example */}
      <Section className="border-b border-border/60 bg-muted/20">
        <H2>An example: solving the problem instead of managing it</H2>
        <Paragraph>
          Community Hive was developed to address a collection of communication and administrative problems within residential communities. But the reason it is worth examining here isn&apos;t simply what the platform does for property management. It is an example of a different approach to software development: <strong className="text-foreground">start with the problem, understand how people actually work, then build the technology around that reality.</strong>
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
          Consider a maintenance issue in a residential community. A resident notices a problem and reports it — perhaps a leaking pipe, a broken light, a damaged door or water collecting where it shouldn&apos;t. The report reaches the property manager, who has to determine what needs to happen next. Someone needs to be contacted, the work needs to be followed up, and the resident may want to know what is happening.
        </Paragraph>
        <Paragraph>
          None of this is particularly complicated. But it can become complicated very quickly when there are hundreds of residents, dozens of requests and many other responsibilities competing for attention. A message arrives by email. Another resident calls. A contractor responds to someone else. A property manager makes a note to follow up later. The resident sends another message asking for an update.
        </Paragraph>
        <Paragraph>
          The work itself may take an hour. Managing everything around the work can take considerably longer. This is where the thinking behind Community Hive becomes useful.
        </Paragraph>
        <Paragraph>
          Instead of asking how to give the property manager a better way to keep track of all those emails, messages and notes, the process can be reconsidered from the beginning.
        </Paragraph>
        <ul className="space-y-3 my-8 list-none">
          {[
            'What if the resident reports the issue once, and that report automatically becomes part of a trackable process?',
            'What if the appropriate person is notified without someone having to forward the message?',
            'What if the status of the issue is visible to the people who need to know?',
            'What if follow-up doesn\'t depend entirely on someone\'s memory?',
            'What if, when the problem is resolved, the completion is recorded as part of the property\'s history?',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-lg text-muted-foreground leading-relaxed">
              <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Paragraph>
          Suddenly, the objective isn&apos;t to give the property manager another place to manage information. It is to remove some of the managing. That distinction is easy to miss. We often think of software as a better way of organizing work that already exists. But sometimes the bigger opportunity is to ask whether the software can take responsibility for some of the coordination itself.
        </Paragraph>
        <Paragraph>
          The property manager still makes the decisions that require experience and judgment. The contractor still does the repair. The resident still identifies the problem. The software simply takes more responsibility for the things that don&apos;t need to occupy someone&apos;s attention.
        </Paragraph>
        <Paragraph>
          And once that possibility is recognized in one process, it becomes natural to look at others. A community facility needs to be booked. Why should that require someone to manually coordinate availability, requests and confirmations? A council needs to collect a vote. Why should someone have to compile responses and maintain the record manually? Residents need information. Why should every communication have to be sent individually when only certain people need to receive it? An issue needs to be documented. Why should the record depend on someone remembering where to put it?
        </Paragraph>
        <Paragraph>
          These aren&apos;t revolutionary problems. What is potentially revolutionary is being able to design a practical, affordable system around them rather than simply finding another way to work around them.
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

      {/* The same question applies anywhere */}
      <Section className="border-b border-border/60">
        <H2>The same question applies almost anywhere</H2>
        <Paragraph>
          The details change from one business to another, but the underlying problems are surprisingly familiar. A landscaping company may spend too much time moving information between estimates, schedules, crews and invoices. A professional practice may have client information scattered between emails, forms and spreadsheets. A nonprofit may spend hours tracking inquiries, follow-ups and services. A small manufacturer may repeatedly enter the same information into different systems simply because that&apos;s how its software has been designed.
        </Paragraph>
        <Paragraph>
          The industries are different. The frustrations are not. And that is why the first question shouldn&apos;t necessarily be, &ldquo;What software do we need?&rdquo; It might be:
        </Paragraph>
        <blockquote className="border-l-4 border-primary pl-6 italic text-xl text-foreground my-8">
          Where are we making work harder than it needs to be?
        </blockquote>
        <Paragraph>
          That question can reveal things that a software search often doesn&apos;t. Perhaps employees are spending an hour every afternoon doing something that could be reduced to ten minutes. Perhaps customers are repeatedly providing information the business already has. Perhaps a manager is spending valuable time checking whether tasks have been completed rather than dealing with the issues that actually require their attention. Perhaps a process works reasonably well when the business is small but becomes increasingly difficult as the organization grows.
        </Paragraph>
        <Paragraph>
          Or perhaps there is an idea that would improve the business considerably, but it has always been dismissed because building the technology seemed too expensive. These are not necessarily signs that a business needs a large technology project. They are reasons to ask a better question.
        </Paragraph>
      </Section>

      {/* What has changed */}
      <Section className="border-b border-border/60 bg-muted/20">
        <H2>What has changed?</H2>
        <Paragraph>
          For a long time, the cost of developing customized software meant that most businesses had little choice but to work within the systems available to them. That is still true in many cases. Off-the-shelf software remains the right answer for countless businesses, particularly when an existing product does the job well.
        </Paragraph>
        <Paragraph>
          But the boundary is shifting. Modern development tools and AI can reduce some of the time and cost involved in designing, building and modifying software. That doesn&apos;t eliminate the need for good developers, careful planning or an understanding of the business. In fact, understanding the business may be more important than ever.
        </Paragraph>
        <Paragraph>
          The difference is that customization is becoming a more realistic conversation. A business can potentially say: <em>Here is the problem. Here is how we currently deal with it. Here is where time is being wasted. Here is what we wish happened automatically.</em>
        </Paragraph>
        <Paragraph>
          And instead of immediately asking which existing software product comes closest, someone can ask: &ldquo;What would it take to build this the way you actually need it?&rdquo;
        </Paragraph>
        <Paragraph>
          That doesn&apos;t mean the answer will always be custom software. Sometimes the answer will be an existing product. Sometimes a process change will solve the problem. Sometimes a simple automation will be enough. But occasionally, the problem is important enough — and the existing solutions are poor enough — that building something specifically for the business makes sense. The important change is that it may now be affordable enough to find out.
        </Paragraph>
      </Section>

      {/* What have you learned to live with */}
      <Section className="border-b border-border/60">
        <H2>What have you learned to live with?</H2>
        <Paragraph>
          Most businesses can answer that question. There is usually something that everyone knows could work better, but it has become part of the landscape. Perhaps it is an inefficient administrative process, a communication problem, repetitive data entry, a reporting task, or simply a system that requires people to do things in ways that don&apos;t make much sense anymore.
        </Paragraph>
        <Paragraph>
          The difficulty has often been knowing what to do about it. The problem may not be large enough to justify a major technology project, but it may be costing the business far more than anyone has stopped to calculate. And if the available software doesn&apos;t fit the way the business operates, buying another system may simply create another set of compromises.
        </Paragraph>
        <Paragraph>
          That is the opportunity worth exploring. Start with the frustration. Understand what is actually happening. Then ask whether there is a better way.
        </Paragraph>
        <Paragraph>
          Sometimes the answer will be surprisingly simple. Sometimes an existing software product will already provide it. And sometimes the right answer may be a customized solution designed specifically around the business.
        </Paragraph>
        <Paragraph>
          That is the approach behind the work of Dan Spelt. Rather than beginning with a software product and looking for businesses that can use it, the goal is to begin with the business itself: how it operates, where time is being lost, where information gets stuck, what employees have to do repeatedly, and what the organization would like to accomplish but has never found a practical way to implement.
        </Paragraph>
        <Paragraph>
          Community Hive is one example of what can come from that approach. It began with a particular set of problems in property management and became an opportunity to rethink how communication, administration and follow-up could work.
        </Paragraph>
        <Paragraph>
          The next project may have nothing to do with property management. It may be a process in a completely different industry that has been frustrating someone for years. And that is really the point. The software is not the starting point. The problem is.
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
