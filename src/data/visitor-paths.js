// The visitor paths that shape the homepage.
//
// Selecting a path never hides content. It reorders the recommended next
// action and highlights the most relevant proof. Community Hive stays first.

export const VISITOR_PATHS = [
  {
    id: 'community-hive',
    label: 'Show me Community Hive',
    description: 'A live platform I built for property managers, councils, and residents.',
    target: '#community-hive',
    cta: { label: 'Request a Community Hive demo', href: '/contact?intent=community-hive' },
  },
  {
    id: 'hire',
    label: 'I may hire Dan',
    description: 'See the experience and shipped work, then start a conversation about a role.',
    target: '#career-proof-heading',
    cta: { label: 'Contact Dan about a role', href: '/contact?intent=hire' },
  },
  {
    id: 'business',
    label: 'I have a business problem',
    description: 'If you need custom software rather than Community Hive itself, say so in the contact form.',
    target: '#contact',
    cta: { label: 'Contact Dan', href: '/contact' },
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
