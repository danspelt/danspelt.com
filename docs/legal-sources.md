# Legal page sources and notes

The four legal-information pages (`/privacy-policy`, `/terms-of-use`,
`/cookie-policy`, `/accessibility-statement`) were drafted September 2026 as
practical drafts. They should be reviewed by a qualified BC lawyer before being
relied on for material legal risk.

## What the content is grounded in

The pages describe only what the code actually does, verified by inventory:

- Contact/inquiry/challenge forms send submissions to the operator's inbox via
  Resend (`src/app/api/email`, `src/app/api/custom-software-inquiry`,
  `src/app/api/business-challenge`, `src/app/api/ai-chat/email`). Nothing is
  persisted in a site database.
- "Ask Dan" chat sends message text to OpenAI (`src/app/api/ai-chat`); a
  transcript can be emailed only with an explicit consent checkbox.
- Analytics is a self-hosted Umami instance (stats.danspelt.com) loaded in
  `src/app/layout.js`; `src/lib/analytics.js` enforces an allowlist of
  non-personal event properties.
- No `document.cookie` usage anywhere in `src/` — the site sets no cookies.
  Browser storage used: `localStorage` key `theme` (next-themes) and
  `sessionStorage` keys `danspelt:visitor-path`,
  `danspelt:smart-cta-dismissed`.
- Rate limiting keeps raw client IP keys in memory only (`src/lib/rate-limit.js`).
- Intro video is self-hosted (`/videos/intro.mp4`) with captions/transcript —
  no third-party embeds.

## Primary sources consulted

- OIPC BC — A Guide to B.C.'s Personal Information Protection Act:
  https://www.oipc.bc.ca/documents/guidance-documents/1371
- OIPC BC — Developing a Privacy Policy under PIPA:
  https://oipc.bc.ca/documents/guidance-documents/2164
- OIPC BC — For Private Organizations: https://oipc.bc.ca/for-private-organizations/
- OIPC BC — Legislation (PIPA scope): https://www.oipc.bc.ca/about/legislation/
- Accessible British Columbia Act + Regulation (BC Reg 105/2022 — prescribed
  organizations are public-sector bodies; this site is not prescribed):
  https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/105_2022
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- W3C conformance guidance ("partial conformance" has narrow criteria and is
  not used as a general label for an incomplete audit):
  https://www.w3.org/WAI/WCAG22/Understanding/conformance
- OPC Canada — how PIPEDA and BC PIPA apply to interprovincial/international
  transactions:
  https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/r_o_p/02_05_d_26/

CASL was considered and is not engaged: the site sends no commercial electronic
messages beyond direct replies to inquiries.

## Maintenance

When site behavior changes (new forms, analytics, embeds, cookies, third-party
services), update the affected page and the "Last updated" date.
