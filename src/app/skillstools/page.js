import SkillsClient from './SkillsClient';

export const metadata = {
  title: 'Skills & Tools',
  description:
    'Frontend, backend, databases, DevOps, and accessibility skills — the stack Dan Spelt uses to ship maintainable web systems.',
  alternates: {
    canonical: 'https://danspelt.com/skillstools',
  },
};

export default function SkillsToolsPage() {
  return <SkillsClient />;
}
