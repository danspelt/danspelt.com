# Developer Guide: Airbnb / Rental AI Concierge

Subdomain: `concierge.danspelt.com`  
GitHub repo: `danspelt-ai-concierge`

This app helps Airbnb hosts create automated guest replies. It generates answers for check-in instructions, Wi-Fi details, parking, house rules, local restaurants, checkout instructions, late checkout, pet rules, noise rules, and emergency info.

## Money Idea

Pricing:

```txt
$29 setup
$49/month for one property
$99/month for multiple properties
```

## MVP Pages

```txt
/
Landing page

/setup
Property setup form

/chat
Guest question simulator

/dashboard
Property FAQ dashboard

/settings
Host settings
```

## Database Model

```js
Property {
  id: string
  userId: string
  name: string
  address: string
  checkInInstructions: string
  wifiName: string
  wifiPassword: string
  parkingInfo: string
  houseRules: string
  checkoutInstructions: string
  localRecommendations: string
  emergencyInfo: string
}

GuestQuestion {
  id: string
  propertyId: string
  question: string
  aiAnswer: string
  createdAt: Date
}
```

## Property Setup Form

```txt
Property name
City
Check-in instructions
Wi-Fi info
Parking info
House rules
Checkout time
Pet policy
Local recommendations
Emergency contact
```

## AI Prompt

```txt
You are a friendly Airbnb guest concierge.

Use only the property information below to answer the guest.

Property Info:
{{propertyInfo}}

Guest Question:
{{guestQuestion}}

Rules:
- Be friendly
- Be short
- Do not invent information
- If unsure, tell the guest you will ask the host
- Include clear instructions when needed
```

## API Routes

```txt
POST /api/property/create
GET /api/property/[id]
POST /api/chat/ask
POST /api/stripe/create-checkout
POST /api/stripe/webhook
```

## Git Setup Required

Each subdomain project must be its own Git repository. The developer must initialize Git separately for this project, make the first commit, and push to its own GitHub repository.

```txt
concierge.danspelt.com  →  GitHub repo: danspelt-ai-concierge
```

Do **not** combine this app with other subdomain projects in a monorepo. Each project is deployed and versioned independently.

## Developer Build Steps

```bash
npx create-next-app@latest danspelt-ai-concierge
cd danspelt-ai-concierge

npm install openai stripe prisma @prisma/client zod
npx prisma init

git init
git add .
git commit -m "Initial commit"

git branch -M main
git remote add origin https://github.com/danspelt/danspelt-ai-concierge.git
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
git remote add origin https://github.com/danspelt/danspelt-ai-concierge.git
git push -u origin main
```

## Environment Variables

```env
DATABASE_URL=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=https://concierge.danspelt.com
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
# Airbnb / Rental AI Concierge

Subdomain: https://concierge.danspelt.com

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
Host enters property info
Host tests guest questions
AI answers based on saved property info
Host pays monthly
Later: connect to SMS, WhatsApp, or Airbnb messaging workflow
```

## Why This Can Make Money

Hosts get tired of answering the same questions. This app sells time savings.

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
| Subdomain | `concierge.danspelt.com` |
| GitHub repo | `danspelt-ai-concierge` |

Full policy, Coolify/Vercel flows, DNS, and Stripe uptime guidance: [Hosting & Deployment](../hosting-and-deployment.md).

## Separate Repos Per Project

This project lives in its own repository (`danspelt-ai-concierge`). The other danspelt.com subdomain apps each have their own repo as well:

```txt
audit.danspelt.com      → danspelt-ai-audit
quote.danspelt.com      → danspelt-ai-quotes
resume.danspelt.com     → danspelt-ai-resume
content.danspelt.com    → danspelt-ai-content
concierge.danspelt.com  → danspelt-ai-concierge
```

Do not use a shared monorepo for these apps. Separate repos keep each subdomain clean, deployable, and easy to hand to a developer.
