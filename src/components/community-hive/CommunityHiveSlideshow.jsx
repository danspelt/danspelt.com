'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function CommunityHiveSlideshow({ screenshots, className }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const baseId = useId();
  const containerRef = useRef(null);

  const last = screenshots.length - 1;

  const go = useCallback((index) => {
    const next = Math.max(0, Math.min(last, index));
    setActive(next);
    trackEvent('community_hive_screenshot_viewed', { index: next, id: screenshots[next]?.id });
  }, [last, screenshots]);

  const next = useCallback(() => go(active === last ? 0 : active + 1), [active, go, last]);
  const prev = useCallback(() => go(active === 0 ? last : active - 1), [active, go, last]);

  // Auto-advance every 5s unless paused, focused, or reduced motion.
  useEffect(() => {
    if (screenshots.length <= 1 || paused || focused || prefersReducedMotion()) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [screenshots.length, paused, focused, next]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(last);
  }, [go, last, next, prev]);

  return (
    <figure
      ref={containerRef}
      className={cn('float-3d rounded-xl overflow-hidden ring-1 ring-border/60 bg-card glass shadow-2xl', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Community Hive screenshots"
      onKeyDown={handleKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={0}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/60 bg-muted/50" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
        <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
        <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        {screenshots.map((shot, index) => (
          <div
            key={shot.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${screenshots.length}: ${shot.caption}`}
            aria-hidden={index !== active}
            className={cn(
              'absolute inset-0 transition-opacity duration-500 ease-out',
              index === active ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            <Image
              src={shot.src}
              alt={index === active ? shot.alt : ''}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover object-top"
              priority={index === 0}
            />
          </div>
        ))}

        {screenshots.length > 1 && (
          <>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 btn-3d opacity-80 hover:opacity-100 focus-ring"
              onClick={prev}
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 btn-3d opacity-80 hover:opacity-100 focus-ring"
              onClick={next}
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </>
        )}
      </div>

      <figcaption className="px-4 py-3 border-t border-border/60 bg-card/60 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-foreground">
          {screenshots[active]?.caption}
        </span>
        <div className="flex items-center gap-2">
          {screenshots.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-muted focus-ring"
                aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              >
                {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              <div className="flex gap-1.5" role="tablist" aria-label="Screenshot pages">
                {screenshots.map((shot, index) => (
                  <button
                    key={shot.id}
                    type="button"
                    role="tab"
                    aria-selected={index === active}
                    aria-controls={`${baseId}-slide-${shot.id}`}
                    id={`${baseId}-tab-${shot.id}`}
                    onClick={() => go(index)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all focus-ring',
                      index === active ? 'bg-primary w-4' : 'bg-muted-foreground/40 hover:bg-muted-foreground'
                    )}
                    aria-label={`Go to ${shot.caption}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
