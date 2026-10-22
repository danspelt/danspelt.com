# Project Status — danspelt.com

**Last updated:** October 22, 2026
**Status:** Live and healthy; local verification passes
**Live:** https://danspelt.com · https://www.danspelt.com · https://danspelt.ca · https://www.danspelt.ca
**Deploy:** Coolify → `main` branch, Dockerfile build pack — `running:healthy`
**Health:** `GET /api/health` → 200 (verified 2026-09-25)
**Repo state:** `main`; existing local health-check improvements retained

For a session handoff and operational notes, see [User Note](USER_NOTE.md).

---

## Where We Are

Personal portfolio and services site built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, deployed via Coolify. The site is a professional portfolio and services site, not a hobby-projects site.

**Current products:** Community Hive (strata and community-association portal, communityhive.ca) and CareBoard (household care-task tracker, care.danspelt.com). AccessLens is no longer an active product.

**Case studies:** Community Hive, CareBoard and **Digital Notices** (`/case-studies/digital-notices`, added Oct 2026 in PR #4 with 3 screenshots). The `/work` page should show only proof-backed completed work. Other in-progress items stay on `/projects`.

## Current Pages

Home, About, Employment, Projects, Work, Case Studies, Documentation, Timeline, Skills & Tools, FAQ, Contact, Accessibility, Custom Software, Insights, and Build for Us.

## Verification

```bash
npm run lint
npm run test:health                              # scripts/health-check.mjs (defaults to localhost:3000)
npm run test:health -- https://danspelt.com      # health + legal/footer smoke against production
npm run build
npm audit                                        # 0 reported vulnerabilities (2026-09-25)
```

## Recent Changes

- Oct 2026: Digital Notices case study published and deployed through Coolify.
- Oct 2026: README and status refreshed. Private business documents moved out of the public repo.

## What Needs To Get Done

- [ ] Decide whether the AccessLens case study page should stay on the site now that AccessLens is no longer active

- [ ] Confirm the separate GitHub Dependabot alert page; the current local `npm audit` reports zero vulnerabilities, but it does not prove the GitHub alert page is clear
- [ ] Confirm `/api/health` is configured as the Coolify health-check path
- [x] Safe default: keep the five planned paid subdomains dormant and archived; do not provision DNS or deployments unless Dan explicitly asks to revive them
- [ ] Keep `/work` limited to proof-backed completed projects unless the content policy intentionally changes

## Known Issues / Tech Debt

- `docs/hosting-and-deployment.md` references money-app repositories now in `_archive/`; the plan is dormant pending a decision
- Current verified local dependency audit is clean; GitHub Dependabot status still needs confirmation
- `DEPLOYMENT.md` now reflects the actual Coolify setup
