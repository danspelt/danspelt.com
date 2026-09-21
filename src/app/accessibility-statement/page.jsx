import { LegalPage, LegalSection, LegalList, LegalLink } from '@/components/legal-page';

export const metadata = {
  title: 'Accessibility Statement',
  description:
    'Accessibility commitment, conformance target, and feedback channels for danspelt.com — a site built by an accessibility engineer.',
  alternates: {
    canonical: 'https://danspelt.com/accessibility-statement',
  },
  openGraph: {
    title: 'Accessibility Statement | Dan Spelt',
    description:
      'Accessibility commitment, WCAG conformance target, known limitations, and how to request accommodations on danspelt.com.',
    url: 'https://danspelt.com/accessibility-statement',
    images: ['/og.png'],
  },
};

export default function AccessibilityStatementPage() {
  return (
    <LegalPage
      title="Accessibility Statement"
      lastUpdated="September 20, 2026"
      intro="Accessibility is central to my work — this site is both a portfolio and a demonstration of the accessible engineering practices I offer. I want everyone to be able to use it, and I treat barriers reported here as bugs to fix."
    >
      <LegalSection title="Conformance target">
        <p>
          The target for this site is{' '}
          <a
            href="https://www.w3.org/TR/WCAG22/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 rounded-sm focus-ring"
          >
            WCAG 2.2 Level AA
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          . The site is considered <strong>partially conformant</strong>: the main pages are
          built and reviewed against that target, but full conformance across every page has not
          been independently verified and work continues.
        </p>
      </LegalSection>

      <LegalSection title="Measures in place">
        <LegalList
          items={[
            'Semantic landmarks and a skip-to-content link on every page',
            'Keyboard-operable navigation, menus, forms, and widgets, with visible focus indicators',
            'Reduced-motion support for visitors who prefer it (prefers-reduced-motion)',
            'A text-size toggle and light/dark themes for comfortable reading',
            'A captioned introduction video with a full text transcript alternative',
            'Form labels, validation messages, and error identification exposed to assistive technology',
            'Automated accessibility linting in the build pipeline plus manual keyboard and screen-reader review',
          ]}
        />
      </LegalSection>

      <LegalSection title="Known limitations">
        <LegalList
          items={[
            'Some older or less-visited pages may still contain minor issues that review has not yet caught.',
            'Live project demos linked from this site are separate applications; their accessibility is covered by their own states of conformance, not this statement.',
            'Third-party content reached by external links is outside my control.',
          ]}
        />
      </LegalSection>

      <LegalSection title="Feedback and accommodations">
        <p>
          If you hit a barrier, need content in a different format, or want to discuss an
          accommodation, contact me at{' '}
          <a
            href="mailto:danspelt24@gmail.com"
            className="text-primary underline underline-offset-4 rounded-sm focus-ring"
          >
            danspelt24@gmail.com
          </a>{' '}
          or through the <LegalLink href="/contact">contact form</LegalLink>. I aim to respond
          within a few business days.
        </p>
      </LegalSection>

      <LegalSection title="Assessment and context">
        <p>
          This statement is based on self-assessment combining automated checks with manual
          review. danspelt.com is a personal portfolio, not a public-sector body, so it is not
          currently a prescribed organization under the <em>Accessible British Columbia
          Act</em> — the commitment above is voluntary, and I hold it to the standard I apply to
          client work. My professional accessibility practice is described on the{' '}
          <LegalLink href="/accessibility">accessibility engineering page</LegalLink>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
