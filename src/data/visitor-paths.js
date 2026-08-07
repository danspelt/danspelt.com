// The three visitor paths that shape the homepage.
//
// Selecting a path never hides content. It reorders the recommended next
// action and highlights the most relevant proof.

export const VISITOR_PATHS = [
  {
    id: 'hire',
    label: 'I may hire Dan',
    description: 'See how I adapt to teams, stacks, and timelines — then start a conversation.',
    target: '#proof',
    cta: { label: 'Contact Dan about a role', href: '/contact?intent=role' },
  },
  {
    id: 'business',
    label: 'I have a business problem',
    description: 'Describe your workflow friction and I will show you what a custom solution could look like.',
    target: '#challenge-finder',
    cta: { label: 'Explore a software idea', href: '#challenge-finder' },
  },
  {
    id: 'community-hive',
    label: 'Show me Community Hive',
    description: 'A real platform I built from scratch, with live screens by user role.',
    target: '#community-hive',
    cta: { label: 'Request a Community Hive demo', href: '/contact?intent=community-hive' },
  },
];

export const VISITOR_PATH_IDS = VISITOR_PATHS.map((p) => p.id);

export const DEFAULT_PATH_CTA = {
  label: 'Get in touch with Dan',
  href: '/contact',
};

export function getVisitorPath(id) {
  return VISITOR_PATHS.find((p) => p.id === id) ?? null;
}

export function getPathCta(id) {
  return getVisitorPath(id)?.cta ?? DEFAULT_PATH_CTA;
}
