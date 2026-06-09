# Developer Guide: Local Business Content Generator

Subdomain: `content.danspelt.com`  
GitHub repo: `danspelt-ai-content`

Small businesses need content but do not want to write it. The app creates Facebook posts, Instagram captions, Google Business Profile posts, service page text, FAQ sections, email promos, and blog posts.

## Money Idea

Pricing:

```txt
$19 content pack
$49/month weekly content
$99/month full monthly content calendar
```

## MVP Pages

```txt
/
Landing page

/create
Content generator form

/calendar
Monthly content calendar

/results/[id]
Generated content pack

/dashboard
Saved content
```

## Database Model

```js
ContentPack {
  id: string
  userId: string
  businessName: string
  businessType: string
  services: string
  location: string
  tone: string
  posts: Json
  emails: Json
  faqs: Json
  servicePageText: string
  createdAt: Date
}
```

## Form Fields

```txt
Business name
Business type
City
Main services
Special offer
Tone
Platform: Facebook, Instagram, Google Business, Email
```

## AI Prompt

```txt
You are a local business marketing expert.

Create a content pack for:

Business:
{{businessName}}

Business Type:
{{businessType}}

Location:
{{location}}

Services:
{{services}}

Offer:
{{offer}}

Tone:
{{tone}}

Return:
1. 10 Facebook posts
2. 10 Instagram captions
3. 5 Google Business Profile posts
4. 5 FAQ answers
5. 1 email promo
6. 1 service page section
```

## API Routes

```txt
POST /api/content/create
GET /api/content/[id]
POST /api/content/regenerate
POST /api/stripe/create-checkout
POST /api/stripe/webhook
```

## Git Setup Required

Each subdomain project must be its own Git repository. The developer must initialize Git separately for this project, make the first commit, and push to its own GitHub repository.

```txt
content.danspelt.com  →  GitHub repo: danspelt-ai-content
```

Do **not** combine this app with other subdomain projects in a monorepo. Each project is deployed and versioned independently.

## Developer Build Steps

```bash
npx create-next-app@latest danspelt-ai-content
cd danspelt-ai-content

npm install openai stripe prisma @prisma/client zod
npx prisma init

git init
git add .
git commit -m "Initial commit"

git branch -M main
git remote add origin https://github.com/danspelt/danspelt-ai-content.git
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
git remote add origin https://github.com/danspelt/danspelt-ai-content.git
git push -u origin main
```

## Environment Variables

```env
DATABASE_URL=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=https://content.danspelt.com
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
# Local Business Content Generator

Subdomain: https://content.danspelt.com

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
Business owner enters details
App generates full content pack
User copies posts
User can pay monthly for new packs
Admin can upsell website updates
```

## Why This Can Make Money

This is very easy to sell to local businesses because they know they should post, but they do not want to write content.

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
| Subdomain | `content.danspelt.com` |
| GitHub repo | `danspelt-ai-content` |

Full policy, Coolify/Vercel flows, DNS, and Stripe uptime guidance: [Hosting & Deployment](../hosting-and-deployment.md).

## Separate Repos Per Project

This project lives in its own repository (`danspelt-ai-content`). The other danspelt.com subdomain apps each have their own repo as well:

```txt
audit.danspelt.com      → danspelt-ai-audit
quote.danspelt.com      → danspelt-ai-quotes
resume.danspelt.com     → danspelt-ai-resume
content.danspelt.com    → danspelt-ai-content
concierge.danspelt.com  → danspelt-ai-concierge
```

Do not use a shared monorepo for these apps. Separate repos keep each subdomain clean, deployable, and easy to hand to a developer.
