import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PROJECT_PROOF, PROJECT_STATUS } from '@/data/project-proof';

const summaries = {
  'community-hive': 'Building communication scattered across inboxes. One tenant-scoped system for announcements, requests, documents, and decisions.',
  careboard: 'Household managers coordinating care through notes and messages. Private task assignment, rotating schedules, handoffs, and employer records.',
  accesslens: 'Accessibility details missing before a visit. Structured place checklists, labelled scores, photos, and community reports.',
};

export default function Projects() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <header className="mb-10 max-w-3xl">
        <h1 className="mb-4 text-4xl font-semibold sm:text-5xl">Software built around real problems</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">Explore three projects, then open a case study for product screens, implementation evidence, and the decisions behind the build.</p>
      </header>
      <ul className="grid gap-6 md:grid-cols-3">
        {PROJECT_PROOF.map((project) => (
          <li key={project.slug}>
            <article className="flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6">
              <Badge variant="outline" className="mb-4 self-start">{PROJECT_STATUS[project.status].label}</Badge>
              <h2 className="mb-2 text-2xl font-semibold">{project.title}</h2>
              <p className="mb-4 text-sm text-muted-foreground">{project.role}</p>
              <p className="mb-6 leading-relaxed text-muted-foreground">{summaries[project.slug]}</p>
              <p className="mb-6 border-t border-border/70 pt-4 text-sm leading-relaxed"><span className="font-semibold">Evidence: </span>{project.cardEvidence}</p>
              <Link href={project.caseStudyUrl} className="focus-ring mt-auto inline-flex items-center gap-2 rounded font-medium text-primary hover:underline">Read the {project.title} case study<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
            </article>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">Product capabilities are demonstrated separately from intended benefits. Case studies identify what is implemented, what is still developing, and where measured impact is unavailable.</p>
      <div className="mt-12 rounded-2xl border border-border/70 bg-muted/20 p-6 sm:p-8">
        <h2 className="mb-3 text-2xl font-semibold">A similar problem in your business?</h2>
        <p className="mb-4 text-muted-foreground">Let’s look at the workflow, the people using it, and where custom software could help.</p>
        <Link href="/contact?intent=problem" className="focus-ring rounded font-medium text-primary hover:underline">Talk to Dan about your problem</Link>
      </div>
    </div>
  );
}
