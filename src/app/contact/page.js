import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact',
  description:
    'Get in touch with Dan Spelt for remote engineering roles, accessibility work, or practical custom software projects.',
  alternates: {
    canonical: 'https://danspelt.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
