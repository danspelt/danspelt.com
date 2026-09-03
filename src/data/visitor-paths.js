// The visitor paths that shape the homepage.
//
// Selecting a path never hides content. It reorders the recommended next
// action and highlights the most relevant proof. Community Hive stays first.

export const VISITOR_PATHS = [
  {
    id: 'business',
    label: 'Discuss Your Project',
    description: 'Tell me about the workflow or process you would like to improve and we will explore what custom software could do.',
    target: '#contact',
    cta: { label: 'Discuss Your Project', href: '/contact?intent=project' },
  },
  {
    id: 'hire',
    label: 'Looking for a Senior Developer?',
    description: 'See my background, case studies, and shipped work, then start a conversation about a role.',
    target: '#career-proof-heading',
    cta: { label: 'Contact Dan about a role', href: '/contact?intent=hire' },
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
