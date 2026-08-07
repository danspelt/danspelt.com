'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import { useVisitorPath } from './VisitorPathProvider';

const DISMISS_KEY = 'danspelt:smart-cta-dismissed';

/** Roughly one viewport of scrolling before the CTA is allowed to appear. */
const SCROLL_TRIGGER_RATIO = 0.9;

/** Below this viewport height a fixed bar would crowd the page too much. */
const MIN_VIEWPORT_HEIGHT = 520;

export default function SmartCta() {
  const { path, cta } = useVisitorPath();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const trackedRef = useRef(false);

  useEffect(() => {
    let wasDismissed = false;
    try {
      wasDismissed = window.sessionStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      // Storage can be blocked; treat that as not dismissed.
    }
    setDismissed(wasDismissed);
    if (wasDismissed) return;

    const evaluate = () => {
      // Do not compete with an open dialog, and do not pin on short viewports.
      const dialogOpen = document.body.hasAttribute('data-scroll-locked')
        || document.querySelector('[role="dialog"][data-state="open"]') !== null;
      const tallEnough = window.innerHeight >= MIN_VIEWPORT_HEIGHT;
      const scrolledEnough = window.scrollY > window.innerHeight * SCROLL_TRIGGER_RATIO;

      setVisible(tallEnough && scrolledEnough && !dialogOpen);
    };

    evaluate();
    window.addEventListener('scroll', evaluate, { passive: true });
    window.addEventListener('resize', evaluate);
    return () => {
      window.removeEventListener('scroll', evaluate);
      window.removeEventListener('resize', evaluate);
    };
  }, []);

  useEffect(() => {
    if (visible && !trackedRef.current) {
      trackedRef.current = true;
      trackEvent('smart_cta_shown', { path: path ?? 'none' });
    }
  }, [visible, path]);

  function dismiss() {
    setDismissed(true);
    setVisible(false);
    trackEvent('smart_cta_dismissed', { path: path ?? 'none' });
    try {
      window.sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // Dismissal still applies for this page view.
    }
  }

  if (dismissed || !visible) return null;

  return (
    // aria-hidden is not used: the CTA is real content. It is placed after the
    // main landmark in the DOM and never receives focus automatically.
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md print:hidden"
      role="complementary"
      aria-label="Suggested next step"
    >
      <div className="container mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
        <p className="hidden sm:block text-sm text-muted-foreground flex-1 truncate">
          Ready when you are — no obligation.
        </p>
        <Button asChild size="sm" className="flex-1 sm:flex-none">
          <Link
            href={cta.href}
            onClick={() => trackEvent('contact_started', { source: 'smart_cta', path: path ?? 'none' })}
          >
            {cta.label}
          </Link>
        </Button>
        <button
          type="button"
          onClick={dismiss}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted focus-ring"
          aria-label="Dismiss this suggestion"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
