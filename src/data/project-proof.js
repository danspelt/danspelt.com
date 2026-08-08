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
  pilot: { label: 'Pilot', description: 'Running with early users while the product is refined.' },
  active: { label: 'Active', description: 'Live and in ongoing development.' },
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
    result: 'Less repetitive email and a clearer operational record of what was asked and what was done.',
    image: null,
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
    result: 'Faster decisions with a traceable record instead of a search through inboxes.',
    image: null,
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
    image: null,
    imageAlt:
      'Resident view showing current notices, the status of a submitted maintenance request, and community updates',
  },
];

export const PROJECT_PROOF = [
  {
    slug: 'community-hive',
    title: 'Community Hive',
    tagline: 'Multi-tenant communication platform for strata and HOA communities',
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
    slug: 'accesslens',
    title: 'AccessLens',
    tagline: 'Accessibility intelligence platform for cities',
    status: 'active',
    audience: ['hire', 'product'],
    role: 'Founder and developer',
    problem:
      'People with disabilities cannot tell in advance whether a restaurant, park, clinic, or transit stop will actually work for them. Accessibility information is inconsistent, unverified, or missing entirely.',
    approach:
      'Crowdsourced accessibility reports scored across ten criteria and rendered as colour-coded markers on an OpenStreetMap map, so a place can be assessed before travelling to it.',
    outcomes: [
      {
        label: 'Each place receives a calculated accessibility score across 10 criteria',
        evidence: 'Verifiable in the live product at accesslens.ca',
      },
      {
        label: '50+ real verified places seeded across 12 categories in Victoria, BC at launch',
        evidence: 'Verifiable in the live product at accesslens.ca',
      },
      {
        label: 'Built in alignment with WCAG 2.1 AA, the Accessible Canada Act, and the BC Accessibility Act',
      },
    ],
    decisions: [
      {
        choice: 'Leaflet with OpenStreetMap and Nominatim instead of a commercial map API',
        reason: 'No paid key is required, so a civic project can run without per-request billing risk.',
        tradeoff: 'Less polished geocoding, so results are cached and corrected manually where needed.',
      },
      {
        choice: 'MongoDB 2dsphere index with a TTL geocode cache',
        reason: 'Proximity search needs to stay fast as the dataset grows city by city.',
        tradeoff: 'Compound indexes have to be maintained as new filters are added.',
      },
      {
        choice: 'Multi-provider sign-in (Google OAuth, email magic link, credentials)',
        reason: 'Contributors should not be blocked by one identity provider or by password friction.',
        tradeoff: 'Three authentication paths to secure and test rather than one.',
      },
    ],
    stack: [
      'Next.js 16 (App Router)',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'MongoDB',
      'Auth.js (NextAuth v5)',
      'Zod',
      'Leaflet + OpenStreetMap',
      'Docker',
      'Coolify',
    ],
    liveUrl: 'https://www.accesslens.ca/',
    caseStudyUrl: '/projects',
    image: null,
    imageAlt: 'AccessLens map showing colour-coded accessibility scores for places in Victoria, BC',
  },
  {
    slug: 'lipsync-connect',
    title: 'LipSync Connect',
    tagline: 'Browser-based configuration for an assistive input device',
    status: 'shipped',
    audience: ['hire'],
    role: 'Lead developer at Neil Squire / Makers Making Change',
    problem:
      'People who rely on the LipSync assistive device needed a way to check its status, adjust its settings, and calibrate it without installing desktop software or asking someone else to do it for them.',
    approach:
      'A Next.js application that talks to the physical device from the browser using the Web Serial API, with a guided calibration flow designed for users with limited motor control.',
    outcomes: [
      {
        label: 'Device status, settings, and guided calibration are available directly in the browser',
      },
      {
        label: 'Feature and usability decisions were refined through coordinated beta testing with real users',
      },
      {
        label: 'Shipped with technical documentation and end-user instructions',
      },
    ],
    decisions: [
      {
        choice: 'Web Serial API in the browser instead of a native installer',
        reason: 'Removes installation as a barrier for the people least able to work around it.',
        tradeoff: 'Limited to browsers that implement Web Serial, so capability is detected and explained.',
      },
      {
        choice: 'Guided step-by-step calibration rather than a settings panel',
        reason: 'Calibration is a sequence, and a sequence is easier than interpreting raw values.',
        tradeoff: 'Slower for expert users, so individual settings remain reachable.',
      },
    ],
    stack: ['Next.js', 'React', 'Web Serial API', 'State management', 'Responsive design'],
    liveUrl: null,
    caseStudyUrl: '/projects',
    image: null,
    imageAlt: 'LipSync Connect calibration screen',
  },
];

export const PROJECT_PROOF_TABS = [
  { id: 'problem', label: 'Problem' },
  { id: 'approach', label: 'Approach' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'stack', label: 'Stack' },
];

export function getProjectProof(slug) {
  return PROJECT_PROOF.find((p) => p.slug === slug) ?? null;
}

export function getProjectsForAudience(audience) {
  if (!audience) return PROJECT_PROOF;
  const ordered = [
    ...PROJECT_PROOF.filter((p) => p.audience.includes(audience)),
    ...PROJECT_PROOF.filter((p) => !p.audience.includes(audience)),
  ];
  return ordered;
}
