import CaseStudyIndexClient from '@/components/project-case-study/CaseStudyIndexClient';

export const metadata = {
  title: 'Custom Software Development Case Studies',
  description:
    'Custom software development case studies for Community Hive, AccessLens, and WindowsHelperSuite, with implementation details, testing, constraints, and technical tradeoffs.',
  alternates: {
    canonical: 'https://danspelt.com/case-studies',
  },
  openGraph: {
    title: 'Custom Software Development Case Studies | Dan Spelt',
    description:
      'Evidence-led case studies covering full-stack web apps, accessibility mapping, community software, and Windows tools.',
    url: 'https://danspelt.com/case-studies',
    images: ['/og.png'],
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-14 sm:py-20">
      <header className="max-w-3xl mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Selected work</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-4">Custom software development case studies</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Three systems with different constraints: multi-tenant community software, civic
          accessibility data, and Windows-native assistance tools. Claims below are grounded in
          each project&apos;s implementation, tests, and technical documentation.
        </p>
      </header>

      <CaseStudyIndexClient />
    </main>
  );
}
