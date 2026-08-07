// Captioned introduction video.
//
// The transcript is the complete alternative to the video, so this section is
// deliberately gated: it does not render until real captions and a real
// transcript exist. Inventing Dan's spoken words would be worse than showing
// nothing.
//
// To enable it:
//  1. Add a WebVTT caption file at `public/videos/intro.en.vtt`.
//  2. Add a poster image at `public/images/intro-poster.jpg` (or update below).
//  3. Paste the real transcript paragraphs into `transcript`.
//  4. Set `enabled` to true.

export const INTRO_VIDEO = {
  enabled: false,
  src: '/videos/intro.mp4',
  captionsSrc: '/videos/intro.en.vtt',
  poster: '/images/intro-poster.jpg',
  // Reserve the correct box to avoid layout shift. Update if the file differs.
  width: 1280,
  height: 720,
  title: 'A 60-second introduction',
  description:
    'What I build, how I approach a business problem, and the kind of work I am looking for.',
  /** Real transcript paragraphs. Must match the audio exactly. */
  transcript: [],
};

export function isIntroVideoReady() {
  return Boolean(
    INTRO_VIDEO.enabled &&
      INTRO_VIDEO.src &&
      INTRO_VIDEO.captionsSrc &&
      INTRO_VIDEO.transcript.length > 0
  );
}
