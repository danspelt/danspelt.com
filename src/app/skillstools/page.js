import SkillsClient from './SkillsClient';

export const metadata = {
  title: 'Full-Stack Development Skills & Technology',
  description:
    'Dan Spelt’s full-stack development skills across Next.js, React, Node.js, TypeScript, databases, DevOps, web accessibility, and maintainable software delivery.',
  alternates: {
    canonical: 'https://danspelt.com/skillstools',
  },
  openGraph: {
    title: 'Full-Stack Development Skills & Technology | Dan Spelt',
    description:
      'Next.js, React, Node.js, TypeScript, databases, DevOps, web accessibility, and maintainable software delivery.',
    url: 'https://danspelt.com/skillstools',
    images: ['/og.png'],
  },
};

export default function SkillsToolsPage() {
  return <SkillsClient />;
}
