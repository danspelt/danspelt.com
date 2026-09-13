import { Suspense } from 'react';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Dan Spelt | Custom Software Developer & Engineer | Victoria BC',
  description:
    'Contact Dan Spelt about custom software development, full-stack engineering roles, accessibility consulting, or a SaaS project. Based in Victoria, BC, Canada — remote worldwide.',
  keywords: [
    'contact Dan Spelt',
    'hire custom software developer Victoria BC',
    'full stack developer for hire',
    'accessibility consultant Victoria BC',
    'software development consultation',
    'remote software engineer Canada',
    'Next.js developer hire',
  ],
  openGraph: {
    title: 'Contact Dan Spelt | Custom Software Developer & Engineer | Victoria BC',
    description:
      'Get in touch with Dan Spelt about custom software, engineering roles, or accessibility consulting. Remote worldwide from Victoria, BC.',
    url: 'https://danspelt.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Dan Spelt | Custom Software Developer & Engineer | Victoria BC',
    description:
      'Contact Dan Spelt about custom software, engineering roles, or accessibility consulting.',
  },
  alternates: {
    canonical: 'https://danspelt.com/contact',
  },
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-4xl px-4 py-16">Loading contact form…</div>}>
      <ContactClient />
    </Suspense>
  );
}
