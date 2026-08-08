'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function useLightbox() {
  const [open, setOpen] = useState(false);

  const openLightbox = useCallback(() => {
    setOpen(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const closeLightbox = useCallback(() => {
    setOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeLightbox]);

  return { open, openLightbox, closeLightbox };
}

export default function CommunityHiveSlideshow({ screenshots, className }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const baseId = useId();
  const containerRef = useRef(null);
  const { open, openLightbox, closeLightbox } = useLightbox();

  const last = screenshots.length - 1;

  const go = useCallback((index) => {
    const next = Math.max(0, Math.min(last, index));
    setActive(next);
    trackEvent('community_hive_screenshot_viewed', { index: next, id: screenshots[next]?.id });
  }, [last, screenshots]);

  const next = useCallback(() => go(active === last ? 0 : active + 1), [active, go, last]);
  const prev = useCallback(() => go(active === 0 ? last : active - 1), [active, go, last]);

  // Auto-advance every 5s unless paused, hovered, in lightbox, or reduced motion.
  useEffect(() => {
    if (screenshots.length <= 1 || paused || hovered || open || prefersReducedMotion()) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [screenshots.length, paused, hovered, open, next]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(last);
  }, [go, last, next, prev]);

  const SlideTrack = ({ size = 'normal' }) => (
    <div className={cn('relative overflow-hidden bg-secondary', 'aspect-[16/9]')}>
      <div
        className={cn(
          'flex h-full w-full',
          prefersReducedMotion() ? '' : 'transition-transform duration-700 ease-out'
        )}
        style={{ transform: `translateX(-${active * 100}%)` }}
        aria-live="polite"
      >
        {screenshots.map((shot, index) => (
          <div
            key={shot.id}
            id={`${baseId}-slide-${shot.id}`}
            className="relative h-full w-full shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${screenshots.length}: ${shot.caption}`}
            aria-hidden={index !== active}
          >
            <Image
              src={shot.src}
              alt={index === active ? shot.alt : ''}
              fill
              sizes={size === 'normal' ? '(min-width: 1024px) 900px, 100vw' : '100vw'}
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {screenshots.length > 1 && (
        <>
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 btn-3d opacity-60 hover:opacity-100 focus-ring"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 btn-3d opacity-60 hover:opacity-100 focus-ring"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next screenshot"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </Button>
        </>
      )}

      <button
        type="button"
        onClick={openLightbox}
        className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-card/80 text-foreground opacity-0 transition-opacity hover:bg-card focus:opacity-100 focus-ring group-hover:opacity-100"
        aria-label="View screenshot full size"
        title="View full size"
      >
        <Maximize2 className="w-4 h-4" />
      </button>

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
        <p className="text-sm font-medium text-white drop-shadow-md">
          {screenshots[active]?.caption}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <figure
        ref={containerRef}
        className={cn('group float-3d rounded-2xl overflow-hidden ring-1 ring-border/60 bg-card glass shadow-2xl', className)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Community Hive screenshots"
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        tabIndex={0}
      >
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/60 bg-muted/50" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
        </div>

        <SlideTrack />

        <figcaption className="px-3 py-2.5 border-t border-border/60 bg-card/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {screenshots.length > 1 && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-muted focus-ring"
                aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              >
                {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            )}
            <span className="text-xs text-muted-foreground tabular-nums">
              {active + 1} / {screenshots.length}
            </span>
          </div>

          {screenshots.length > 1 && (
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
                    index === active ? 'bg-primary w-5' : 'bg-muted-foreground/40 hover:bg-muted-foreground'
                  )}
                  aria-label={`Go to ${shot.caption}`}
                />
              ))}
            </div>
          )}
        </figcaption>
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Community Hive screenshots full size"
        >
          <div
            className="relative w-full max-w-7xl rounded-2xl overflow-hidden bg-card shadow-2xl ring-1 ring-border/60"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/60 bg-muted/50">
              <span className="text-sm font-medium text-foreground">{screenshots[active]?.caption}</span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={closeLightbox}
                className="btn-3d focus-ring"
                aria-label="Close full size view"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <SlideTrack size="large" />

            <div className="flex items-center gap-2 p-3 border-t border-border/60 bg-card/60 overflow-x-auto">
              {screenshots.map((shot, index) => (
                <button
                  key={shot.id}
                  type="button"
                  onClick={() => go(index)}
                  className={cn(
                    'relative shrink-0 rounded-lg overflow-hidden ring-2 transition-all focus-ring',
                    index === active ? 'ring-primary' : 'ring-transparent hover:ring-primary/50'
                  )}
                  aria-label={`Go to ${shot.caption}`}
                  aria-current={index === active}
                >
                  <Image
                    src={shot.src}
                    alt=""
                    width={120}
                    height={75}
                    className="object-cover w-24 h-14 sm:w-32 sm:h-20"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
