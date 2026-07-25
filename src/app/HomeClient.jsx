'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Code2, Accessibility, ShieldCheck, BarChart3, FileText, Users, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectCards from '@/components/ProjectCards';

const metrics = [
  { value: '18+', label: 'Years building real web systems' },
  { value: '20%', label: 'WCAG compliance lift on public platforms' },
  { value: '30%', label: 'Bounce rate drop via accessibility work' },
  { value: 'AI+', label: 'Daily AI tools to ship quality faster' },
];

const strengths = [
  {
    icon: Users,
    title: 'Team player',
    body: 'I communicate clearly, collaborate well, and follow through — without needing to be the loudest voice in the room.',
  },
  {
    icon: Brain,
    title: 'AI-assisted delivery',
    body: 'I type more slowly than most. AI is my equalizer — I direct, prompt, and verify so quality ships on time.',
  },
  {
    icon: Accessibility,
    title: 'Lived accessibility',
    body: 'Born with cerebral palsy, I understand assistive technology from the inside — not only from a checklist.',
  },
];

export default function HomeClient() {
  const reduce = useReducedMotion();

  const fade = {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5 },
  };

  return (
    <div>
      {/* Full-bleed hero */}
      <section className="relative min-h-[min(92vh,880px)] flex items-end overflow-hidden">
        <div className="absolute inset-0 hero-image-in">
          <Image
            src="/images/dan.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_22%]"
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-[hsl(200_28%_6%/0.92)] via-[hsl(200_28%_8%/0.55)] to-[hsl(174_40%_20%/0.25)]"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 w-full px-4 pb-16 pt-28 sm:pb-20 sm:pt-32">
          <div className="container mx-auto max-w-4xl">
            <p className="hero-rise text-sm font-medium tracking-[0.18em] uppercase text-white/75 mb-4">
              Victoria, BC · Remote worldwide
            </p>
            <h1 className="hero-rise hero-rise-delay-1 font-display text-5xl sm:text-7xl lg:text-8xl font-semibold text-white leading-[0.95] mb-5">
              Dan Spelt
            </h1>
            <p className="hero-rise hero-rise-delay-2 text-xl sm:text-2xl text-white/90 max-w-2xl leading-relaxed mb-3 text-balance">
              Accessible web systems. Honest delivery. AI when it helps.
            </p>
            <p className="hero-rise hero-rise-delay-3 text-base text-white/70 max-w-xl mb-8 leading-relaxed">
              18+ years building real platforms. Open to remote roles and practical custom software for businesses that need something that actually fits.
            </p>
            <div className="hero-rise hero-rise-delay-4 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="text-base px-8 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/case-studies">
                  View case studies
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-8 border-white/35 bg-white/10 text-white hover:bg-white/18 hover:text-white"
              >
                <Link href="/contact">Work with me</Link>
              </Button>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/65">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" aria-hidden="true" />
              Open to remote roles — full-time, part-time, or contract
            </p>
          </div>

        </div>
      </section>

      {/* Proof metrics — one job */}
      <section className="border-b border-border/70 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-5xl px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m) => (
              <div key={m.value} className="text-center md:text-left">
                <div className="font-display text-4xl font-semibold text-primary mb-1">
                  {m.value}
                </div>
                <div className="text-sm text-muted-foreground leading-snug">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I bring */}
      <section className="container mx-auto max-w-5xl px-4 py-20">
        <motion.div {...fade} className="mb-10 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
            What I bring to a team
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Rare combination: full-stack systems experience and lived accessibility understanding.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {strengths.map(({ icon: Icon, title, body }) => (
            <motion.div key={title} {...fade}>
              <Icon className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Services */}
      <ProjectCards />

      {/* Why hire */}
      <section className="container mx-auto max-w-4xl px-4 pb-24">
        <motion.div
          {...fade}
          className="rounded-2xl border border-border/80 bg-card/70 px-6 py-10 sm:px-10 sm:py-12"
        >
          <h2 className="text-3xl font-semibold mb-4">Why I am worth hiring</h2>
          <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
            I am honest about my limitations. Cerebral palsy means I type more slowly —
            and I use AI tools to compensate. I have deep experience, I care about quality,
            and I understand both accessibility and full-stack systems. That combination is rare,
            especially in public-sector, education, and healthcare work.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              { icon: ShieldCheck, label: 'Security & privacy standards' },
              { icon: FileText, label: 'Documentation & audit trails' },
              { icon: Users, label: 'Cross-functional collaboration' },
              { icon: BarChart3, label: 'Metrics-driven delivery' },
              { icon: Accessibility, label: 'WCAG / ADA compliance' },
              { icon: Code2, label: 'Long-term maintainability' },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link href="/case-studies">
                See case studies
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/custom-software">Business challenges</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/about">More about me</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
