'use client';

import React from 'react';
import IntroVideo from '@/components/IntroVideo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Code2, Accessibility, ShieldCheck, BarChart3, FileText, Users } from 'lucide-react';

const metrics = [
  { value: '30%', label: 'Bounce rate reduction via accessibility improvements' },
  { value: '20%', label: 'WCAG compliance increase on public-sector platforms' },
  { value: '15%', label: 'Sales increase from screen reader compatibility' },
  { value: '18+', label: 'Years delivering secure, scalable web systems' },
];

export default function HomeClient() {
  return (
    <div className="min-h-screen">
      {/* Availability Banner */}
      <div className="bg-primary/5 border-b border-primary/10 py-2 px-4 text-center text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          Open to remote senior roles and government contracts
        </span>
      </div>

      {/* Hero Section */}
      <section className="py-24 sm:py-32 text-center px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <Badge variant="outline" className="text-xs tracking-wide">Senior Full-Stack Engineer</Badge>
          <Badge variant="outline" className="text-xs tracking-wide">Accessibility & Compliance Specialist</Badge>
          <Badge variant="outline" className="text-xs tracking-wide">Remote-Ready</Badge>
        </div>
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 bg-linear-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent leading-tight">
          Dan Spelt
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
          Accessibility-first systems. WCAG compliance. Performance-optimized web platforms.
        </p>
        <p className="text-base text-muted-foreground max-w-xl mx-auto mb-10">
          18+ years building secure, scalable applications in public-sector and accessibility-focused environments.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/case-studies">
            <Button size="lg" className="text-base px-8">
              View Case Studies
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/accessibility">
            <Button variant="outline" size="lg" className="text-base px-8">
              Accessibility & Gov Work
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

      {/* Video Section */}
      <section className="max-w-4xl mx-auto mb-20 px-4">
        <IntroVideo />
      </section>

      {/* Value Props */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <h2 className="text-2xl font-bold text-center mb-8">What I Bring to Senior Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Architecture Leadership</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                End-to-end system design across Next.js, React, Node.js, MongoDB, and Docker. I own architectural decisions and deliver maintainable, scalable codebases.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Compliance & Standards</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                WCAG 2.0/2.1 implementation, ADA compliance, screen reader engineering, and documentation practices aligned with public-sector requirements.
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
                As a developer with cerebral palsy, I bring firsthand understanding of assistive technology. Inclusive design is not a checklist — it&apos;s my standard.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Government & Senior Roles */}
      <section className="max-w-4xl mx-auto px-4 mb-20">
        <div className="rounded-2xl border bg-card p-8 sm:p-12">
          <h2 className="text-2xl font-bold mb-6">The Intersection Most Engineers Miss</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Most senior engineers don&apos;t deeply understand accessibility. Most accessibility engineers don&apos;t deeply understand full-stack systems architecture. I sit at that intersection — and it&apos;s especially valuable in government, education, healthcare, and enterprise SaaS environments.
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
            <Link href="/accessibility">
              <Button variant="outline">Government & Accessibility Work</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
