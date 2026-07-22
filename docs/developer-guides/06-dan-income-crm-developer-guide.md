# Developer Guide: Dan Income CRM

**Project path:** `E:\Git\dan-income-crm`  
**GitHub repo (planned):** `dan-income-crm`  
**Pattern source:** Adapted from [Community Hive Sales Worker](../../community-hive-sales-worker) (`E:\Git\community-hive-sales-worker`)

Dan Income CRM is a **private** automated CRM that helps Dan Spelt find income through jobs, contract work, freelance projects, agency overflow, nonprofits, and businesses that need web development.

## MVP scope

- Research workers (jobs, businesses, agencies)
- SQLite lead storage with fit scoring
- Outreach **drafts only** (stored in DB — no auto-send)
- React dashboard with **Run Full Pipeline**
- Phase 2 stubs: Outlook drafts, reply tracker, follow-ups, website audit, daily report

## Safety defaults

```env
AUTO_SEND=false
MAX_DAILY_DRAFTS=10
```

Never enable auto-send in MVP. All outreach is review-first.

## Tech stack

- Node.js 20 + TypeScript + Express
- SQLite (`better-sqlite3`)
- OpenAI + SerpAPI (or other search provider)
- React + Vite + Tailwind CSS
- Microsoft Graph / Outlook (phase 2)

## Quick setup

```bash
cd E:\Git\dan-income-crm
npm install
cp .env.example .env
# Fill OPENAI_API_KEY and SEARCH_API_KEY in .env

npm run dev          # API → http://localhost:3000
npm run dev:client   # UI  → http://localhost:5173
```

### Windows note

`better-sqlite3` requires native build tools on Windows (Visual Studio “Desktop development with C++”) or a matching prebuilt binary. If install fails, install build tools or run on Linux/WSL.

## Worker CLI

```bash
npm run worker -- job-research
npm run worker -- business-research
npm run worker -- agency-research
npm run worker -- fit-score
npm run worker -- draft-outreach
npm run worker -- all
```

## Key files

| Path | Purpose |
|------|---------|
| `src/profile/dan-profile.ts` | Source of truth for skills, services, outreach tone |
| `src/db/schema.sql` | Targets, opportunities, messages, events |
| `src/workers/full-pipeline.worker.ts` | End-to-end MVP pipeline |
| `src/config/env.ts` | Environment + safety limits |
| `client/src/pages/Overview.tsx` | Run Full Pipeline button |

## API endpoints

```txt
GET  /api/health
GET  /api/targets
GET  /api/jobs
POST /api/agents/full-pipeline
POST /api/agents/job-research
POST /api/agents/business-research
POST /api/agents/agency-research
POST /api/agents/draft-outreach
```

## Environment variables

See `.env.example` in the project root. Required for live research:

- `OPENAI_API_KEY`
- `SEARCH_API_KEY` (with `SEARCH_PROVIDER=serpapi`)

Optional (phase 2):

- `MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET`, `OUTLOOK_USER_ID`

## Build & verify

```bash
npm run build          # tsc + client build
npx tsc --noEmit       # backend type-check only
cd client && npm run build
```

## Git initialization

The project is initialized with logical commits matching the build guide:

1. Initialize Dan Income CRM project
2. Add backend dependencies and TypeScript setup
3. Create backend project structure
4. Add environment example
5. Add Dan profile source of truth
6. Add database schema
7. Add environment config
8. Add targets repository
9. Add Express API routes
10. Add web search service
11. Add OpenAI JSON service
12. Add lead scoring service
13. Add outreach message templates
14. Add MVP research scoring and draft workers
15. Add worker CLI entry point
16. Add React client app
17. Add MVP CRM frontend
18. Complete Dan Income CRM MVP

```bash
git remote add origin https://github.com/danspelt/dan-income-crm.git
git push -u origin main
```

## Phase 2 roadmap

1. Microsoft Graph Outlook draft creation
2. Reply tracker + follow-up worker
3. Website audit crawler
4. Daily report email draft
5. Authentication + deployment (Docker / Coolify)
6. Cron scheduler

## Full build guide

The complete step-by-step build guide (all source file contents) was used to scaffold this project. For the full guide text, see the Dan Income CRM build conversation or expand this doc with the detailed file-by-file instructions.

## Related projects

- **Community Hive Sales Worker** — original sales automation architecture (`E:\Git\community-hive-sales-worker`)
- **danspelt.com** — Dan's portfolio and public-facing site
