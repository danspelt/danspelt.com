# User Note — danspelt.com

**Last updated:** September 13, 2026  
**Current state:** Portfolio work is paused for now. The site is stable, local `main` is synchronized with `origin/main`, and the working tree is clean.

## Portfolio rule to remember

The `/work` page should present completed, proof-backed portfolio projects only.

For now, that means the **Apps and tools** section should show only:

- Community Hive
- AccessLens

Other deployed or in-progress products — including CareBoard, Clarity Audit, AuditSpark, AI Receptionist, AI ResumeFixer, Christian Web Help, AI Content Writer, and AI Quote Generator — should remain available through `/projects`, but should not appear as completed work on `/work` unless they later receive a case study or equivalent project proof.

## Completed in the latest session

1. Installed missing local dependencies with `npm install --package-lock=false`.
2. Started the Next.js development server at `http://localhost:3000`.
3. Updated `src/data/all-work.js` so `/work` uses deployed apps that have a `caseStudyUrl`.
4. Confirmed `/work` contains only Community Hive and AccessLens.
5. Resolved a stale Next.js hot-reload error (`LIVE_APPS is not defined`) by restarting the dev server cleanly.
6. Added a public `/documentation` page covering content rules, project inventory, architecture, APIs, verification, deployment, and repository documentation.
7. Added the `/employment` page and related SEO, schema, sitemap, and navigation updates.
8. Merged the newer remote portfolio and business-documentation changes into local `main`.
9. Resolved all merge conflicts and pushed the complete update to `origin/main`.

## Changes included in the pushed update

- Public `/documentation` page
- Public `/employment` page
- Footer and sitemap links for `/documentation`
- Sitemap entry for `/employment`
- Site documentation entry in the `/work` professional-experience section
- Expanded homepage, about, contact, work, and global metadata
- Expanded Person and WebSite structured data
- Updated project-status and user handoff documentation
- Remote business-documentation and portfolio updates merged into local `main`

## Important Git state

- Local `main` is synchronized with `origin/main`.
- The working tree is clean.
- No force-push or history rewrite was used.
- The remote branch now contains both the earlier `/work` filter commit and the merged documentation/employment update.

## Verification commands

```bash
npm run dev
npm run lint
npm run build
```

Latest verified local result:

- `/` returned HTTP 200
- `/work` returned HTTP 200
- `/documentation` returned HTTP 200
- `/employment` returned HTTP 200
- `/work` app count was 2
- Community Hive and AccessLens rendered
- CareBoard and Clarity Audit did not render on `/work`
- `npm run lint` completed successfully

## Next time work resumes

1. Review `docs/PROJECT_STATUS.md` first.
2. Run `npm run lint` and `npm run build` before release-sensitive changes.
3. Confirm the latest Coolify deployment completed successfully.
4. Review GitHub Dependabot alerts; the push response reported 9 vulnerabilities on the default branch.
5. Keep `/work` limited to proof-backed completed projects unless the content rule intentionally changes.
