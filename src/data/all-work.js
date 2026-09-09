import { LIVE_APPS } from '@/data/projects';
import { PROJECT_PROOF } from '@/data/project-proof';

export const ALL_WORK = {
  apps: LIVE_APPS.map((app) => ({
    title: app.name,
    description: app.description,
    href: app.url ?? '/projects',
    external: Boolean(app.url),
    status: app.status,
    tags: app.tags,
    caseStudyUrl: app.caseStudyUrl,
  })),
  caseStudies: PROJECT_PROOF.map((project) => ({
    title: project.title,
    description: project.tagline,
    href: project.caseStudyUrl,
    status: project.status,
    role: project.role,
  })),
  professional: [
    {
      title: 'Accessibility engineering',
      description: 'Accessibility implementation, testing, documentation, and lived experience.',
      href: '/accessibility',
    },
    {
      title: 'Skills and tools',
      description: 'Languages, frameworks, platforms, and engineering capabilities.',
      href: '/skillstools',
    },
    {
      title: 'Career timeline',
      description: 'Education, roles, project milestones, and professional history.',
      href: '/timeline',
    },
    {
      title: 'About Dan',
      description: 'Background, working style, accessibility perspective, and availability.',
      href: '/about',
    },
  ],
};

export const WORK_COUNTS = {
  apps: ALL_WORK.apps.length,
  caseStudies: ALL_WORK.caseStudies.length,
  professional: ALL_WORK.professional.length,
};
