import { Suspense } from 'react';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact',
  description:
    'Get in touch with Dan Spelt about a senior engineering role or a Community Hive demo.',
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
