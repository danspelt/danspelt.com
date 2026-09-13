# Project Status — danspelt.com

**Last updated:** September 13, 2026  
**Status:** Stable / paused for now  
**Repository state:** Local `main` is synchronized with `origin/main`; working tree clean

For a session handoff and operational notes, see [User Note](USER_NOTE.md).

---

## Where We Are

danspelt.com is a personal portfolio and services site built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. Production deployment is handled through **Coolify** using the Dockerfile build pack and Next.js standalone output.

Primary domains:

- https://danspelt.com / https://www.danspelt.com
- https://danspelt.ca / https://www.danspelt.ca

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
- **Custom Software** (`/custom-software`)
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

1. `/work` now shows only completed, case-study-backed apps: Community Hive and AccessLens.
2. A public `/documentation` page documents the content model, project register, architecture, APIs, verification, and repository documentation.
3. A public `/employment` page documents career history and education.
4. Homepage, about, contact, work, and global metadata were expanded for clearer search and social presentation.
5. Remote portfolio and business-documentation updates were merged into local `main` and pushed back to `origin/main`.

## Verification

Latest local verification:

- `npm run lint` passes
- `/` returns HTTP 200
- `/work` returns HTTP 200
- `/documentation` returns HTTP 200
- `/employment` returns HTTP 200
- `/work` app count is 2
- Community Hive and AccessLens render
- CareBoard and Clarity Audit do not render on `/work`

## Known Issues / Tech Debt

- GitHub reported **9 Dependabot vulnerabilities** on the default branch at push time: https://github.com/danspelt/danspelt.com/security/dependabot
- Coolify health reporting may remain limited unless the `/api/health` endpoint is connected in the deployment settings.
- `node_modules` required reinstalling during the last session.

## Resume Checklist

1. Review `docs/USER_NOTE.md`.
2. Confirm the latest Coolify deployment completed successfully.
3. Run `npm run lint` and `npm run build` before release-sensitive changes.
4. Keep `/work` limited to proof-backed completed projects unless the content rule intentionally changes.
5. Review and triage Dependabot alerts.

## Decision

**The project is done for now.** The requested `/work` behavior, public documentation page, employment page, metadata improvements, and repository handoff documentation are implemented and pushed.
