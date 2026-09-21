import { LegalPage, LegalSection, LegalList } from '@/components/legal-page';

export const metadata = {
  title: 'Terms of Use',
  description:
    'Terms governing use of danspelt.com — an informational portfolio for Dan Spelt, software developer in Victoria, BC.',
  alternates: {
    canonical: 'https://danspelt.com/terms-of-use',
  },
  openGraph: {
    title: 'Terms of Use | Dan Spelt',
    description: 'Terms governing use of danspelt.com and its content.',
    url: 'https://danspelt.com/terms-of-use',
    images: ['/og.png'],
  },
};

export default function TermsOfUsePage() {
  return (
    <LegalPage
      title="Terms of Use"
      lastUpdated="September 20, 2026"
      intro="These terms govern use of danspelt.com, the personal portfolio of Dan Spelt, a software developer in Victoria, British Columbia, Canada. By using the site you accept them; if you don't, please don't use the site."
    >
      <LegalSection title="Purpose of the site">
        <p>
          The site is informational: it describes my experience, projects, and services, and
          provides ways to contact me. Content here is general information, not professional,
          legal, or procurement advice, and reading it does not create a client, consulting, or
          employment relationship.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          Unless noted otherwise, the text, design, and original media on this site are my
          intellectual property. You may view the site, share links to it, and quote brief
          excerpts with attribution. Please don&apos;t republish substantial portions, present my
          work as your own, or reuse my name or likeness to imply endorsement. Third-party
          projects and trademarks mentioned remain the property of their respective owners.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <p>Use the site lawfully and reasonably. In particular, don&apos;t:</p>
        <LegalList
          items={[
            'submit false, misleading, or unlawful content through the forms or chat',
            'use the forms or chat to send spam, malware, or unsolicited marketing',
            'probe, scan, attack, or attempt to disrupt the site or its infrastructure',
            'scrape or harvest the site in a way that degrades service for others',
            'misrepresent generated AI chat answers as statements by me',
          ]}
        />
        <p>
          The AI chat produces automated answers for convenience and may be imperfect — verify
          anything that matters and contact me directly for anything official.
        </p>
      </LegalSection>

      <LegalSection title="Projects, demos, and external links">
        <p>
          The site links to live project demos and third-party sites (for example GitHub and
          LinkedIn). Those are separate services with their own terms and privacy practices; I
          don&apos;t control and am not responsible for their content or availability. Descriptions
          of past work are summaries for portfolio purposes.
        </p>
      </LegalSection>

      <LegalSection title="No warranties">
        <p>
          The site is provided &quot;as is&quot; and &quot;as available.&quot; I aim for accuracy
          but don&apos;t warrant that content is complete, current, or error-free, or that the site
          will be uninterrupted or free of defects.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the extent permitted by law, I&apos;m not liable for indirect, incidental, or
          consequential losses arising from use of, or inability to use, this site or reliance on
          its content. Nothing in these terms excludes or limits liability that cannot be excluded
          under applicable law, including the <em>Business Practices and Consumer Protection
          Act</em> of British Columbia where it applies.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          These terms are governed by the laws of British Columbia and the federal laws of Canada
          applicable there. Disputes relating to the site are subject to the courts of British
          Columbia.
        </p>
      </LegalSection>

      <LegalSection title="Changes and contact">
        <p>
          I may update these terms from time to time; the current version is always posted here
          with its date. Questions:{' '}
          <a
            href="mailto:danspelt24@gmail.com"
            className="text-primary underline underline-offset-4 rounded-sm focus-ring"
          >
            danspelt24@gmail.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
