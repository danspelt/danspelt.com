import FaqClient from './FaqClient';

export const metadata = {
  title: 'FAQ',
  description:
    'Answers about workplace accommodations, cerebral palsy, collaboration, and hiring Dan Spelt for remote engineering roles.',
  alternates: {
    canonical: 'https://danspelt.com/faq',
  },
};

export default function FaqPage() {
  return <FaqClient />;
}
