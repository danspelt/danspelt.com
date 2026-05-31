'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Code2, Accessibility, ShieldCheck, BarChart3, FileText, Users, Brain } from 'lucide-react';

const metrics = [
  { value: '18+', label: 'Years building real web systems professionally' },
  { value: '20%', label: 'WCAG compliance increase on public-sector platforms' },
  { value: '30%', label: 'Bounce rate reduction via accessibility improvements' },
  { value: 'AI+', label: 'Daily use of AI tools to work faster and smarter' },
];

export default function HomeClient() {
  return (
    <div className="min-h-screen">
      {/* Availability Banner */}
      <div className="bg-primary/5 border-b border-primary/10 py-2 px-4 text-center text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          Open to remote roles &mdash; full-time, part-time, or contract
        </span>
      </div>

      {/* Hero Section */}
      <section className="py-24 sm:py-32 text-center px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <Badge variant="outline" className="text-xs tracking-wide">Full-Stack Developer</Badge>
          <Badge variant="outline" className="text-xs tracking-wide">Accessibility Specialist</Badge>
          <Badge variant="outline" className="text-xs tracking-wide">Remote-Ready</Badge>
          <Badge variant="outline" className="text-xs tracking-wide">AI-Assisted</Badge>
        </div>
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 bg-linear-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent leading-tight">
          Dan Spelt
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
          I build accessible web applications. I work well in teams. I use AI to move faster.
          I get the job done.
        </p>
        <p className="text-base text-muted-foreground max-w-xl mx-auto mb-10">
          18+ years of real experience. I type more slowly than most — I use AI tools to stay
          competitive and deliver quality work on time.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/case-studies">
            <Button size="lg" className="text-base px-8">
              View Case Studies
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="text-base px-8">
              About Me
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" size="lg" className="text-base px-8">
              Work With Me
            </Button>
          </Link>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.value} className="text-center p-6 rounded-xl border bg-card">
              <div className="text-4xl font-extrabold text-primary mb-2">{m.value}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Section */}
      <section className="max-w-4xl mx-auto mb-20 px-4 flex justify-center">
        <Image
          src="/images/dan.jpeg"
          alt="Dan Spelt"
          width={320}
          height={320}
          className="rounded-2xl shadow-lg"
        />
      </section>

      {/* Value Props */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <h2 className="text-2xl font-bold text-center mb-8">What I Bring to a Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Team Player</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I work well with others. I communicate, I collaborate, I follow through on
                commitments, and I don&apos;t need to be the loudest person in the room to contribute.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Productivity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I use AI tools daily to work at a competitive pace. I type more slowly than most
                developers — AI is my equalizer. I am skilled at directing, prompting, and
                verifying AI output to ship quality code.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <Accessibility className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lived Accessibility Expertise</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Born with cerebral palsy, I bring firsthand understanding of assistive technology.
                Inclusive design is not a checklist — it&apos;s something I understand from the inside.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Government & Senior Roles */}
      <section className="max-w-4xl mx-auto px-4 mb-20">
        <div className="rounded-2xl border bg-card p-8 sm:p-12">
          <h2 className="text-2xl font-bold mb-6">Why I Am Worth Hiring</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I am honest about my limitations. I type more slowly because of my cerebral palsy.
            But I use AI tools to compensate, I have 18+ years of deep experience, and I genuinely
            care about doing good work. Most developers understand either accessibility or
            full-stack systems — I understand both. That combination is genuinely rare, especially
            in public-sector, education, and healthcare contexts.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: ShieldCheck, label: 'Security & Privacy Standards' },
              { icon: FileText, label: 'Documentation & Audit Trails' },
              { icon: Users, label: 'Cross-functional Collaboration' },
              { icon: BarChart3, label: 'Metrics-driven Delivery' },
              { icon: Accessibility, label: 'WCAG / ADA Compliance' },
              { icon: Code2, label: 'Long-term Maintainability' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                {label}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/case-studies">
              <Button>
                See Case Studies
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline">More About Me</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
