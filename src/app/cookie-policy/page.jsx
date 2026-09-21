import { LegalPage, LegalSection } from '@/components/legal-page';

export const metadata = {
  title: 'Cookie Policy',
  description:
    'danspelt.com does not set cookies. This page explains the small amount of browser storage the site uses instead.',
  alternates: {
    canonical: 'https://danspelt.com/cookie-policy',
  },
  openGraph: {
    title: 'Cookie Policy | Dan Spelt',
    description: 'danspelt.com does not set cookies — details of the browser storage it uses instead.',
    url: 'https://danspelt.com/cookie-policy',
    images: ['/og.png'],
  },
};

const storageRows = [
  {
    name: 'theme',
    type: 'localStorage',
    purpose: 'Remembers your light/dark/system colour theme choice.',
    lifetime: 'Until you clear site data',
  },
  {
    name: 'danspelt:visitor-path',
    type: 'sessionStorage',
    purpose: 'Remembers which audience path you selected on the homepage so content stays consistent during your visit.',
    lifetime: 'Current browser tab session only',
  },
  {
    name: 'danspelt:smart-cta-dismissed',
    type: 'sessionStorage',
    purpose: 'Remembers that you dismissed a call-to-action prompt so it is not shown again.',
    lifetime: 'Current browser tab session only',
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      lastUpdated="September 20, 2026"
      intro="This site does not set any cookies — no tracking cookies, no preference cookies, and no third-party cookies. A small amount of browser storage is used for features described below."
    >
      <LegalSection title="No cookies">
        <p>
          Nothing on danspelt.com writes to <code>document.cookie</code>. Because the site sets no
          non-essential cookies, there is no cookie consent banner to manage — there is nothing
          that would need your consent. The site&apos;s analytics (a self-hosted Umami instance)
          is configured cookieless: it counts aggregate page views without identifying or
          following individual visitors.
        </p>
      </LegalSection>

      <LegalSection title="Browser storage this site uses">
        <p>
          The features below store small values in your browser&apos;s local or session storage.
          These values stay on your device, are not sent to any server, and are not used for
          tracking.
        </p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold text-foreground">Name</th>
                <th className="px-4 py-3 font-semibold text-foreground">Storage</th>
                <th className="px-4 py-3 font-semibold text-foreground">Purpose</th>
                <th className="px-4 py-3 font-semibold text-foreground">Lifetime</th>
              </tr>
            </thead>
            <tbody>
              {storageRows.map((row) => (
                <tr key={row.name} className="border-b last:border-0 align-top">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{row.name}</td>
                  <td className="px-4 py-3">{row.type}</td>
                  <td className="px-4 py-3">{row.purpose}</td>
                  <td className="px-4 py-3">{row.lifetime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="Third-party sites">
        <p>
          External sites linked from here — such as GitHub, LinkedIn, or live project demos — may
          set their own cookies once you visit them. Those are governed by the respective
          site&apos;s policies, not this one.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          You can clear or block browser storage at any time through your browser settings
          (usually under &quot;site data&quot; or &quot;privacy&quot;). Doing so may reset your
          theme preference and session conveniences, but every page will continue to work.
        </p>
      </LegalSection>

      <LegalSection title="Changes and contact">
        <p>
          If the site ever introduces cookies or new storage-based features, this page will be
          updated — and a consent mechanism added if one becomes legally required. Questions:{' '}
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
