// Live apps and tools that are deployed and publicly reachable.
// Rendered by the "Live Apps & Tools" section on /projects and by All Work.
//
// Content integrity rules for this file, matching project-proof.js:
//  - `url` must be a domain that is actually serving the app over HTTPS.
//  - Describe what the app does. Never repeat an app's own marketing statistics here.
//  - `status` must be one of: 'live', 'pilot', 'building'.

/** One approved status vocabulary for apps and tools. */
export const APP_STATUS = {
  live: { label: 'Live', description: 'Deployed and publicly reachable.' },
  pilot: { label: 'Pilot', description: 'A working product being refined for broader use.' },
  building: { label: 'Building', description: 'In development, not yet deployed.' },
};

/** Public portfolio catalog. Only list apps that are employer-ready demos. */
export const LIVE_APPS = [
  {
    slug: 'careboard',
    name: 'CareBoard',
    url: 'https://care.danspelt.com/',
    githubUrl: 'https://github.com/danspelt/careboard',
    caseStudyUrl: null,
    status: 'live',
    tags: ['Care coordination', 'PWA'],
    description:
      'Private household care coordination with manager and worker dashboards, task scheduling and recurrence, proof photos, role-scoped access, reports, audit history, and PWA support.',
    cta: 'Visit CareBoard',
  },
  {
    slug: 'community-hive',
    name: 'Community Hive',
    url: 'https://communityhive.ca',
    caseStudyUrl: '/case-studies/community-hive',
    status: 'pilot',
    tags: ['SaaS', 'Multi-tenant'],
    description:
      'Communication platform for strata and HOA communities. Announcements, maintenance requests, documents, events, and polls in one record, with role-scoped dashboards for managers, councils, and residents.',
    cta: 'Visit live site',
  },
  {
    slug: 'accesslens',
    name: 'AccessLens',
    url: 'https://accesslens.ca',
    caseStudyUrl: '/case-studies/accesslens',
    status: 'live',
    tags: ['Accessibility', 'Civic tech'],
    description:
      'Accessibility intelligence for cities. Places are scored across ten criteria and shown as colour-coded markers on an OpenStreetMap map, so a place can be assessed before travelling to it.',
    cta: 'Visit live site',
  },
  {
    slug: 'clarity-audit',
    name: 'Clarity Audit',
    url: 'https://audit.danspelt.com',
    caseStudyUrl: null,
    status: 'live',
    tags: ['Accessibility', 'WCAG'],
    description:
      'Automated first-pass accessibility audit. Runs WCAG-oriented axe-core checks and returns affected elements, failure details, and impact-based priorities instead of raw scanner output.',
    cta: 'Run a scan',
  },
  {
    slug: 'auditspark',
    name: 'AuditSpark',
    url: 'https://auditspark.danspelt.com',
    caseStudyUrl: null,
    status: 'live',
    tags: ['AI', 'Conversion'],
    description:
      'AI website audit focused on conversion rather than compliance. Reviews a site against conversion practices and returns a score, prioritised fixes, headline and call-to-action suggestions, and SEO quick wins.',
    cta: 'Get an audit',
  },
  {
    slug: 'christian-web-help',
    name: 'Christian Web Help',
    url: 'https://faith.danspelt.com',
    caseStudyUrl: null,
    status: 'live',
    tags: ['Services', 'Non-profit'],
    description:
      'Website help for churches, ministries, and faith-led teams. Accessible sites, simpler donation pages, event registration, and ongoing support with plain-language pricing.',
    cta: 'Get website help',
  },
];

/**
 * Parked apps — not employer-ready. Domains may still be live, but do not render
 * these on the public portfolio until the demo is impressive enough to keep.
 * Move an entry back into LIVE_APPS when that bar is met.
 */
export const UNLISTED_APPS = [
  {
    slug: 'ai-receptionist',
    name: 'AI Receptionist',
    url: 'https://receptionist.danspelt.com',
    caseStudyUrl: null,
    status: 'live',
    tags: ['AI', 'Lead capture'],
    description:
      'An AI receptionist for local businesses. Answers visitor questions around the clock, captures leads, and passes appointment requests through to a dashboard and email.',
    cta: 'See the demo',
  },
  {
    slug: 'ai-resume-fixer',
    name: 'AI ResumeFixer',
    url: 'https://resume.danspelt.com',
    caseStudyUrl: null,
    status: 'live',
    tags: ['AI', 'Careers'],
    description:
      'Resume optimisation with AI review. Parses an uploaded PDF, DOCX, or plain text resume, suggests stronger achievement-focused bullet points, matches keywords to a target job description, and exports to DOCX.',
    cta: 'Fix a resume',
  },
  {
    slug: 'ai-content-writer',
    name: 'AI Content Writer',
    url: null,
    caseStudyUrl: null,
    status: 'building',
    tags: ['AI', 'Content'],
    description:
      'Draft blog posts, social captions, and product descriptions from a defined brand voice.',
    cta: null,
  },
  {
    slug: 'ai-quote-generator',
    name: 'AI Quote Generator',
    url: null,
    caseStudyUrl: null,
    status: 'building',
    tags: ['AI', 'Operations'],
    description: 'Produce professional quotes and proposals, then deliver them by email.',
    cta: null,
  },
];

/** Only the apps that are actually deployed and reachable. */
export function getLiveApps() {
  return LIVE_APPS.filter((app) => app.status !== 'building' && app.url);
}

export function getUpcomingApps() {
  return LIVE_APPS.filter((app) => app.status === 'building');
}
