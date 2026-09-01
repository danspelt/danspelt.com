import { LIVE_APPS } from '@/data/projects';
import { PROJECT_PROOF } from '@/data/project-proof';

const repositoryBase = 'https://github.com/danspelt/danspelt.com/blob/main';

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
  writing: [
    {
      title: 'AI Website Audit Tool — Developer Guide',
      description: 'Product scope, architecture, accessibility-audit flow, repository boundaries, and deployment guidance.',
      href: `${repositoryBase}/docs/developer-guides/01-ai-website-audit-developer-guide.md`,
    },
    {
      title: 'AI Quote and Proposal Generator — Developer Guide',
      description: 'A technical plan for generating, delivering, and managing business quotes and proposals.',
      href: `${repositoryBase}/docs/developer-guides/02-ai-quote-generator-developer-guide.md`,
    },
    {
      title: 'AI Resume and Cover Letter Fixer — Developer Guide',
      description: 'A product and implementation guide for resume parsing, job matching, AI review, and document export.',
      href: `${repositoryBase}/docs/developer-guides/03-ai-resume-fixer-developer-guide.md`,
    },
    {
      title: 'Local Business Content Generator — Developer Guide',
      description: 'A technical product guide for creating brand-aware posts, service copy, email promotions, and blog drafts.',
      href: `${repositoryBase}/docs/developer-guides/04-local-business-content-generator-developer-guide.md`,
    },
    {
      title: 'AI Rental Concierge — Developer Guide',
      description: 'Architecture and product guidance for a property FAQ assistant and host dashboard.',
      href: `${repositoryBase}/docs/developer-guides/05-airbnb-rental-ai-concierge-developer-guide.md`,
    },
    {
      title: 'Dan Income CRM — Developer Guide',
      description: 'A technical guide for a React-based income and opportunity pipeline dashboard.',
      href: `${repositoryBase}/docs/developer-guides/06-dan-income-crm-developer-guide.md`,
    },
    {
      title: 'Hosting and Deployment Guide',
      description: 'Deployment architecture and operating guidance for the independent danspelt.com applications.',
      href: `${repositoryBase}/docs/hosting-and-deployment.md`,
    },
  ],
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
  writing: ALL_WORK.writing.length,
  professional: ALL_WORK.professional.length,
};
