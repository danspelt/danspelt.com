import FaqClient from './FaqClient';

export const metadata = {
  title: 'Full-Stack Developer & Accessibility FAQ',
  description:
    'Answers about workplace accommodations, cerebral palsy, collaboration, and hiring Dan Spelt for remote engineering roles.',
  alternates: {
    canonical: 'https://danspelt.com/faq',
  },
  openGraph: {
    title: 'Full-Stack Developer & Accessibility FAQ | Dan Spelt',
    description:
      'Answers about Dan Spelt’s development strengths, accessibility experience, workplace accommodations, and remote collaboration.',
    url: 'https://danspelt.com/faq',
    images: ['/og.png'],
  },
};

export default function FaqPage() {
  return <FaqClient />;
}
