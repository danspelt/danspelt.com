# Project Status — danspelt.com

**Last updated:** September 25, 2026
**Status:** Live and healthy; local verification passes
**Live:** https://danspelt.com · https://www.danspelt.com · https://danspelt.ca · https://www.danspelt.ca
**Deploy:** Coolify → `main` branch, Dockerfile build pack — `running:healthy`
**Health:** `GET /api/health` → 200 (verified 2026-09-25)
**Repo state:** `main`; existing local health-check improvements retained

For a session handoff and operational notes, see [User Note](USER_NOTE.md).

---

## Where We Are

Personal portfolio and services site built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, deployed via Coolify. The `/work` page shows only completed, case-study-backed apps: Community Hive and AccessLens. Other deployed or in-progress products stay on `/projects`.

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

## What Needs To Get Done

- [ ] Confirm the separate GitHub Dependabot alert page; the current local `npm audit` reports zero vulnerabilities, but it does not prove the GitHub alert page is clear
- [ ] Confirm `/api/health` is configured as the Coolify health-check path
- [x] Safe default: keep the five planned paid subdomains dormant and archived; do not provision DNS or deployments unless Dan explicitly asks to revive them
- [ ] Keep `/work` limited to proof-backed completed projects unless the content policy intentionally changes

## Known Issues / Tech Debt

- `docs/hosting-and-deployment.md` references money-app repositories now in `_archive/`; the plan is dormant pending a decision
- Current verified local dependency audit is clean; GitHub Dependabot status still needs confirmation
- `DEPLOYMENT.md` now reflects the actual Coolify setup
