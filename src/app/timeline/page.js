import TimelineClient from './TimelineClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Timeline',
  description:
    'Dan Spelt’s professional journey — AccessLens, Community Hive, Neil Squire Society, Youneeq AI, CanAssist, and earlier roles.',
  alternates: {
    canonical: 'https://danspelt.com/timeline',
  },
};

export default function TimelinePage() {
  return <TimelineClient />;
}
