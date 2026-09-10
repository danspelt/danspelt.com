import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Full-Stack Software Development Projects',
  description:
    'Explore full-stack software projects by Dan Spelt, including AccessLens accessibility mapping and the Community Hive multi-tenant communication platform.',
  alternates: {
    canonical: 'https://danspelt.com/projects',
  },
  openGraph: {
    title: 'Full-Stack Software Development Projects | Dan Spelt',
    description:
      'Accessible web applications, multi-tenant business software, dashboards, and other full-stack projects.',
    url: 'https://danspelt.com/projects',
    images: ['/og.png'],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
