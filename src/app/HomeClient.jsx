'use client';

import React from 'react';
import IntroVideo from '@/components/IntroVideo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Code2, Accessibility, Lightbulb } from 'lucide-react';

export default function HomeClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 sm:py-32 text-center px-4">
        <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
          Full Stack Developer &middot; Victoria, BC
        </p>
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 bg-linear-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent leading-tight">
          Dan Spelt
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          18+ years building scalable, accessible web applications.
          Turning complex problems into elegant solutions.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/contact">
            <Button size="lg" className="text-base px-8">
              Get in Touch
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="outline" size="lg" className="text-base px-8">
              View Projects
            </Button>
          </Link>
        </div>
      </section>

      {/* Video Section */}
      <section className="max-w-4xl mx-auto mb-20 px-4">
        <IntroVideo />
      </section>

      {/* Value Props */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Full Stack Expertise</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From React and Next.js on the frontend to Node.js, MongoDB, and Docker on the backend &mdash; I deliver end-to-end solutions that scale.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <Accessibility className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Accessibility First</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                As a developer with cerebral palsy, I bring firsthand understanding of accessibility needs. Every project I build prioritizes inclusive design.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Problem Solver</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From multi-tenant SaaS platforms to AI-enhanced workflows, I thrive on turning complex challenges into clean, maintainable architectures.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Summary */}
      <section className="max-w-3xl mx-auto px-4 mb-20 text-center">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-lg leading-relaxed text-muted-foreground mb-6">
          I&apos;m a seasoned full-stack developer who has successfully navigated the tech industry
          by leveraging adaptive technologies and a relentless problem-solving mindset. My personal
          experience with accessibility drives me to build applications that are genuinely inclusive.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          My commitment to continuous learning, combined with deep expertise in modern web
          technologies, makes me a valuable contributor to any development team. I believe
          that great software should be accessible to everyone.
        </p>
        <div className="mt-8">
          <Link href="/about">
            <Button variant="outline">
              Read More About Me
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
