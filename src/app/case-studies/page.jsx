import CaseStudyIndexClient from '@/components/project-case-study/CaseStudyIndexClient';

export const metadata = {
  title: 'Project Case Studies | Dan Spelt',
  description:
    'Evidence-led case studies for Community Hive and AccessLens, covering the problem, implementation, testing, constraints, and technical tradeoffs.',
};

export default function CaseStudiesPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-14 sm:py-20">
      <header className="max-w-3xl mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Selected work</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-4">Case studies</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Two web platforms with different constraints: multi-tenant community software and civic
          accessibility data. Claims below are grounded in each project&apos;s implementation, tests,
          and technical documentation.
        </p>
      </header>

      <CaseStudyIndexClient />
    </main>
  );
}
