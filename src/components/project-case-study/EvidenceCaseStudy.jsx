import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PROJECT_PROOF, PROJECT_STATUS } from '@/data/project-proof';

export default function EvidenceCaseStudy({ project }) {
  const otherProjects = PROJECT_PROOF.filter((item) => item.slug !== project.slug);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <Link
          href="/#proof"
          className="mb-8 inline-flex items-center gap-2 rounded text-sm font-medium text-primary hover:underline focus-ring"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to engineering proof
        </Link>

        <header className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="outline">{PROJECT_STATUS[project.status].label}</Badge>
            <span className="text-sm text-muted-foreground">{project.role}</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{project.tagline}</p>
        </header>

        <nav
          aria-label="Case study sections"
          className="sticky top-20 z-20 mb-10 overflow-x-auto rounded-xl border border-border/70 bg-background/90 p-2 shadow-sm backdrop-blur"
        >
          <ul className="flex min-w-max gap-1">
            {[
              ['overview', 'Overview'],
              ['evidence', 'Evidence'],
              ['outcomes', 'Outcomes'],
              ['decisions', 'Tradeoffs'],
              ['stack', 'Stack'],
            ].map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="focus-ring block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div id="overview" className="scroll-mt-40 grid gap-6 md:grid-cols-2 mb-12">
          <section className="depth-card rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="text-2xl font-semibold mb-3">The problem</h2>
            <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
          </section>
          <section className="depth-card rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="text-2xl font-semibold mb-3">The approach</h2>
            <p className="text-muted-foreground leading-relaxed">{project.approach}</p>
          </section>
        </div>

        <section id="evidence" className="scroll-mt-40 mb-12" aria-labelledby="evidence-heading">
          <h2 id="evidence-heading" className="text-3xl font-semibold mb-3">
            Evidence in the implementation
          </h2>
          <p className="max-w-3xl text-muted-foreground leading-relaxed mb-6">
            These points are grounded in the project repository, its tests, and its technical
            documentation. They are not estimates of business impact.
          </p>
          <div className="grid items-start gap-4 sm:grid-cols-2">
            {project.proof.map((item, index) => (
              <details
                key={item.label}
                open={index === 0}
                className="evidence-disclosure group rounded-xl border border-border/70 bg-muted/20"
              >
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl p-5 font-semibold hover:bg-muted/60">
                  {item.label}
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="border-t border-border/70 px-5 py-4 text-sm text-muted-foreground leading-relaxed">
                  {item.detail}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section id="outcomes" className="scroll-mt-40 mb-12" aria-labelledby="outcomes-heading">
          <h2 id="outcomes-heading" className="text-3xl font-semibold mb-6">
            Working outcomes
          </h2>
          <ul className="space-y-4">
            {project.outcomes.map((outcome) => (
              <li key={outcome.label} className="rounded-xl border border-border/70 bg-card p-5">
                <p className="leading-relaxed">{outcome.label}</p>
                {outcome.evidence && (
                  <p className="mt-1 text-sm text-muted-foreground">Evidence: {outcome.evidence}</p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="decisions" className="scroll-mt-40 mb-12" aria-labelledby="decisions-heading">
          <h2 id="decisions-heading" className="text-3xl font-semibold mb-6">
            Technical choices and tradeoffs
          </h2>
          <div className="space-y-5">
            {project.decisions.map((decision) => (
              <article key={decision.choice} className="rounded-xl border border-border/70 bg-card p-5">
                <h3 className="font-semibold mb-2">{decision.choice}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-1">
                  <span className="font-medium text-foreground">Why: </span>
                  {decision.reason}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">Tradeoff: </span>
                  {decision.tradeoff}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="stack" className="scroll-mt-40 mb-12" aria-labelledby="stack-heading">
          <h2 id="stack-heading" className="text-2xl font-semibold mb-4">Technical foundation</h2>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row">
          {project.liveUrl && (
            <Button asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit live site
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href="/contact">Discuss a similar project</Link>
          </Button>
        </div>

        <aside className="mt-14 border-t border-border/70 pt-8" aria-labelledby="explore-next-heading">
          <h2 id="explore-next-heading" className="text-2xl font-semibold mb-4">Explore another build</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {otherProjects.map((item) => (
              <Link
                key={item.slug}
                href={item.caseStudyUrl}
                className="interactive-card focus-ring group rounded-xl border border-border/70 bg-card p-4"
              >
                <span className="flex items-center justify-between gap-3 font-semibold">
                  {item.title}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{item.tagline}</span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
