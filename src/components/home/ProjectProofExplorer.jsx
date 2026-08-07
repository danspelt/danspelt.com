'use client';

import { useCallback, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import {
  PROJECT_PROOF,
  PROJECT_PROOF_TABS,
  PROJECT_STATUS,
  getProjectsForAudience,
} from '@/data/project-proof';
import { useVisitorPath } from './VisitorPathProvider';

/** Map a visitor path to the audience tag used in the proof content. */
const PATH_TO_AUDIENCE = {
  hire: 'hire',
  business: 'business',
  'community-hive': 'product',
};

export default function ProjectProofExplorer() {
  const { path } = useVisitorPath();
  const baseId = useId();

  // All projects always remain visible; only the order and default change.
  const ordered = useMemo(() => getProjectsForAudience(PATH_TO_AUDIENCE[path]), [path]);

  const [activeSlug, setActiveSlug] = useState(null);
  const [activeTab, setActiveTab] = useState('problem');
  const tabRefs = useRef([]);

  const project = ordered.find((p) => p.slug === activeSlug) ?? ordered[0];

  const selectProject = useCallback((slug) => {
    setActiveSlug(slug);
    setActiveTab('problem');
    trackEvent('project_proof_viewed', { project: slug, tab: 'problem' });
  }, []);

  const selectTab = useCallback(
    (tabId) => {
      setActiveTab(tabId);
      trackEvent('project_proof_viewed', { project: project.slug, tab: tabId });
    },
    [project.slug]
  );

  const activeTabIndex = PROJECT_PROOF_TABS.findIndex((t) => t.id === activeTab);

  const handleTabKeyDown = useCallback(
    (event) => {
      const last = PROJECT_PROOF_TABS.length - 1;
      let next = null;

      if (event.key === 'ArrowRight') next = activeTabIndex === last ? 0 : activeTabIndex + 1;
      else if (event.key === 'ArrowLeft') next = activeTabIndex === 0 ? last : activeTabIndex - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = last;

      if (next === null) return;
      event.preventDefault();
      selectTab(PROJECT_PROOF_TABS[next].id);
      tabRefs.current[next]?.focus();
    },
    [activeTabIndex, selectTab]
  );

  return (
    <section
      id="proof"
      aria-labelledby="proof-heading"
      className="scroll-mt-20 border-b border-border/60 bg-muted/20"
    >
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="max-w-2xl mb-8">
          <h2 id="proof-heading" className="text-3xl sm:text-4xl font-semibold mb-3">
            Engineering proof
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Pick a project, then look at the part you care about — the problem, the approach, the
            decisions and their tradeoffs, the outcomes, or the stack.
          </p>
        </div>

        {/* Project selector. Plain buttons rather than a second tabs widget so
            the nesting stays understandable to screen readers. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {ordered.map((item) => {
            const selected = item.slug === project.slug;
            return (
              <button
                key={item.slug}
                type="button"
                aria-pressed={selected}
                onClick={() => selectProject(item.slug)}
                className={cn(
                  'text-left rounded-xl border p-4 transition-colors focus-ring',
                  selected ? 'border-primary bg-primary/10' : 'border-border bg-card hover:bg-muted/60'
                )}
              >
                <span className="flex items-center gap-2 mb-1.5">
                  <span className="font-semibold">{item.title}</span>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
                    {PROJECT_STATUS[item.status].label}
                  </Badge>
                </span>
                <span className="block text-sm text-muted-foreground leading-relaxed">
                  {item.tagline}
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-7">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-5">
            <h3 className="text-2xl font-semibold">{project.title}</h3>
            <p className="text-sm text-muted-foreground">{project.role}</p>
          </div>

          <div
            role="tablist"
            aria-label={`${project.title} details`}
            onKeyDown={handleTabKeyDown}
            className="flex flex-wrap gap-2 mb-6"
          >
            {PROJECT_PROOF_TABS.map((tab, index) => {
              const selected = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(tab.id)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-ring',
                    selected
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:bg-muted'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`${baseId}-panel-${activeTab}`}
            aria-labelledby={`${baseId}-tab-${activeTab}`}
            tabIndex={0}
            className="focus-ring rounded-lg"
          >
            {activeTab === 'problem' && (
              <p className="leading-relaxed text-muted-foreground">{project.problem}</p>
            )}

            {activeTab === 'approach' && (
              <p className="leading-relaxed text-muted-foreground">{project.approach}</p>
            )}

            {activeTab === 'decisions' && (
              <ul className="space-y-5">
                {project.decisions.map((decision) => (
                  <li key={decision.choice}>
                    <p className="font-medium mb-1">{decision.choice}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">Why: </span>
                      {decision.reason}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">Tradeoff: </span>
                      {decision.tradeoff}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'outcomes' && (
              <ul className="space-y-3">
                {project.outcomes.map((outcome) => (
                  <li key={outcome.label} className="text-muted-foreground leading-relaxed">
                    {outcome.label}
                    {outcome.evidence && (
                      <span className="block text-xs mt-0.5 text-muted-foreground/80">
                        Evidence: {outcome.evidence}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'stack' && (
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <Button asChild>
              <Link href={project.caseStudyUrl}>
                Full details
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
            {project.liveUrl && (
              <Button asChild variant="outline">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('outbound_project_visit', {
                      project: project.slug,
                      destination_type: 'live_site',
                    })
                  }
                >
                  Visit live site
                  <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Button>
            )}
          </div>
        </div>

        <p className="sr-only">
          {PROJECT_PROOF.length} projects are available in this explorer regardless of the path you
          selected.
        </p>
      </div>
    </section>
  );
}
