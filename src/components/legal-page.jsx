import Link from 'next/link';

/**
 * Shared layout for the site's legal-information pages
 * (privacy, terms, cookies, accessibility statement).
 *
 * Sources for the legal content are recorded in docs/legal-sources.md.
 * These pages are practical drafts for review by a qualified BC lawyer
 * before being relied on for material legal risk.
 */
export function LegalPage({ title, lastUpdated, intro, children }) {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10 border-b pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h1>
        <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        {intro ? (
          <p className="mt-4 text-muted-foreground leading-relaxed">{intro}</p>
        ) : null}
      </header>
      <div className="space-y-10">{children}</div>
      <p className="mt-12 border-t pt-6 text-sm text-muted-foreground">
        Related documents:{' '}
        <LegalLink href="/privacy-policy">Privacy Policy</LegalLink>
        {' · '}
        <LegalLink href="/terms-of-use">Terms of Use</LegalLink>
        {' · '}
        <LegalLink href="/cookie-policy">Cookie Policy</LegalLink>
        {' · '}
        <LegalLink href="/accessibility-statement">Accessibility Statement</LegalLink>
      </p>
    </div>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="space-y-3 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function LegalLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-primary underline underline-offset-4 rounded-sm hover:text-primary/80 transition-colors focus-ring"
    >
      {children}
    </Link>
  );
}
