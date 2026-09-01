'use client';

import { useCallback, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import {
  COMMUNITY_HIVE_DEMO_URL,
  COMMUNITY_HIVE_ROLES,
  COMMUNITY_HIVE_SCREENSHOTS,
  PROJECT_STATUS,
  getProjectProof,
} from '@/data/project-proof';
import CommunityHiveSlideshow from '@/components/community-hive/CommunityHiveSlideshow';

const project = getProjectProof('community-hive');
const status = PROJECT_STATUS[project.status];

export default function CommunityHiveSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const baseId = useId();

  const activate = useCallback((index) => {
    setActiveIndex(index);
    trackEvent('community_hive_role_viewed', { role: COMMUNITY_HIVE_ROLES[index].id });
  }, []);

  // ARIA tabs keyboard pattern: arrows move and activate, Home/End jump.
  const handleKeyDown = useCallback(
    (event) => {
      const last = COMMUNITY_HIVE_ROLES.length - 1;
      let next = null;

      if (event.key === 'ArrowRight') next = activeIndex === last ? 0 : activeIndex + 1;
      else if (event.key === 'ArrowLeft') next = activeIndex === 0 ? last : activeIndex - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = last;

      if (next === null) return;
      event.preventDefault();
      activate(next);
      tabRefs.current[next]?.focus();
    },
    [activeIndex, activate]
  );

  const active = COMMUNITY_HIVE_ROLES[activeIndex];

  return (
    <section
      id="community-hive"
      aria-labelledby="community-hive-heading"
      className="scroll-mt-20 border-b border-border/60"
    >
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="max-w-3xl mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10">
              {status.label}
            </Badge>
            <Badge variant="outline">Multi-tenant SaaS</Badge>
            <Badge variant="outline">Built solo</Badge>
          </div>
          <h2 id="community-hive-heading" className="text-3xl sm:text-4xl font-semibold mb-3">
            Community Hive
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            One example of how I adapt software to a real business. Built for property managers, shaped by residents and councils.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Product screen. Dimensions are reserved to avoid layout shift. */}
          <CommunityHiveSlideshow screenshots={COMMUNITY_HIVE_SCREENSHOTS} />

          <div>
            <div
              role="tablist"
              aria-label="Community Hive by role"
              onKeyDown={handleKeyDown}
              className="flex flex-wrap gap-2 mb-6"
            >
              {COMMUNITY_HIVE_ROLES.map((role, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={role.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${role.id}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel-${role.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => activate(index)}
                    className={cn(
                      'btn-3d rounded-full border px-4 py-2 text-sm font-medium focus-ring',
                      selected
                        ? 'border-primary bg-primary text-primary-foreground shadow-md'
                        : 'border-border bg-card text-muted-foreground hover:bg-muted'
                    )}
                  >
                    {role.label}
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`${baseId}-panel-${active.id}`}
              aria-labelledby={`${baseId}-tab-${active.id}`}
              tabIndex={0}
              className="space-y-5 rounded-xl border border-border/70 bg-card/60 p-5 glass focus-ring"
            >
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                  The problem
                </h3>
                <p className="leading-relaxed">{active.problem}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                  What is on screen
                </h3>
                <p className="leading-relaxed">{active.onScreen}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                  The result
                </h3>
                <p className="leading-relaxed">{active.result}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button asChild size="lg" className="btn-3d bg-accent text-accent-foreground hover:bg-accent/90">
                <Link
                  href="/contact?intent=community-hive"
                  onClick={() =>
                    trackEvent('contact_started', { source: 'community_hive_spotlight', path: 'community-hive' })
                  }
                >
                  <MessageSquare className="mr-2 w-4 h-4" aria-hidden="true" />
                  Request a demo
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="btn-3d">
                <Link
                  href="/contact?intent=hire"
                  onClick={() =>
                    trackEvent('contact_started', { source: 'community_hive_spotlight', path: 'hire' })
                  }
                >
                  Discuss a role
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="btn-3d">
                <a
                  href={COMMUNITY_HIVE_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('outbound_project_visit', {
                      project: 'community-hive',
                      destination_type: 'demo',
                    })
                  }
                >
                  Try the live demo
                  <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">(opens communityhive.ca in a new tab)</span>
                </a>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-5">
              Built and operated by me: {project.stack.slice(0, 6).join(', ')}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
