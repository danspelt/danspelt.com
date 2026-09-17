import Link from 'next/link';
import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  GitBranch,
  Layers,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_STATUS, LIVE_APPS } from '@/data/projects';
import { PROJECT_PROOF, PROJECT_STATUS } from '@/data/project-proof';

export const metadata = {
  title: 'Portfolio Documentation | Dan Spelt',
  description:
    'A professional overview of how danspelt.com is structured, built, documented, verified, deployed, and maintained.',
  keywords: [
    'portfolio documentation',
    'Dan Spelt website architecture',
    'Next.js portfolio documentation',
    'software portfolio case studies',
    'accessibility engineering portfolio',
  ],
  alternates: { canonical: 'https://danspelt.com/documentation' },
  openGraph: {
    title: 'Portfolio Documentation | Dan Spelt',
    description:
      'How the portfolio is structured, built, documented, verified, deployed, and maintained.',
    url: 'https://danspelt.com/documentation',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Documentation | Dan Spelt',
    description:
      'A professional overview of the architecture, content model, quality checks, and operating practices behind danspelt.com.',
  },
};

const repositoryBase = 'https://github.com/danspelt/danspelt.com/blob/main';

const principles = [
  {
    icon: CheckCircle2,
    title: 'Evidence before claims',
    body: 'Completed portfolio work is promoted only when it has a public product, a case study, or another verifiable proof point. Marketing language stays subordinate to evidence.',
  },
  {
    icon: Accessibility,
    title: 'Accessibility by default',
    body: 'Semantic structure, keyboard access, readable contrast, descriptive links, and screen-reader-friendly content are treated as baseline requirements.',
  },
  {
    icon: Workflow,
    title: 'Problem-first storytelling',
    body: 'Case studies explain the operational problem, constraints, implementation decisions, outcomes, and tradeoffs rather than only listing technologies.',
  },
  {
    icon: ShieldCheck,
    title: 'Maintainable scope',
    body: 'The site favors durable static pages, shared data sources, explicit status labels, and conservative claims that remain accurate as projects evolve.',
  },
];

const architecture = [
  {
    icon: Layers,
    title: 'Application framework',
    items: [
      'Next.js App Router with React 19',
      'Static-first public pages with server-rendered content where practical',
      'Route-level metadata, canonical URLs, Open Graph, and structured data',
    ],
  },
  {
    icon: Code2,
    title: 'Interface system',
    items: [
      'Tailwind CSS 4 with shared design tokens',
      'Reusable card, badge, and button primitives',
      'Responsive layouts designed for mobile first',
    ],
  },
  {
    icon: Database,
    title: 'Content model',
    items: [
      'Canonical project records live in src/data',
      'Case-study proof and product status are separate from page markup',
      'Shared source data keeps home, projects, work, and assistant content aligned',
    ],
  },
  {
    icon: Server,
    title: 'Operations',
    items: [
      'Docker standalone output for predictable deployment',
      'Coolify deployment from the main branch',
      'Environment variables isolate secrets and service configuration',
    ],
  },
];

const apiRoutes = [
  {
    route: '/api/health',
    purpose: 'Deployment and service health check endpoint.',
  },
  {
    route: '/api/projects',
    purpose: 'Project data for site features and integrations.',
  },
  {
    route: '/api/github',
    purpose: 'GitHub repository data used by portfolio content.',
  },
  {
    route: '/api/email',
    purpose: 'Transactional email through the configured mail provider.',
  },
  {
    route: '/api/custom-software-inquiry',
    purpose: 'Custom software inquiry submissions and notification delivery.',
  },
  {
    route: '/api/business-challenge',
    purpose: 'Business challenge summaries and optional contact submissions.',
  },
  {
    route: '/api/ai-chat',
    purpose: 'Portfolio assistant responses grounded in approved site data.',
  },
  {
    route: '/api/ai-chat/email',
    purpose: 'Follow-up delivery for qualified assistant conversations.',
  },
  {
    route: '/api/github-test',
    purpose: 'Diagnostic endpoint for validating GitHub integration configuration.',
  },
];

const visitorPaths = [
  {
    title: 'Hiring managers',
    path: 'About → Employment history → Case studies → Contact',
    description: 'Evaluates experience depth, evidence quality, accessibility practice, and role fit.',
  },
  {
    title: 'Business clients',
    path: 'Home → Custom software → Work → Contact',
    description: 'Understands the business problems solved, product approach, and inquiry path.',
  },
  {
    title: 'Technical reviewers',
    path: 'Case studies → Documentation → GitHub → Projects',
    description: 'Inspects architecture, tradeoffs, verification, source material, and shipped scope.',
  },
];

const repositoryDocs = [
  {
    title: 'Project README',
    href: `${repositoryBase}/README.md`,
    description: 'Setup, development commands, deployment summary, and repository orientation.',
  },
  {
    title: 'Project status',
    href: `${repositoryBase}/docs/PROJECT_STATUS.md`,
    description: 'Current site status, milestones, known issues, and resume checklist.',
  },
  {
    title: 'User note',
    href: `${repositoryBase}/docs/USER_NOTE.md`,
    description: 'Latest session handoff, portfolio rules, verification results, and pending local work.',
  },
  {
    title: 'Deployment guide',
    href: `${repositoryBase}/DEPLOYMENT.md`,
    description: 'Docker, environment, hosting, and production deployment notes.',
  },
  {
    title: 'Hosting and operations',
    href: `${repositoryBase}/docs/hosting-and-deployment.md`,
    description: 'Operational guidance for the portfolio and sibling applications.',
  },
];

const developerGuides = [
  'Community Hive',
  'Community Hive Sales Worker',
  'CareBoard',
  'AccessLens',
  'Clarity Audit',
];

const qualityChecks = [
  'Run npm run lint before considering a change complete.',
  'Run npm run build before release-sensitive changes.',
  'Use npm run test:health to verify configured service health.',
  'Use npm run test:challenge to smoke-test the business challenge flow.',
  'Manually verify changed routes for metadata, accessibility, responsive layout, and working links.',
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <header className="max-w-3xl mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2">
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">{title}</h2>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </header>
  );
}

function AppStatusBadge({ status }) {
  return (
    <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
      {APP_STATUS[status].label}
    </Badge>
  );
}

export default function DocumentationPage() {
  const completedProjects = PROJECT_PROOF.filter((project) => project.caseStudyUrl);
  const deployedApps = LIVE_APPS.filter((app) => app.status !== 'building' && app.url);
  const inDevelopment = LIVE_APPS.filter((app) => app.status === 'building');

  return (
    <div className="container mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <header className="max-w-4xl mb-14 sm:mb-20">
        <Badge variant="outline" className="mb-5 border-primary/20 bg-primary/5 text-primary">
          Site documentation
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight mb-6">
          How this portfolio is designed, built, and maintained
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
          This page documents the content rules, architecture, project evidence, quality checks,
          APIs, deployment model, and repository documentation behind danspelt.com.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <Link href="/work">
              View completed work
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="https://github.com/danspelt/danspelt.com" target="_blank" rel="noopener noreferrer">
              View repository
              <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Button>
        </div>
      </header>

      <section aria-labelledby="snapshot-heading" className="mb-16">
        <h2 id="snapshot-heading" className="sr-only">Portfolio snapshot</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: completedProjects.length, label: 'proof-backed projects' },
            { value: deployedApps.length, label: 'deployed applications' },
            { value: inDevelopment.length, label: 'documented builds in progress' },
            { value: apiRoutes.length, label: 'API endpoints documented' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border/70 bg-card p-5 text-center">
              <div className="text-4xl font-semibold text-primary mb-2">{item.value}</div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="principles-heading" className="mb-16">
        <SectionHeading
          eyebrow="Standards"
          title="Portfolio principles"
          description="These rules keep the site credible, accessible, and maintainable as the project portfolio grows."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <Card key={principle.title}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{principle.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{principle.body}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="content-model-heading" className="mb-16">
        <SectionHeading
          eyebrow="Content model"
          title="What belongs where"
          description="The site separates completed proof-backed work from the broader product inventory so visitors see a clear, trustworthy portfolio."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Completed work</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                The `/work` page is curated. Apps appear there only when they are deployed and have a
                public case study or equivalent project proof.
              </p>
              <div className="space-y-3">
                {completedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={project.caseStudyUrl}
                    className="block rounded-lg border border-border/70 p-3 hover:border-primary/60 focus-ring"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium">{project.title}</span>
                      <Badge variant="outline">{PROJECT_STATUS[project.status].label}</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Project inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                `/projects` is the full product inventory. It can show deployed applications and
                in-development builds without implying that every tool is a finished case study.
              </p>
              <Link href="/projects" className="inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-4">
                Open project inventory
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Case studies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                Case studies document the problem, approach, decisions, outcomes, evidence, and stack.
                They are the canonical proof layer for completed portfolio work.
              </p>
              <Link href="/case-studies" className="inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-4">
                Open case studies
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section aria-labelledby="inventory-heading" className="mb-16">
        <SectionHeading
          eyebrow="Inventory"
          title="Application status register"
          description="A concise register of product names, current status, and public destinations. This inventory is broader than the curated completed-work list."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {LIVE_APPS.map((app) => (
            <article key={app.slug} className="rounded-xl border border-border/70 bg-card p-5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <AppStatusBadge status={app.status} />
                {app.caseStudyUrl && <Badge variant="outline">Case study available</Badge>}
              </div>
              <h3 className="text-lg font-semibold mb-2">{app.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-4">{app.description}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
                {app.url && (
                  <a href={app.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline underline-offset-4">
                    Visit app
                    <ArrowUpRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {app.caseStudyUrl && (
                  <Link href={app.caseStudyUrl} className="hover:underline underline-offset-4">
                    Case study
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="architecture-heading" className="mb-16">
        <SectionHeading
          eyebrow="Architecture"
          title="Technical foundation"
          description="The site is intentionally simple to operate: static-first content, shared data sources, a small API surface, and a repeatable deployment path."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {architecture.map((area) => {
            const Icon = area.icon;
            return (
              <Card key={area.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    {area.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {area.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="journeys-heading" className="mb-16">
        <SectionHeading
          eyebrow="Experience"
          title="Primary visitor paths"
          description="Each audience has a different evidence need. The site structure supports fast scanning first and deeper verification second."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {visitorPaths.map((path) => (
            <Card key={path.title}>
              <CardHeader>
                <CardTitle className="text-xl">{path.title}</CardTitle>
                <p className="text-sm font-medium text-primary">{path.path}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{path.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="api-heading" className="mb-16">
        <SectionHeading
          eyebrow="API surface"
          title="Documented endpoints"
          description="The public site remains mostly static. API routes are limited to integrations, form delivery, diagnostics, and assistant features."
        />
        <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
          {apiRoutes.map((api, index) => (
            <div
              key={api.route}
              className={`grid gap-2 p-5 sm:grid-cols-[220px_1fr] ${index > 0 ? 'border-t border-border/70' : ''}`}
            >
              <code className="text-sm font-semibold text-primary">{api.route}</code>
              <p className="text-sm leading-relaxed text-muted-foreground">{api.purpose}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="quality-heading" className="mb-16">
        <SectionHeading
          eyebrow="Quality"
          title="Verification checklist"
          description="Verification is lightweight but explicit. The goal is to catch content, accessibility, build, and integration regressions before deployment."
        />
        <Card>
          <CardContent className="pt-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {qualityChecks.map((check) => (
                <li key={check} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="repository-docs-heading" className="mb-16">
        <SectionHeading
          eyebrow="Repository"
          title="Documentation index"
          description="The repository contains the operational source of truth. These documents support setup, deployment, project status, and future maintenance."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repositoryDocs.map((doc) => (
            <a
              key={doc.title}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border/70 bg-card p-5 hover:border-primary/60 focus-ring"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold group-hover:text-primary">{doc.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{doc.description}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              </div>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="guides-heading" className="mb-16">
        <SectionHeading
          eyebrow="Product planning"
          title="Developer guide library"
          description="Developer guides document product scope, architecture, implementation boundaries, and deployment considerations for planned or sibling applications."
        />
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {developerGuides.map((guide) => (
                <div key={guide} className="flex items-center gap-3 rounded-lg border border-border/70 p-3">
                  <BookOpen className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm font-medium">{guide}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="operations-heading" className="mb-16">
        <SectionHeading
          eyebrow="Operations"
          title="Deployment and maintenance model"
          description="The operating model is designed for a solo maintainer: clear source data, deterministic builds, environment-based configuration, and push-to-deploy infrastructure."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            {
              icon: GitBranch,
              title: 'Source control',
              body: 'Feature work is reviewed through Git history. Main should remain deployable, and unrelated local changes should not be bundled into focused fixes.',
            },
            {
              icon: Rocket,
              title: 'Release path',
              body: 'Changes are verified locally, pushed to main, and deployed by Coolify using the standalone Docker build.',
            },
            {
              icon: Search,
              title: 'Ongoing review',
              body: 'Project status, dependency alerts, accessibility, metadata, and public claims should be reviewed as the portfolio evolves.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <CardContent className="pt-6">
                  <Icon className="h-6 w-6 text-primary mb-4" aria-hidden="true" />
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <footer className="rounded-2xl bg-secondary px-6 py-8 text-secondary-foreground">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <FileText className="h-6 w-6 text-accent mb-3" aria-hidden="true" />
            <h2 className="text-2xl font-semibold mb-2">Documentation as part of the product</h2>
            <p className="text-secondary-foreground/75 leading-relaxed max-w-2xl">
              Clear documentation is treated as an engineering deliverable: it explains what exists,
              why decisions were made, how to verify the system, and where future work should begin.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact?intent=project">
              Discuss a project
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
