// Live apps and tools that are deployed and publicly reachable.
// Rendered by the "Live Apps & Tools" section on /projects and by All Work.
//
// Content integrity rules for this file, matching project-proof.js:
//  - A project earns a link here only when it is ready for customers:
//    deployed and publicly reachable over HTTPS AND its full verification
//    suite (tests, lint, build) passes in its own repo.
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
    summary: 'Shared task coordination for families and approved care workers.',
    description:
      'Built for household managers and approved care workers who coordinate daily tasks for a loved one or client. Families benefit from clearer schedules, proof of completion, and a shared record that reduces miscommunication. The result is less stress for caregivers and more accountability for the people they support.',
    origin:
      'Self-managing care in BC means becoming a household employer — scheduling, assigning, and documenting work — while care workers need predictable shifts and clear instructions. CareBoard closes that gap.',
    cta: 'Visit CareBoard',
  },
  {
    slug: 'community-hive',
    name: 'Community Hive',
    url: 'https://communityhive.ca',
    caseStudyUrl: '/case-studies/community-hive',
    status: 'pilot',
    tags: ['SaaS', 'Multi-tenant'],
    summary: 'One hub for building announcements, requests, documents, and decisions.',
    description:
      'For property managers, strata councils, and residents who are tired of missed announcements and maintenance requests disappearing into email chains. Communities benefit from one shared place for announcements, requests, documents, and decisions. The impact is fewer repeated questions, faster maintenance resolution, and a clear record of what was communicated.',
    origin:
      'A property-management organization was juggling communication, maintenance, bookings, voting, and reporting across disconnected tools. Community Hive gives each building one scoped, audit-friendly system instead.',
    cta: 'Visit live site',
  },
  {
    slug: 'accesslens',
    name: 'AccessLens',
    url: 'https://accesslens.ca',
    caseStudyUrl: '/case-studies/accesslens',
    status: 'live',
    tags: ['Accessibility', 'Civic tech'],
    summary: 'Crowdsourced accessibility scores for places before you visit.',
    description:
      'For people with disabilities, caregivers, and accessibility advocates who need to know whether a restaurant, clinic, park, or transit stop will work for them before they travel. Municipalities and businesses benefit from crowdsourced accessibility data that shows where improvements are needed. The impact is safer, more confident trips and better public awareness of accessibility gaps.',
    origin:
      'People with disabilities often cannot tell whether a place will work for them until they arrive. AccessLens turns lived accessibility knowledge into structured, crowdsourced data.',
    cta: 'Visit live site',
  },
];

/** Only the apps that are actually deployed and reachable. */
export function getLiveApps() {
  return LIVE_APPS.filter((app) => app.status !== 'building' && app.url);
}

export function getUpcomingApps() {
  return LIVE_APPS.filter((app) => app.status === 'building');
}
