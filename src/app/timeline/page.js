import TimelineClient from './TimelineClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Full-Stack Developer Experience Timeline',
  description:
    'Dan Spelt’s professional journey — AccessLens, Community Hive, Neil Squire Society, Youneeq AI, CanAssist, and earlier roles.',
  alternates: {
    canonical: 'https://danspelt.com/timeline',
  },
  openGraph: {
    title: 'Full-Stack Developer Experience Timeline | Dan Spelt',
    description:
      'More than 18 years of software development work across accessible technology, web applications, analytics, and custom platforms.',
    url: 'https://danspelt.com/timeline',
    images: ['/og.png'],
  },
};

export default function TimelinePage() {
  return <TimelineClient />;
}
