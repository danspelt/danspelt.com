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
      'Built for household managers and approved care workers who coordinate daily tasks for a loved one or client. Families benefit from clearer schedules, proof of completion, and a shared record that reduces miscommunication. The result is less stress for caregivers and more accountability for the people they support.',
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
      'For property managers, strata councils, and residents who are tired of missed announcements and maintenance requests disappearing into email chains. Communities benefit from one shared place for announcements, requests, documents, and decisions. The impact is fewer repeated questions, faster maintenance resolution, and a clear record of what was communicated.',
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
      'For people with disabilities, caregivers, and accessibility advocates who need to know whether a restaurant, clinic, park, or transit stop will work for them before they travel. Municipalities and businesses benefit from crowdsourced accessibility data that shows where improvements are needed. The impact is safer, more confident trips and better public awareness of accessibility gaps.',
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
      'For website owners, developers, and accessibility teams who need a quick, actionable first look at accessibility barriers. Small businesses and non-profits benefit from prioritized fixes instead of overwhelming scanner reports. The impact is faster remediation and a site that works for more visitors, including people using screen readers or keyboards.',
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
      'For business owners, marketers, and web teams who want to turn more visitors into leads or customers. Small businesses benefit from practical fixes to headlines, calls to action, and page structure without hiring a full conversion agency. The impact is clearer messaging, better user flow, and more revenue from the same traffic.',
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
      'For churches, ministries, and faith-led teams that need a website visitors can actually use, including people with disabilities or older members. Congregations and visitors benefit from clear event information, simple donation flows, and accessible content. The impact is stronger community connection and fewer people left out because a site is hard to navigate.',
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
