'use client';

import Link from 'next/link';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroImage from '@/components/HeroImage';
import { trackEvent } from '@/lib/analytics';

const steps = [
  {
    title: 'Understand',
    body: 'Identify the problem and where it is costing the business.',
  },
  {
    title: 'Assess',
    body: 'Determine whether technology can produce a meaningful improvement.',
  },
  {
    title: 'Build',
    body: 'Develop a practical solution designed around the way you work.',
  },
  {
    title: 'Improve',
    body: 'Refine the system as the business learns what works best.',
  },
];

const reasons = [
  '18+ years of software development experience',
  'Full-stack expertise — from user interface to database and infrastructure.',
  'Business-focused problem solving — technology is selected to serve the problem, not the other way around.',
  'Direct collaboration — you work with the person who understands the problem and builds the solution.',
  'Continuity by design — every system is documented, maintainable and prepared for a clear handoff if circumstances change.',
];

export default function HomeClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="hero-rise text-sm font-medium tracking-[0.18em] uppercase text-secondary-foreground/75 mb-4">
                Custom software development · Based in Victoria, BC
              </p>
              <h1 className="hero-rise hero-rise-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.98] mb-5">
                Software that solves business problems
              </h1>
              <p className="hero-rise hero-rise-delay-2 text-lg sm:text-xl text-secondary-foreground/90 leading-relaxed mb-4 text-balance">
                Is your business spending too much time, money or effort working around an inefficient process?
              </p>
              <p className="hero-rise hero-rise-delay-3 text-base text-secondary-foreground/80 max-w-xl mb-6 leading-relaxed">
                Dan Spelt helps businesses identify where technology can improve efficiency, reduce costs and create better ways of working — then designs and builds the software to make it happen.
              </p>
              <p className="hero-rise hero-rise-delay-4 text-lg font-medium text-secondary-foreground mb-8">
                You bring the problem. Dan finds the opportunity.
              </p>
              <div className="hero-rise hero-rise-delay-4 flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="btn-3d text-base px-8 bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => trackEvent('contact_started', { source: 'hero', path: 'contact?intent=problem' })}
                >
                  <Link href="/contact?intent=problem">
                    Talk to Dan
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
              <p className="hero-rise hero-rise-delay-4 mt-5 text-sm text-secondary-foreground/75">
                Based in Victoria, BC · Working remotely with businesses and organizations
              </p>
            </div>

            <HeroImage />
          </div>
        </div>
      </section>

      {/* Start with the problem */}
      <section className="border-b border-border/60 bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-5">
              Start with the problem. Not the software.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-5">
              You don&apos;t need to know what technology you need.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-5">
              Dan starts by understanding how your business works, where time and resources are being lost, and whether software can deliver a worthwhile return.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              If it can, he develops a solution around your business — rather than asking your business to adapt to someone else&apos;s software.
            </p>
          </div>
        </div>
      </section>

      {/* Article teaser */}
      <section className="border-b border-border/60 bg-muted/20">
        <div className="container mx-auto max-w-4xl px-4 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 rounded-2xl border border-border/70 bg-card p-6 sm:p-8 glass">
            <div className="p-3 rounded-xl bg-primary/10 shrink-0 self-start">
              <Lightbulb className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                Thinking about a software solution?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Before deciding what to build, start by understanding the business problem and the potential return.
              </p>
              <Link
                href="/insights"
                className="inline-flex items-center text-base font-medium text-primary hover:text-primary/80 focus-ring rounded"
                onClick={() => trackEvent('article_link_click', { source: 'homepage_teaser' })}
              >
                Read: When a Business Problem Becomes a Software Opportunity
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* From problem to solution */}
      <section className="border-b border-border/60 bg-background">
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
              From problem to solution
            </h2>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map(({ title, body }, index) => (
              <li key={title} className="flex gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-semibold"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Case study spotlight */}
      <section aria-labelledby="community-hive-heading" className="border-b border-border/60 bg-muted/20">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="max-w-3xl mb-8">
            <p className="text-sm font-medium text-primary uppercase tracking-[0.18em] mb-3">
              See what this can look like
            </p>
            <h2 id="community-hive-heading" className="text-3xl sm:text-4xl font-semibold mb-3">
              Community Hive
            </h2>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8 glass">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              A property-management organization was dealing with multiple processes for communication, maintenance, bookings, voting and reporting.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Dan developed a single platform to bring those functions together, reducing administrative work and creating a more efficient way to manage information and communication.
            </p>
            <Button
              asChild
              variant="outline"
              onClick={() => trackEvent('case_study_click', { source: 'homepage', project: 'community-hive' })}
            >
              <Link href="/case-studies/community-hive">
                View the Community Hive Case Study
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Dan? */}
      <section className="border-b border-border/60 bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-8">Why Dan?</h2>
          <ul className="space-y-5">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3 text-lg text-muted-foreground leading-relaxed">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="border-t border-border/60 bg-muted/25">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="rounded-2xl border border-border/80 bg-card glass px-6 py-10 sm:px-10 sm:py-12 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
                  Have a problem worth solving?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The first conversation isn&apos;t about selling you software. It&apos;s about determining whether there&apos;s a better, more efficient and more cost-effective way to do what you&apos;re doing now.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="btn-3d shrink-0 bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => trackEvent('contact_started', { source: 'closing_cta', path: 'contact?intent=problem' })}
              >
                <Link href="/contact?intent=problem">
                  Talk to Dan About Your Problem
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
