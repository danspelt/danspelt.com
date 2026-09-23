# Project Status — danspelt.com

**Last updated:** September 23, 2026  
**Status:** Stable / live in production  
**Live:** https://danspelt.com · https://www.danspelt.com · https://danspelt.ca · https://www.danspelt.ca (all four serve this app)  
**Deploy:** Coolify → `main` branch, Dockerfile build pack (Next.js standalone output) — `running:healthy`  
**Health:** `GET /api/health` → 200 `{"status":"ok","service":"danspelt.com"}` (verified 2026-09-23)  
**Repo state:** `main` checked out, clean, synced with origin

For a session handoff and operational notes, see [User Note](USER_NOTE.md).

---

## Where We Are

Personal portfolio and services site built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, deployed via **Coolify** (Dockerfile → standalone output). `DEPLOYMENT.md` was updated 2026-09-23 to reflect Coolify — it previously documented Vercel.

The `/work` page limits its **Apps and tools** section to completed, case-study-backed projects:

- Community Hive
- AccessLens

Other deployed or in-progress products remain on `/projects`, but do not appear as completed work on `/work`.

## Current Pages

- **Home** (`/`) — services, positioning, and project paths
- **About** (`/about`)
- **Employment** (`/employment`) — detailed career history and education
- **Projects** (`/projects`) — deployed apps plus in-development tools
- **Work** (`/work`) — completed portfolio work, case studies, and experience
- **Case Studies** (`/case-studies`)
- **Documentation** (`/documentation`) — public architecture, content-model, API, quality, and operations overview
- **Timeline** (`/timeline`)
- **Skills & Tools** (`/skillstools`)
- **FAQ** (`/faq`)
- **Contact** (`/contact`)
- **Accessibility** (`/accessibility`)
- **Custom Software** (`/custom-software`) — includes pricing model + "How we work" section
- **Insights** (`/insights`)
- **Build for Us** (`/build-for-us`)

## API Routes

- `/api/health`
- `/api/projects`
- `/api/github` and `/api/github-test`
- `/api/email`
- `/api/custom-software-inquiry`
- `/api/business-challenge`
- `/api/ai-chat` and `/api/ai-chat/email`

## Recent Milestones

1. Self-hosted **Umami analytics** added (site ID updated after service recreation).
2. Custom-software page gained pricing model + "How we work" process section.
3. Security headers added and API input handling tightened (2026-09-17).
4. `/work` shows only completed, case-study-backed apps: Community Hive and AccessLens.
5. Public `/documentation` and `/employment` pages shipped.

## Verification

```bash
npm run lint
npm run test:health   # scripts/health-check.mjs — hits the running server
npm run build
```

## What Needs To Get Done

- [ ] **Triage the 9 Dependabot vulnerabilities** on the default branch: https://github.com/danspelt/danspelt.com/security/dependabot
- [ ] Confirm `/api/health` is wired into the Coolify app's health-check settings
- [ ] Decide the fate of the 5 planned paid subdomains from `docs/hosting-and-deployment.md` (audit/quote/resume/content/concierge.danspelt.com) — the corresponding repos are archived, not deployed
- [ ] Keep `/work` limited to proof-backed completed projects unless the content rule intentionally changes

## Known Issues / Tech Debt

- 9 Dependabot alerts outstanding
- `docs/hosting-and-deployment.md` references repos that now live in `_archive/` — the money-apps plan is dormant
- `DEPLOYMENT.md` corrected 2026-09-23 (was Vercel, actual deploy is Coolify)

## Decision

**The project is done for now.** Site is live, healthy, and serving all four domains. Outstanding work is maintenance (Dependabot triage) plus a strategic call on the archived money-apps plan.
