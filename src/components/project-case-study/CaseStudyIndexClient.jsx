'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PROJECT_PROOF, PROJECT_STATUS } from '@/data/project-proof';

const featuredSlugs = ['community-hive', 'accesslens', 'windows-helper-suite'];
const projects = featuredSlugs.map((slug) => PROJECT_PROOF.find((project) => project.slug === slug));

const filters = [
  { id: 'all', label: 'All projects', slugs: featuredSlugs },
  { id: 'web', label: 'Web platforms', slugs: ['community-hive', 'accesslens'] },
  { id: 'accessibility', label: 'Accessibility', slugs: ['accesslens', 'windows-helper-suite'] },
  { id: 'desktop', label: 'Desktop tools', slugs: ['windows-helper-suite'] },
];

export default function CaseStudyIndexClient() {
  const [activeFilter, setActiveFilter] = useState('all');
  const selectedFilter = filters.find((filter) => filter.id === activeFilter) ?? filters[0];
  const visibleProjects = useMemo(
    () => projects.filter((project) => selectedFilter.slugs.includes(project.slug)),
    [selectedFilter]
  );

  return (
    <>
      <div className="mb-8" aria-labelledby="case-study-filter-heading">
        <h2 id="case-study-filter-heading" className="sr-only">Filter case studies</h2>
        <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter case studies by focus">
          {filters.map((filter) => {
            const selected = filter.id === activeFilter;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  'btn-3d focus-ring shrink-0 rounded-full border px-4 py-2 text-sm font-medium',
                  selected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground'
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
          Showing {visibleProjects.length} {visibleProjects.length === 1 ? 'case study' : 'case studies'}.
        </p>
      </div>

      <div className="space-y-8">
        {visibleProjects.map((project) => (
          <article
            key={project.slug}
            className="interactive-card rounded-2xl border border-border/70 bg-card p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="outline">{PROJECT_STATUS[project.status].label}</Badge>
              <span className="text-sm text-muted-foreground">{project.role}</span>
            </div>
            <h2 className="text-3xl font-semibold mb-2">{project.title}</h2>
            <p className="text-muted-foreground mb-6">{project.tagline}</p>
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Problem</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Technical approach</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.approach}</p>
              </div>
            </div>

            <details className="evidence-disclosure group mb-7 rounded-xl border border-border/70 bg-muted/20">
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-semibold hover:bg-muted/60">
                Repository-backed evidence
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <ul className="grid gap-3 border-t border-border/70 p-4 sm:grid-cols-2">
                {project.proof.map((item) => (
                  <li key={item.label} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>
                      <span className="block font-medium text-foreground">{item.label}</span>
                      {item.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </details>

            <Button asChild>
              <Link href={project.caseStudyUrl}>
                Read the case study
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </>
  );
}
