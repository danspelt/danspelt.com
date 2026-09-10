import { Suspense } from 'react';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact a Custom Software Developer',
  description:
    'Contact Dan Spelt about custom software development, workflow automation, an accessibility project, a senior engineering role, or a Community Hive demo.',
  alternates: {
    canonical: 'https://danspelt.com/contact',
  },
  openGraph: {
    title: 'Contact Custom Software Developer Dan Spelt',
    description:
      'Discuss a custom software project, accessibility work, senior engineering role, or Community Hive demo.',
    url: 'https://danspelt.com/contact',
    images: ['/og.png'],
  },
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-4xl px-4 py-16">Loading contact form…</div>}>
      <ContactClient />
    </Suspense>
  );
}
