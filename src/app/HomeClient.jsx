'use client';

import React from 'react';
import IntroVideo from '@/components/IntroVideo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomeClient() {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Dan Spelt
        </h1>
        <h2 className="text-3xl font-medium text-muted-foreground mb-8">
          Full Stack Web Developer
        </h2>
        <div className="flex justify-center gap-4 mb-12">
          <Link href="/contact">
            <Button size="lg">Get in Touch</Button>
          </Link>
          <Link href="/pastprojects">
            <Button variant="outline" size="lg">View Projects</Button>
          </Link>
        </div>
      </section>

      {/* Video Section */}
      <section className="mb-20">
        <IntroVideo />
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto">
        <p className="text-xl leading-relaxed text-muted-foreground">
          Dan Spelt, a full-stack developer with cerebral palsy, demonstrates that physical limitations do not diminish his capabilities in the tech industry. Cerebral palsy may present certain challenges, but Dan has successfully navigated these by leveraging adaptive technologies and a problem-solving mindset.
        </p>
        <p className="text-xl leading-relaxed text-muted-foreground mt-6">
          His expertise in web development, particularly in creating accessible and user-friendly applications, showcases his ability to excel in a field that demands precision and innovation. Dan's commitment to accessibility is also enhanced by his personal experiences, making him a valuable asset in any development team.
        </p>
        <p className="text-xl leading-relaxed text-muted-foreground mt-6">
          Dan's success as a developer highlights the importance of adaptability, continuous learning, and the effective use of technology to overcome challenges, proving that disabilities do not define one's professional capabilities.
        </p>
      </section>
    </div>
  );
}
