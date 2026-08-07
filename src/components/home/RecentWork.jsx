'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { RECENT_WORK } from '@/data/recent-work';

const dateFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

function formatDate(iso) {
  // Parse as UTC so the displayed date matches the authored date everywhere.
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

export default function RecentWork() {
  if (RECENT_WORK.length === 0) return null;

  return (
    <section aria-labelledby="recent-work-heading" className="border-b border-border/60 bg-muted/20">
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="max-w-2xl mb-8">
          <h2 id="recent-work-heading" className="text-3xl font-semibold mb-3">
            Recent work
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            What changed lately, and why it mattered.
          </p>
        </div>

        <ol className="space-y-4">
          {RECENT_WORK.map((item) => (
            <li
              key={`${item.date}-${item.project}-${item.url}`}
              className="rounded-xl border border-border/70 bg-card p-5"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <h3 className="font-semibold">{item.project}</h3>
                <time dateTime={item.date} className="text-sm text-muted-foreground">
                  {formatDate(item.date)}
                </time>
              </div>
              <p className="leading-relaxed mb-2">{item.change}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                <span className="font-medium text-foreground">Why it matters: </span>
                {item.whyItMatters}
              </p>
              <Link
                href={item.url}
                onClick={() => trackEvent('recent_work_opened', { project: item.project })}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline focus-ring rounded"
              >
                See it
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
