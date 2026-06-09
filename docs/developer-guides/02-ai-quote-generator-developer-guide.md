# Developer Guide: AI Quote and Proposal Generator

Subdomain: `quote.danspelt.com`  
GitHub repo: `danspelt-ai-quotes`

Small service businesses need quotes and proposals. This app lets them enter job details and creates a polished quote/proposal.

## Money Idea

Target customers:

```txt
cleaners
landscapers
painters
caregivers
contractors
web developers
consultants
```

Pricing:

```txt
$9 one quote
$29/month unlimited basic quotes
$79/month branded quotes
```

## MVP Pages

```txt
/
Landing page

/create
Quote form

/quotes/[id]
Generated quote view

/dashboard
User quote history

/settings
Business profile and branding
```

## Database Model

```js
Business {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  logoUrl: string
  address: string
}

Quote {
  id: string
  userId: string
  clientName: string
  clientEmail: string
  jobType: string
  jobDescription: string
  price: number
  aiProposalText: string
  terms: string
  status: "draft" | "sent" | "accepted"
  createdAt: Date
}
```

## Quote Form Fields

```txt
Business name
Client name
Client email
Job type
Job description
Estimated price
Timeline
Warranty/terms
Tone: friendly, professional, premium
```

## AI Prompt

```txt
You are a professional proposal writer.

Create a polished service quote using this information:

Business:
{{businessName}}

Client:
{{clientName}}

Job:
{{jobDescription}}

Price:
{{price}}

Timeline:
{{timeline}}

Tone:
{{tone}}

Return:
1. Proposal introduction
2. Scope of work
3. Price summary
4. Timeline
5. Terms
6. Friendly closing
```

## API Routes

```txt
POST /api/quotes/create
GET /api/quotes/[id]
POST /api/quotes/send
POST /api/stripe/create-checkout
POST /api/stripe/webhook
```

## Git Setup Required

Each subdomain project must be its own Git repository. The developer must initialize Git separately for this project, make the first commit, and push to its own GitHub repository.

```txt
quote.danspelt.com  →  GitHub repo: danspelt-ai-quotes
```

Do **not** combine this app with other subdomain projects in a monorepo. Each project is deployed and versioned independently.

## Developer Build Steps

```bash
npx create-next-app@latest danspelt-ai-quotes
cd danspelt-ai-quotes

npm install openai stripe prisma @prisma/client zod resend
npx prisma init

git init
git add .
git commit -m "Initial commit"

git branch -M main
git remote add origin https://github.com/danspelt/danspelt-ai-quotes.git
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
git remote add origin https://github.com/danspelt/danspelt-ai-quotes.git
git push -u origin main
```

## Environment Variables

```env
DATABASE_URL=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=https://quote.danspelt.com
```

## `.env.example` Requirement

Include a safe `.env.example` file (never commit real keys):

```env
DATABASE_URL=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
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
# AI Quote Generator

Subdomain: https://quote.danspelt.com

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
* RESEND_API_KEY
* NEXT_PUBLIC_APP_URL

## Git

This project is managed as its own Git repository.
````

## Simple Flow

```txt
User creates business profile
User enters client/job details
AI generates quote
User edits quote
User sends quote by email
Client receives clean proposal
```

## Extra Feature

Add a public quote approval page:

```txt
/approve/[quoteId]
```

Client can click:

```txt
Accept Quote
Request Changes
Decline
```

## Why This Can Make Money

Businesses hate writing quotes. If this saves them time and makes them look professional, they will pay.

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
Resend (email)
Auth.js or Clerk
Vercel / Coolify / Hetzner
```

## Hosting & Deployment

**Do not run this app on home hardware in production.** Use local machines for dev, testing, and demos only. Host the public site on **Hetzner VPS + Coolify** (recommended) or **Vercel Pro**.

| This app | Value |
|----------|-------|
| Subdomain | `quote.danspelt.com` |
| GitHub repo | `danspelt-ai-quotes` |

Full policy, Coolify/Vercel flows, DNS, and Stripe uptime guidance: [Hosting & Deployment](../hosting-and-deployment.md).

## Separate Repos Per Project

This project lives in its own repository (`danspelt-ai-quotes`). The other danspelt.com subdomain apps each have their own repo as well:

```txt
audit.danspelt.com      → danspelt-ai-audit
quote.danspelt.com      → danspelt-ai-quotes
resume.danspelt.com     → danspelt-ai-resume
content.danspelt.com    → danspelt-ai-content
concierge.danspelt.com  → danspelt-ai-concierge
```

Do not use a shared monorepo for these apps. Separate repos keep each subdomain clean, deployable, and easy to hand to a developer.
