import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Projects',
  description:
    'Deep dives into AccessLens and Community Hive — accessibility mapping and multi-tenant community communication platforms built by Dan Spelt.',
  alternates: {
    canonical: 'https://danspelt.com/projects',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
