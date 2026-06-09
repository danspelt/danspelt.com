# Developer Guide: AI Website Audit Tool

Subdomain: `audit.danspelt.com`  
GitHub repo: `danspelt-ai-audit`

A business owner enters their website URL. The app generates a simple AI audit showing mobile problems, homepage clarity issues, CTA problems, SEO problems, speed/structure suggestions, trust-building improvements, and suggested rewritten homepage text.

## Money Idea

Sell this as:

```txt
$19 instant audit
$99 detailed audit
$299 audit + fixes
```

## MVP Pages

```txt
/
Landing page

/audit
Website URL input form

/results/[id]
Audit result page

/pricing
Stripe checkout plans

/admin
List submitted audits
```

## Database Model

```js
Audit {
  id: string
  userEmail: string
  websiteUrl: string
  status: "pending" | "complete" | "failed"
  score: number
  summary: string
  problems: Json
  recommendations: Json
  rewrittenHomepage: string
  createdAt: Date
}
```

## AI Prompt

```txt
You are a senior website conversion consultant.

Review this website URL:
{{websiteUrl}}

Create a plain-English audit for a small business owner.

Return:
1. Overall score out of 100
2. Top 5 problems
3. Top 5 quick fixes
4. Better homepage headline
5. Better call-to-action
6. SEO suggestions
7. What I would fix first
```

## API Routes

```txt
POST /api/audit/create
GET /api/audit/[id]
POST /api/stripe/create-checkout
POST /api/stripe/webhook
```

## Git Setup Required

Each subdomain project must be its own Git repository. The developer must initialize Git separately for this project, make the first commit, and push to its own GitHub repository.

```txt
audit.danspelt.com  →  GitHub repo: danspelt-ai-audit
```

Do **not** combine this app with other subdomain projects in a monorepo. Each project is deployed and versioned independently.

## Developer Build Steps

```bash
npx create-next-app@latest danspelt-ai-audit
cd danspelt-ai-audit

npm install openai stripe prisma @prisma/client zod
npx prisma init

git init
git add .
git commit -m "Initial commit"

git branch -M main
git remote add origin https://github.com/danspelt/danspelt-ai-audit.git
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
git remote add origin https://github.com/danspelt/danspelt-ai-audit.git
git push -u origin main
```

## Environment Variables

```env
DATABASE_URL=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=https://audit.danspelt.com
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
# AI Website Audit

Subdomain: https://audit.danspelt.com

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

## Simple Flow

```txt
User visits audit.danspelt.com
User enters website URL and email
User pays $19
Stripe webhook confirms payment
App runs AI audit
User sees result page
Admin can follow up and offer $299 fixes
```

## Why This Can Make Money

This is easy to sell because every business understands:

```txt
"My website might be losing customers."
```

The audit becomes the entry point. The real money is the follow-up fix package.

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
Auth.js or Clerk
Vercel / Coolify / Hetzner
```

## Hosting & Deployment

**Do not run this app on home hardware in production.** Use local machines for dev, testing, and demos only. Host the public site on **Hetzner VPS + Coolify** (recommended) or **Vercel Pro**.

| This app | Value |
|----------|-------|
| Subdomain | `audit.danspelt.com` |
| GitHub repo | `danspelt-ai-audit` |

Full policy, Coolify/Vercel flows, DNS, and Stripe uptime guidance: [Hosting & Deployment](../hosting-and-deployment.md).

## Separate Repos Per Project

This project lives in its own repository (`danspelt-ai-audit`). The other danspelt.com subdomain apps each have their own repo as well:

```txt
audit.danspelt.com      → danspelt-ai-audit
quote.danspelt.com      → danspelt-ai-quotes
resume.danspelt.com     → danspelt-ai-resume
content.danspelt.com    → danspelt-ai-content
concierge.danspelt.com  → danspelt-ai-concierge
```

Do not use a shared monorepo for these apps. Separate repos keep each subdomain clean, deployable, and easy to hand to a developer.
