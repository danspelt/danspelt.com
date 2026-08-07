'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { INTRO_VIDEO, isIntroVideoReady } from '@/data/intro-video';

const PLACEMENT = 'home';

export default function IntroVideo() {
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  // Renders nothing until real captions and a real transcript exist.
  if (!isIntroVideoReady()) return null;

  return (
    <section aria-labelledby="intro-video-heading" className="border-b border-border/60">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="max-w-2xl mb-6">
          <h2 id="intro-video-heading" className="text-3xl font-semibold mb-3">
            {INTRO_VIDEO.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{INTRO_VIDEO.description}</p>
        </div>

        {/* No autoplay, metadata preload only, and a poster so the box is stable. */}
        <video
          controls
          preload="metadata"
          poster={INTRO_VIDEO.poster}
          width={INTRO_VIDEO.width}
          height={INTRO_VIDEO.height}
          onPlay={() => trackEvent('intro_video_played', { placement: PLACEMENT })}
          className="w-full h-auto rounded-xl ring-1 ring-border/60 bg-black"
        >
          <source src={INTRO_VIDEO.src} type="video/mp4" />
          <track
            kind="captions"
            src={INTRO_VIDEO.captionsSrc}
            srcLang="en"
            label="English"
            default
          />
          Your browser cannot play this video. The full transcript is below.
        </video>

        <details
          className="mt-5 rounded-xl border border-border/70 bg-card p-5"
          onToggle={(event) => {
            const open = event.currentTarget.open;
            setTranscriptOpen(open);
            if (open) trackEvent('intro_transcript_opened', { placement: PLACEMENT });
          }}
        >
          <summary className="cursor-pointer font-medium focus-ring rounded">
            {transcriptOpen ? 'Hide transcript' : 'Read the transcript instead'}
          </summary>
          <div className="mt-4 space-y-3 text-muted-foreground leading-relaxed">
            {INTRO_VIDEO.transcript.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
