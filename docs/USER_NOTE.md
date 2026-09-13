# User Note — danspelt.com

**Last updated:** September 13, 2026  
**Current state:** Portfolio work is paused for now. The site is stable, and the latest requested `/work` change has been pushed to `origin/main`.

## Portfolio rule to remember

The `/work` page should present completed, proof-backed portfolio projects only.

For now, that means the **Apps and tools** section should show only:

- Community Hive
- AccessLens

Other deployed or in-progress products — including CareBoard, Clarity Audit, AuditSpark, AI Receptionist, AI ResumeFixer, Christian Web Help, AI Content Writer, and AI Quote Generator — should remain available through the detailed `/projects` page, but should not appear as completed work on `/work` unless they later receive a case study or equivalent project proof.

## Completed in the latest session

1. Installed missing local dependencies with `npm install --package-lock=false`.
2. Started the Next.js development server at `http://localhost:3000`.
3. Updated `src/data/all-work.js` so `/work` uses deployed apps that have a `caseStudyUrl`.
4. Confirmed the resulting `/work` apps list contains only Community Hive and AccessLens.
5. Resolved a stale Next.js hot-reload error (`LIVE_APPS is not defined`) by restarting the dev server cleanly.
6. Verified `npm run lint` passes and `/work` returns HTTP 200.
7. Pushed commit `952499d` (`fix: limit work page to completed projects`) to `origin/main`.
8. Added a public `/documentation` page that explains the portfolio's content rules, project register, architecture, APIs, verification process, deployment model, and repository documentation.

## Important Git state

The `/work` filter was pushed from a temporary clean worktree so unrelated local edits were not accidentally included.

Local `main` is still diverged:

- **1 commit ahead:** `bdf491a Remove WindowsHelperSuite from portfolio`
- **6 commits behind** `origin/main`
- Remote `main` already contains a newer WindowsHelperSuite removal (`1563b7a`), several portfolio/content updates, and the pushed `/work` fix (`952499d`).

Do not force-push. Before committing more work, review the local edits and reconcile local `main` with `origin/main`.

## Local changes that are not pushed yet

These changes are present in the working tree but were intentionally left uncommitted:

- New untracked `/employment` page at `src/app/employment/page.js`
- `/about` SEO metadata, Person schema, and a link to employment history
- `/contact` SEO metadata updates
- Global metadata updates in `src/app/layout.js`
- Homepage SEO metadata and expanded Person schema keywords
- `/work` metadata updates
- Sitemap update adding `/employment`
- The `/work` completed-project filter in `src/data/all-work.js`
- New public `/documentation` page at `src/app/documentation/page.jsx`
- Footer and sitemap links for `/documentation`
- A Site documentation entry in the `/work` professional-experience section

Some of these files overlap with newer remote changes, so they need review before committing or syncing.

## Verification commands

```bash
npm run dev
npm run lint
npm run build
```

Latest verified local result:

- `/work` returned HTTP 200
- `/work` app count was 2
- Community Hive and AccessLens rendered
- CareBoard and Clarity Audit did not render
- `npm run lint` completed successfully

## Next time work resumes

1. Review the uncommitted local changes listed above.
2. Sync local `main` with `origin/main` without losing the local edits.
3. Decide whether the new `/employment` page and SEO updates should be committed.
4. Run lint and a production build.
5. Confirm the Coolify deployment after pushing.
6. Review GitHub Dependabot alerts; the push response reported 9 vulnerabilities on the default branch.
