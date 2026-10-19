// Single source of truth for project proof shown on the homepage, the project
// explorer, and the AI assistant. The long-form case studies remain the
// canonical detailed pages and are linked from here.
//
// Content integrity rules for this file:
//  - `status` must use one word from PROJECT_STATUS.
//  - Every entry in `outcomes` must have public `evidence` or be phrased as a
//    design intent rather than a measured result.
//  - Never add a technology that the live system does not use.

/** One approved status vocabulary, used everywhere on the site. */
export const PROJECT_STATUS = {
  pilot: { label: 'Pilot', description: 'A working product being refined for broader use.' },
  active: { label: 'Active', description: 'A working product in ongoing development.' },
  shipped: { label: 'Shipped', description: 'Delivered and in use.' },
};

/** Shared fallback until role-specific screenshots are supplied. */
export const COMMUNITY_HIVE_FALLBACK_IMAGE = '/images/community-hive/community-hive-og.png';

/** New screenshot set for the Community Hive slideshow. */
export const COMMUNITY_HIVE_SCREENSHOTS = [
  {
    id: 'pm',
    src: '/images/community-hive/screenshots/pm-dashboard.png',
    alt: 'Property manager dashboard with building overview, properties, announcements, and open tickets',
    caption: 'Property manager view',
  },
  {
    id: 'council',
    src: '/images/community-hive/screenshots/resident-council-dashboard.png',
    alt: 'Resident with council management access viewing quick actions and dashboard metrics',
    caption: 'Resident with council access',
  },
  {
    id: 'resident',
    src: '/images/community-hive/screenshots/resident-member-dashboard.png',
    alt: 'Resident dashboard showing announcements, requests, events, and quick actions',
    caption: 'Resident member view',
  },
  {
    id: 'messages',
    src: '/images/community-hive/screenshots/resident-messages.png',
    alt: 'Resident messaging interface with property manager, front desk, and council contacts',
    caption: 'Resident messaging',
  },
  {
    id: 'security-cameras',
    src: '/images/community-hive/screenshots/security-cameras.png',
    alt: 'Security camera feeds with live monitoring for entrance, pool, parking, and playground',
    caption: 'Live security cameras',
  },
  {
    id: 'business-promotions',
    src: '/images/community-hive/screenshots/business-promotions.png',
    alt: 'Business promotions page with local offers and resident discounts',
    caption: 'Local business promotions',
  },
];

export const COMMUNITY_HIVE_DEMO_URL = 'https://communityhive.ca';

/**
 * Role-based product proof for the homepage spotlight.
 * `image` may be null; the spotlight falls back to the shared product image.
 */
export const COMMUNITY_HIVE_ROLES = [
  {
    id: 'property-manager',
    label: 'Property Manager',
    problem:
      'The same questions arrive by email all week, and maintenance concerns come in through whatever channel the resident happened to use.',
    onScreen:
      'A building overview with open issues, recent announcements, and the requests that still need a response.',
    result: 'Designed to reduce repetitive email and keep a clearer record of what was asked and done.',
    image: '/images/community-hive/screenshots/pm-dashboard.png',
    imageAlt:
      'Property manager dashboard showing a building overview with open maintenance requests and recent announcements',
  },
  {
    id: 'council',
    label: 'Council',
    problem:
      'Decisions get made across email threads and meetings, so it is hard to reconstruct what was decided and why.',
    onScreen:
      'Governing documents, meeting minutes, polls, and a history of decisions with the access each member is permitted.',
    result: 'Designed to support decisions with a traceable record instead of scattered inboxes.',
    image: '/images/community-hive/screenshots/resident-council-dashboard.png',
    imageAlt:
      'Council view showing governing documents, meeting minutes, and a poll with decision history',
  },
  {
    id: 'resident',
    label: 'Resident',
    problem:
      'Notices are easy to miss, and there is no clear place to check whether a reported problem is being handled.',
    onScreen:
      'Current notices, the status of your own requests, community updates, and the documents you are allowed to read.',
    result: 'One calm place to know what is happening in your building.',
    image: '/images/community-hive/screenshots/resident-member-dashboard.png',
    imageAlt:
      'Resident view showing current notices, the status of a submitted maintenance request, and community updates',
  },
];

export const PROJECT_PROOF = [
  {
    slug: 'community-hive',
    cardEvidence: 'Six captured product screens; tenant and role separation documented in the repository.',
    title: 'Community Hive',
    tagline: 'A shared communication and operations hub for property managers, strata councils, and residents, designed to keep announcements, requests, and decisions together instead of scattered through email chains.',
    status: 'pilot',
    audience: ['hire', 'business', 'product'],
    role: 'Founder and sole developer',
    problem:
      'Property managers and community leaders coordinate buildings through email chains, paper notices, spreadsheets, and social media groups. Announcements are missed, maintenance concerns arrive through inconsistent channels, and there is no reliable record of what was communicated or decided.',
    approach:
      'One multi-tenant platform where each building has scoped data and each role sees only the information and actions it is permitted. Announcements, maintenance requests, documents, events, and polls share a single audit-friendly record.',
    outcomes: [
      {
        label: 'Announcements, requests, documents, and events live in one scoped system per building',
        evidence: 'Verifiable in the live product at communityhive.ca',
      },
      {
        label: 'Role-based dashboards for property managers, council presidents, council members, and residents',
        evidence: 'Verifiable in the live product at communityhive.ca',
      },
      {
        label: 'Designed so residents can report maintenance concerns early, before they become larger repairs',
      },
      {
        label: 'Designed to produce a documented record of notices, requests, and decisions',
      },
    ],
    proof: [
      {
        label: 'Security and authorization',
        detail:
          'Session-based admin protection, route middleware, centralized council-role guards, tenant-scoped access, environment validation, and audit helpers are documented in the project production-readiness report.',
      },
      {
        label: 'Testing',
        detail:
          'The repository includes Jest unit and integration coverage, a separate E2E configuration, smoke tests, and documented daily and release verification workflows.',
      },
      {
        label: 'Operational evidence',
        detail:
          'Docker configurations cover development and production, while migration, billing, legal-review, QA, and production-environment checklists document the path from development to operation.',
      },
      {
        label: 'Product evidence',
        detail:
          'The case study includes captured property-manager, council, resident, messaging, security-camera, and business-promotion screens from the product.',
      },
    ],
    decisions: [
      {
        choice: 'Tenant-scoped queries with role-based permission middleware',
        reason:
          'A single shared database keeps operating costs low enough for small buildings to afford the product.',
        tradeoff:
          'Every query has to be scoped correctly, so isolation is enforced in middleware rather than by separate databases.',
      },
      {
        choice: 'Self-hosted on Coolify with Docker and separate staging and production environments',
        reason: 'Predictable cost and full control over Canadian data handling.',
        tradeoff: 'I own the infrastructure and upgrade work that a managed platform would absorb.',
      },
      {
        choice: 'AI used for tone polishing and digest summaries, not for decisions',
        reason: 'It removes the writing burden from volunteers without putting judgement in a model.',
        tradeoff: 'Automated summaries still need a human to publish them.',
      },
      {
        choice: 'Started with property management before adjacent markets',
        reason: 'It is the market with the clearest, most repeated pain and a real willingness to pay.',
        tradeoff:
          'Some vocabulary is strata-specific and needs generalizing for co-ops, churches, and sports organizations.',
      },
    ],
    stack: [
      'Next.js (App Router)',
      'React',
      'Tailwind CSS',
      'shadcn/ui',
      'Node.js API Routes',
      'MongoDB',
      'Role-based access control',
      'JWT authentication',
      'Docker',
      'Coolify',
    ],
    liveUrl: COMMUNITY_HIVE_DEMO_URL,
    caseStudyUrl: '/case-studies/community-hive',
    image: COMMUNITY_HIVE_FALLBACK_IMAGE,
    imageAlt: 'Community Hive dashboard showing announcements and maintenance activity for a building',
  },
  {
    slug: 'careboard',
    cardEvidence: 'Public product and sign-in screens; role isolation and employer exports documented in the repository.',
    evidenceNote: 'Active development. The public screens below were captured on October 4, 2026. Dashboard capabilities are described from repository evidence, not a production audit. Manager action queues, notification submission status and retry, handover acknowledgment and follow-up ownership, month-end evidence checklists, and an attendance correction are in progress and are not presented here as deployed.',
    impactNote: 'No verified time savings, adoption figures, or user testimonials are available for this case study. Clearer coordination and less administrative work remain intended benefits.',
    screenshots: [
      { src: '/images/careboard/public-landing.png', alt: 'CareBoard public homepage with a clearly labelled example task board showing done, in-progress, and open tasks', caption: 'Public product homepage. The example board is part of the real site; it is illustrative, not a capture of a private household dashboard.' },
      { src: '/images/careboard/sign-in.png', alt: 'CareBoard sign-in page with empty email and password fields and approved care-team access guidance', caption: 'Public sign-in screen. Manager-approved access is explained before sign-in. No private care data or credentials are shown.' },
    ],
    title: 'CareBoard',
    tagline:
      'A private care-coordination platform for household employers and approved care workers. Managers assign and track work; workers see only their own tasks; schedules, proof photos, handoffs, and an audit log keep everyone accountable.',
    status: 'active',
    audience: ['hire', 'product'],
    role: 'Founder and sole developer',
    problem:
      'A household manager needs to know who is working, what needs doing, what was completed, and what the next shift needs to know. When schedules, task notes, and employer records are spread across messages and paper, reconstructing the day becomes another job. Care workers need clear assignments and a way to share outstanding work without exposing other workers’ private records.',
    approach:
      'A private household task board with strict role separation. A manager creates, assigns, and completes work and maintains employer records; each worker sees only their own tasks and open work they can claim. Shifts follow a two-week A/B cycle, and proof photos, end-of-shift handoffs, safety reports, and an append-only audit log make accountability routine rather than extra effort.',
    outcomes: [
      {
        label: 'Manager and worker dashboards covering task assignment, claiming, completion, and proof photos',
        evidence: 'Manager and worker workflows documented in the repository README; private dashboards are not shown in this case study.',
      },
      {
        label: 'Two-week rotating schedules with day-off requests and shift-coverage acceptance',
        evidence: 'Documented in the repository README',
      },
      {
        label: 'Timesheet, payroll, and monthly CSV exports designed to support household employer record keeping',
        evidence: 'Requirements matrix documented in docs/csil-compliance.md',
      },
      {
        label: 'Care-team wellbeing signals and safety incident reporting grounded in published WHO and OECD research',
        evidence: 'Design rationale documented in docs/care-worker-needs.md',
      },
      {
        label: 'Designed so workers see only their own work and data, never other workers\'',
      },
    ],
    proof: [
      {
        label: 'Security and role isolation',
        detail:
          'Workers cannot see other workers\' profiles, tasks, reports, or audit data. Disabled workers are blocked on every request, so an existing session cannot retain access. Photos are served only through authenticated, ownership-checked routes.',
      },
      {
        label: 'Privacy by default',
        detail:
          'Profile and task proof photos are retained for a fixed 90-day period and are never exposed as static files.',
      },
      {
        label: 'Testing',
        detail:
          'The repository defines a required verification suite of Node.js tests, lint, and a production build, run before any change is considered complete.',
      },
      {
        label: 'Known constraint',
        detail:
          'Runs on SQLite in a single container, sized for one household per deployment. Payroll CSVs provide hours, rate, and gross amounts — deductions and net pay remain payroll-software scope, documented in the CSIL readiness matrix.',
      },
    ],
    decisions: [
      {
        choice: 'SQLite via better-sqlite3 with Drizzle ORM migrations',
        reason:
          'A self-contained container keeps a small household deployment simple and cheap to run.',
        tradeoff:
          'Single-node storage — moving to multi-instance hosting would require a networked database.',
      },
      {
        choice: 'Wellbeing signals derived only from schedule and task data',
        reason:
          'Flags long shift runs, short turnarounds, and heavy loads without inferring health or fatigue.',
        tradeoff:
          'The signals are workload indicators rather than predictions, and the product copy says so.',
      },
      {
        choice: 'Append-only audit log for task history',
        reason:
          'Accountability needs a record that cannot be quietly rewritten after the fact.',
        tradeoff:
          'Corrections are new entries, so the log grows rather than being edited in place.',
      },
    ],
    stack: [
      'Next.js 16 (App Router)',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'shadcn/ui',
      'SQLite (better-sqlite3)',
      'Drizzle ORM',
      'Auth.js (NextAuth v5)',
      'PWA (manifest + service worker)',
      'Docker',
      'Coolify',
    ],
    liveUrl: 'https://care.danspelt.com/',
    caseStudyUrl: '/case-studies/careboard',
    image: '/images/careboard/public-landing.png',
    imageAlt: 'CareBoard public homepage with an illustrative example task board',
  },
];

export const PROJECT_PROOF_TABS = [
  { id: 'problem', label: 'Problem' },
  { id: 'approach', label: 'Approach' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'proof', label: 'Evidence' },
  { id: 'stack', label: 'Stack' },
];

export function getProjectProof(slug) {
  return PROJECT_PROOF.find((p) => p.slug === slug) ?? null;
}

export function getProjectsForAudience(audience) {
  const hive = PROJECT_PROOF.filter((p) => p.slug === 'community-hive');
  const rest = PROJECT_PROOF.filter((p) => p.slug !== 'community-hive');
  if (!audience) return [...hive, ...rest];
  const ordered = [
    ...rest.filter((p) => p.audience.includes(audience)),
    ...rest.filter((p) => !p.audience.includes(audience)),
  ];
  return [...hive, ...ordered];
}
