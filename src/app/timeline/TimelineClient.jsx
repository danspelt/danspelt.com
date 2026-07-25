'use client';

import Timeline2D from './Timeline2D';

export default function TimelineClient() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 pt-16 sm:pt-20 pb-8">
        <h1 className="text-4xl sm:text-5xl font-semibold mb-3">Professional journey</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Career progression across accessibility, AI products, and full-stack systems —
          from CanAssist to AccessLens.
        </p>
      </div>
      <Timeline2D />
    </div>
  );
}
