'use client';

import { useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { VISITOR_PATHS } from '@/data/visitor-paths';
import { useVisitorPath } from './VisitorPathProvider';

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function AudiencePathChooser() {
  const { path, selectPath } = useVisitorPath();

  const handleSelect = useCallback(
    (option) => {
      selectPath(option.id);
      trackEvent('path_selected', { path: option.id, page: 'home' });

      // Scroll only as a result of this user action, and never fight the
      // visitor's motion preference.
      const target = document.querySelector(option.target);
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    },
    [selectPath]
  );

  return (
    <section
      aria-labelledby="audience-chooser-heading"
      className="border-b border-border/60 bg-muted/30"
    >
      <div className="container mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <h2 id="audience-chooser-heading" className="text-lg font-semibold mb-1">
          What brings you here?
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Pick a path and I will point you at the most useful thing first. Nothing gets hidden.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {VISITOR_PATHS.map((option) => {
            const selected = path === option.id;
            return (
              <li key={option.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    'group w-full h-full text-left rounded-xl border p-5 transition-colors focus-ring',
                    selected
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:bg-muted/60'
                  )}
                >
                  <span className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-semibold">{option.label}</span>
                    <ArrowRight
                      className={cn(
                        'w-4 h-4 shrink-0 transition-transform motion-reduce:transition-none',
                        selected ? 'text-primary' : 'text-muted-foreground group-hover:translate-x-0.5'
                      )}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="block text-sm text-muted-foreground leading-relaxed">
                    {option.description}
                  </span>
                  {selected && (
                    <span className="mt-3 block text-xs font-medium text-primary">
                      Selected — recommendations below are tuned to this.
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
