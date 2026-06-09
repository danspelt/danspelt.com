# Hosting & Deployment — danspelt.com Money Apps

This document covers how to host the five paid subdomain apps on `danspelt.com`. Each app is a separate Git repository deployed to its own subdomain.

**Do not run public money websites from local home hardware.** Use local machines for development, testing, and demos only. Host production on a VPS (Hetzner + Coolify) or Vercel.

---

## Local vs Production

| Role | Where | Purpose |
|------|-------|---------|
| **Local** | Dev machine, testing/demo machine | Build, test, AI iteration, Stripe test mode, demos, push to GitHub |
| **Production** | Hetzner VPS + Coolify **or** Vercel | Public subdomains, live Stripe, HTTPS, uptime |

### What local hardware is for

- **Dev machine** — day-to-day coding, `npm run dev`, unit/integration tests, AI prompt tuning, Stripe test webhooks via Stripe CLI.
- **Testing/demo machine** — optional second PC for QA, stakeholder demos, or isolated test databases. Still not production.

### What local hardware is not for

- Serving `*.danspelt.com` to the public internet
- Processing live Stripe payments
- Running production databases exposed to the web

---

## Why Not Home Hardware for Public Sites

Home internet and consumer hardware are a poor fit for revenue-generating apps:

1. **Power** — outages, reboots, and sleep/hibernate take the site offline.
2. **Internet** — residential ISP uptime, bandwidth caps, and IP changes are unreliable. If home internet goes down, **Stripe checkout and webhooks stop working** — customers cannot pay, and payment confirmations may fail even after a charge.
3. **Security** — exposing a home network to inbound HTTP/HTTPS increases attack surface; patching and hardening are your responsibility.
4. **SSL/TLS** — production HTTPS on a home IP is awkward; certificate renewal and reverse-proxy setup add ongoing ops burden.
5. **Stripe downtime risk** — money apps depend on reliable webhook delivery. Home outages mean missed `checkout.session.completed` events, stuck orders, and support burden.

Use home hardware to **build and verify**; use a VPS or Vercel to **earn**.

---

## Recommended Setup (Primary)

**Hetzner VPS + Coolify + GitHub + Cloudflare DNS**

| Component | Role |
|-----------|------|
| **Hetzner VPS** | Always-on Linux server (e.g. CX22 or larger as traffic grows) |
| **Coolify** | Self-hosted PaaS: connect GitHub, build Docker/Next.js, env vars, HTTPS |
| **GitHub** | Source of truth; one repo per subdomain app |
| **Cloudflare DNS** | `A`/`CNAME` records for each subdomain → VPS or Vercel |

### Why this stack

- Predictable monthly cost on Hetzner
- Full control over env vars, databases, and multiple apps on one VPS
- Coolify automates deploys from GitHub with automatic HTTPS (Let's Encrypt)
- Cloudflare adds DNS, optional proxy/CDN, and DDoS mitigation

---

## Alternative: Vercel Pro

**Best for:** fastest path for Next.js apps with minimal server admin.

- Connect each GitHub repo as its own Vercel project
- Map custom subdomain in Vercel → add DNS in Cloudflare
- Set production env vars (`STRIPE_*`, `DATABASE_URL`, `OPENAI_API_KEY`, etc.)

**Notes for money apps:**

- Stripe webhooks need a stable public URL (Vercel provides this)
- Commercial use and team features may require **Vercel Pro** (check current pricing and terms)
- Serverless limits apply — long-running AI jobs may need background queues or a VPS

Use Vercel when you want zero server maintenance; use Coolify when you want one VPS running all five apps.

---

## Coolify Deployment Flow

```txt
Developer (local)
    │
    │  git push
    ▼
GitHub (danspelt-ai-* repo)
    │
    │  webhook / poll
    ▼
Coolify (on Hetzner VPS)
    │
    │  pull source, npm install, npm run build
    ▼
Next.js production container
    │
    │  reverse proxy + Let's Encrypt
    ▼
https://<subdomain>.danspelt.com
```

### Typical Coolify steps (per app)

1. Push code to the app's GitHub repository (`main` or production branch).
2. In Coolify: **New Resource → Application → GitHub** → select the repo.
3. Set build pack to **Next.js** (or Nixpacks/Dockerfile if customized).
4. Add environment variables (mirror `.env.example`; use production Stripe keys).
5. Set domain to the app subdomain (e.g. `audit.danspelt.com`).
6. In Cloudflare DNS: point subdomain to VPS IP (or Coolify-provided target).
7. Deploy; Coolify issues HTTPS automatically.
8. In Stripe Dashboard: set webhook URL to `https://<subdomain>.danspelt.com/api/webhooks/stripe` (or your app's webhook path).

Redeploys trigger on new pushes when auto-deploy is enabled.

---

## Repo → Subdomain Mapping

| Subdomain | GitHub repository | Local path (example) |
|-----------|-------------------|----------------------|
| `audit.danspelt.com` | `danspelt-ai-audit` | `E:\Git\danspelt-ai-audit` |
| `quote.danspelt.com` | `danspelt-ai-quotes` | `E:\Git\danspelt-ai-quotes` |
| `resume.danspelt.com` | `danspelt-ai-resume` | `E:\Git\danspelt-ai-resume` |
| `content.danspelt.com` | `danspelt-ai-content` | `E:\Git\danspelt-ai-content` |
| `concierge.danspelt.com` | `danspelt-ai-concierge` | `E:\Git\danspelt-ai-concierge` |

Each repo deploys independently. Do not combine these apps in a monorepo for production hosting.

---

## Cloudflare Tunnel (Previews Only)

**Cloudflare Tunnel** (`cloudflared`) can expose a local `localhost:3000` temporarily — useful for:

- Sharing a dev build with a collaborator
- Testing webhooks against a local app (with care; prefer Stripe CLI for local webhook testing)

**Not for production.** Tunnels depend on your home machine and internet staying online. Do not point production DNS or Stripe live webhooks at a tunnel long term.

---

## Vercel Deployment Flow (Alternative)

```txt
Developer (local)
    │
    │  git push
    ▼
GitHub (danspelt-ai-* repo)
    │
    │  Vercel Git integration
    ▼
Vercel build (Next.js)
    │
    │  edge/serverless + auto HTTPS
    ▼
https://<subdomain>.danspelt.com
```

Per app: import repo in Vercel, configure env vars, add custom domain, update Cloudflare DNS per Vercel instructions.

---

## Production Checklist (All Apps)

- [ ] `NEXT_PUBLIC_APP_URL` set to `https://<subdomain>.danspelt.com`
- [ ] Stripe **live** keys and webhook secret in production env (test keys only locally)
- [ ] Webhook endpoint registered in Stripe Dashboard for production URL
- [ ] Database URL points to hosted DB (not localhost)
- [ ] DNS propagated; HTTPS valid
- [ ] Smoke test: landing page, checkout, webhook, post-payment flow

---

## Summary

| Question | Answer |
|----------|--------|
| Run money sites from home? | **No** — dev/test/demos only |
| Primary production stack? | **Hetzner VPS + Coolify + GitHub + Cloudflare DNS** |
| Easiest Next.js alternative? | **Vercel Pro** (one project per repo) |
| Local dev machine? | Build, test, AI, Stripe test mode, push to GitHub |
| Local demo machine? | Optional QA/demos — still not production |
| Cloudflare Tunnel? | Temporary previews only — **not** production |
| Stripe risk at home? | Home internet/power loss → checkout and webhooks down |

Developer guides for each app link here for project-specific subdomain and repo names. Each app repo may also include a root `DEPLOYMENT.md` with quick deploy steps.
