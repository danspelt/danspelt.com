# Developer Guide: AI Resume and Cover Letter Fixer

Subdomain: `resume.danspelt.com`  
GitHub repo: `danspelt-ai-resume`

Users paste their resume and a job posting. The app rewrites resume summary, skills section, experience bullets, cover letter, interview answers, and LinkedIn headline.

## Money Idea

Pricing:

```txt
$15 single resume rewrite
$29 resume + cover letter
$49 full job application package
```

## MVP Pages

```txt
/
Landing page

/fix
Resume input form

/results/[id]
Generated resume improvements

/cover-letter
Cover letter generator

/interview
Interview answer generator
```

## Database Model

```js
ResumeJob {
  id: string
  userEmail: string
  resumeText: string
  jobPosting: string
  targetRole: string
  rewrittenSummary: string
  rewrittenBullets: Json
  coverLetter: string
  interviewAnswers: Json
  createdAt: Date
}
```

## Form Fields

```txt
Current resume text
Job posting text
Target job title
Tone: confident, senior, friendly, direct
Years of experience
Main skills
```

## AI Prompt

```txt
You are an expert resume writer for technology and business roles.

Rewrite this resume for the following job posting.

Resume:
{{resumeText}}

Job Posting:
{{jobPosting}}

Target Role:
{{targetRole}}

Return:
1. Strong professional summary
2. Improved skills section
3. Rewritten experience bullets
4. Missing keywords
5. Cover letter
6. 5 interview answers
```

## API Routes

```txt
POST /api/resume/create
GET /api/resume/[id]
POST /api/resume/export
POST /api/stripe/create-checkout
POST /api/stripe/webhook
```

## Git Setup Required

Each subdomain project must be its own Git repository. The developer must initialize Git separately for this project, make the first commit, and push to its own GitHub repository.

```txt
resume.danspelt.com  →  GitHub repo: danspelt-ai-resume
```

Do **not** combine this app with other subdomain projects in a monorepo. Each project is deployed and versioned independently.

## Developer Build Steps

```bash
npx create-next-app@latest danspelt-ai-resume
cd danspelt-ai-resume

npm install openai stripe prisma @prisma/client zod docx
npx prisma init

git init
git add .
git commit -m "Initial commit"

git branch -M main
git remote add origin https://github.com/danspelt/danspelt-ai-resume.git
git push -u origin main
```

## Initialize Git

After creating the Next.js app, the developer must run:

```bash
git init
git add .
git commit -m "Initial commit"
```

Then create a GitHub repository and connect it:

```bash
git branch -M main
git remote add origin https://github.com/danspelt/danspelt-ai-resume.git
git push -u origin main
```

## Environment Variables

```env
DATABASE_URL=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=https://resume.danspelt.com
```

## `.env.example` Requirement

Include a safe `.env.example` file (never commit real keys):

```env
DATABASE_URL=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=
```

## `.gitignore` Requirement

Each project must include a `.gitignore` with:

```gitignore
node_modules
.next
.env
.env.local
.env.production
.DS_Store
dist
build
coverage
.vercel
```

Very important: **never commit `.env` files** because they contain API keys.

## First Commit Checklist

Before the first push, the developer should confirm:

```txt
Project runs locally
.env.example exists
.gitignore exists
README.md exists
Initial app page loads
No API keys are committed
GitHub repo is connected
First commit is pushed to main
```

## README Requirement

Each repo should have a `README.md` like this:

````md
# AI Resume Fixer

Subdomain: https://resume.danspelt.com

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Required Environment Variables

* DATABASE_URL
* OPENAI_API_KEY
* STRIPE_SECRET_KEY
* STRIPE_WEBHOOK_SECRET
* NEXT_PUBLIC_APP_URL

## Git

This project is managed as its own Git repository.
````

## Export Options

Add export buttons:

```txt
Copy to clipboard
Download as .txt
Download as .docx
Download cover letter
```

## Why This Can Make Money

People actively pay for job help because it connects directly to income. This is one of the easiest AI services to explain.

## Recommended Stack

```txt
Next.js 15
React
Tailwind CSS
shadcn/ui
PostgreSQL or MongoDB
Prisma
Stripe Checkout
OpenAI API
docx (export)
Auth.js or Clerk
Vercel / Coolify / Hetzner
```

## Hosting & Deployment

**Do not run this app on home hardware in production.** Use local machines for dev, testing, and demos only. Host the public site on **Hetzner VPS + Coolify** (recommended) or **Vercel Pro**.

| This app | Value |
|----------|-------|
| Subdomain | `resume.danspelt.com` |
| GitHub repo | `danspelt-ai-resume` |

Full policy, Coolify/Vercel flows, DNS, and Stripe uptime guidance: [Hosting & Deployment](../hosting-and-deployment.md).

## Separate Repos Per Project

This project lives in its own repository (`danspelt-ai-resume`). The other danspelt.com subdomain apps each have their own repo as well:

```txt
audit.danspelt.com      → danspelt-ai-audit
quote.danspelt.com      → danspelt-ai-quotes
resume.danspelt.com     → danspelt-ai-resume
content.danspelt.com    → danspelt-ai-content
concierge.danspelt.com  → danspelt-ai-concierge
```

Do not use a shared monorepo for these apps. Separate repos keep each subdomain clean, deployable, and easy to hand to a developer.
