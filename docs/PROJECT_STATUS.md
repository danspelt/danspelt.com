# Project Status — danspelt.com

**Last updated:** September 13, 2026  
**Status:** Stable / paused for now  
**Latest remote commit:** `952499d` — `fix: limit work page to completed projects`

For a session handoff and important Git notes, see [User Note](USER_NOTE.md).

---

## Where We Are

danspelt.com is a personal portfolio and services site built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. Production deployment is handled through **Coolify** using the Dockerfile build pack and Next.js standalone output.

Primary domains:

- https://danspelt.com / https://www.danspelt.com
- https://danspelt.ca / https://www.danspelt.ca

The `/work` page now limits its **Apps and tools** section to completed, case-study-backed projects:

- Community Hive
- AccessLens

Other deployed or in-progress products remain on `/projects`, but do not appear as completed work on `/work`.

## Current Pages

- **Home** (`/`) — services, positioning, and project paths
- **About** (`/about`)
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

Pending local-only page:

- **Employment** (`/employment`) — exists in the working tree but is not committed or pushed yet

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
2. A public `/documentation` page now documents the content model, project register, architecture, APIs, verification, and repository documentation.
3. Commit `952499d` was pushed to `origin/main` from a clean temporary worktree.
3. WindowsHelperSuite was removed from the remote portfolio history in commit `1563b7a`.
4. Remote `main` includes newer portfolio content and business documentation updates that local `main` has not synced yet.
5. Local working tree contains an uncommitted SEO and employment-history update set.

## Local Work Needing Review

The following local changes are not pushed:

- New `/employment` page
- About, contact, homepage, global, and work metadata improvements
- Person schema additions
- Sitemap entry for `/employment`
- `/work` completed-project filter
- Public `/documentation` page, footer link, sitemap entry, and work-directory documentation link

Local `main` is currently **1 ahead and 6 behind** `origin/main`. Review and reconcile before committing more work.

## Verification

Latest local verification:

- `npm run lint` passes
- `/work` returns HTTP 200
- `/work` app count is 2
- Community Hive and AccessLens render
- CareBoard and Clarity Audit do not render

## Known Issues / Tech Debt

- Local branch is diverged from `origin/main` and has unrelated uncommitted edits.
- GitHub reported **9 Dependabot vulnerabilities** on the default branch at push time: https://github.com/danspelt/danspelt.com/security/dependabot
- Coolify health reporting may remain limited unless a dedicated health-check endpoint is configured.
- Local `node_modules` required reinstalling during the last session.

## Resume Checklist

1. Review `docs/USER_NOTE.md`.
2. Preserve the uncommitted local edits.
3. Sync local `main` with `origin/main`.
4. Decide whether to commit the `/employment` and SEO updates.
5. Run `npm run lint` and `npm run build`.
6. Confirm the next Coolify deployment.

## Decision

**The project is done for now.** The requested `/work` behavior is implemented and pushed. Remaining work is Git cleanup and review of the uncommitted SEO/employment updates.
