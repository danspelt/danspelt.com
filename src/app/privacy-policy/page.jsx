import { LegalPage, LegalSection, LegalList, LegalLink } from '@/components/legal-page';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How danspelt.com collects, uses, and protects personal information — contact forms, AI chat, cookieless analytics, and your rights under BC privacy law.',
  alternates: {
    canonical: 'https://danspelt.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Dan Spelt',
    description:
      'How danspelt.com collects, uses, and protects personal information, and how to make a privacy request.',
    url: 'https://danspelt.com/privacy-policy',
    images: ['/og.png'],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="September 20, 2026"
      intro="This site is operated by Dan Spelt, an individual software developer based in Victoria, British Columbia, Canada, offering contract and freelance software services. This policy explains what personal information the site collects, why, and the choices you have."
    >
      <LegalSection title="The short version">
        <p>
          This site collects very little personal information. There are no accounts, no
          newsletters, no advertising trackers, and no cookies. If you send a message through a
          form, the details you enter are emailed to me so I can reply. If you use the AI chat,
          what you type is sent to OpenAI to generate an answer. That is the extent of it.
        </p>
      </LegalSection>

      <LegalSection title="Legal framework">
        <p>
          As an individual engaged in commercial activity in British Columbia, I handle personal
          information in line with BC&apos;s <em>Personal Information Protection Act</em> (PIPA)
          and, where personal information crosses provincial or national borders, the federal
          <em> Personal Information Protection and Electronic Documents Act</em> (PIPEDA). I am
          the person responsible for this site&apos;s privacy practices and can be reached at the
          contact below.
        </p>
      </LegalSection>

      <LegalSection title="What is collected and why">
        <LegalList
          items={[
            'Contact and inquiry forms — your name, email address, optional organization, and message are sent to me by email so I can respond. They are not stored in a database on this site.',
            'Business challenge tool — the details you enter about a workflow problem, plus your name and email if you choose to share them, are emailed to me the same way.',
            '“Ask Dan” AI chat — the messages you type are sent to OpenAI to generate a reply. The site does not save your conversation. If you choose to send the transcript by email using the consent checkbox, it is emailed like any other form message.',
            'Site analytics — a self-hosted Umami instance (stats.danspelt.com) records aggregate, cookieless page-view statistics and a small allowlist of non-personal events (for example, which call-to-action was clicked). It does not use cookies and does not collect names, emails, message content, or other personal details.',
            'Technical logs — the hosting provider keeps standard server logs (such as IP address, browser type, and timestamps) for security and operations. A short-lived, in-memory rate limiter uses an IP-derived key to deter form abuse and is discarded when its window expires.',
          ]}
        />
      </LegalSection>

      <LegalSection title="Consent">
        <p>
          By submitting a form or using the AI chat, you consent to the information you enter
          being used for the purposes described above. Please don&apos;t include sensitive
          personal information (health, financial, or identity details) in messages — it isn&apos;t
          needed and isn&apos;t wanted.
        </p>
      </LegalSection>

      <LegalSection title="Service providers and cross-border processing">
        <p>
          Two third-party processors handle limited information on my behalf: Resend delivers
          form submissions to my inbox, and OpenAI generates AI chat replies from the text you
          provide. Both may process data in the United States, where it is subject to that
          jurisdiction&apos;s laws. The site itself is hosted on a virtual private server managed
          through Coolify. Links to external sites (such as GitHub, LinkedIn, or live project
          demos) take you to services with their own privacy practices.
        </p>
      </LegalSection>

      <LegalSection title="Retention">
        <p>
          Message emails are kept only as long as needed to handle our correspondence and any
          resulting work. Analytics data is aggregate and not tied to you. Server logs follow the
          hosting provider&apos;s default retention. You can ask me to delete correspondence at
          any time.
        </p>
      </LegalSection>

      <LegalSection title="Safeguards">
        <p>
          The site is served over HTTPS, form inputs are validated and rate-limited, and
          collection is limited to what each feature actually needs. No method of transmission or
          storage is perfectly secure, but the amount of personal information at risk here is
          deliberately kept small.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          You may request access to, correction of, or deletion of your personal information, or
          withdraw consent for future contact, by emailing me. If you believe your concern
          hasn&apos;t been resolved, you may contact the Office of the Information and Privacy
          Commissioner for British Columbia, or the Office of the Privacy Commissioner of Canada
          for matters under PIPEDA.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          This site is a professional portfolio and is not directed at children. I do not
          knowingly collect personal information from children.
        </p>
      </LegalSection>

      <LegalSection title="Changes and contact">
        <p>
          If this policy changes, the updated version will be posted here with a new date.
          Privacy questions and requests:{' '}
          <a
            href="mailto:danspelt24@gmail.com"
            className="text-primary underline underline-offset-4 rounded-sm focus-ring"
          >
            danspelt24@gmail.com
          </a>{' '}
          or the <LegalLink href="/contact">contact form</LegalLink>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
