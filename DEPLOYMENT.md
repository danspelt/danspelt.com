# Deployment Checklist

## ✅ Pre-Deployment Verification

- [x] **Build passes locally**: `npm run build` completes successfully
- [x] **Dependencies installed**: `npm install` runs without errors
- [x] **Tech stack**: Next.js 16, React 19, Tailwind CSS 4
- [x] **Security**: No secrets exposed in `next.config.mjs` or client code
- [x] **Lockfile**: Using `package-lock.json` (npm) only

## 🚀 Coolify Deployment (current setup)

The site is deployed on a **Hetzner VPS via Coolify**, using the **Dockerfile build pack** with Next.js standalone output.

- **Repository**: `danspelt/danspelt.com` — deploys from the `main` branch
- **Domains**: `danspelt.com`, `www.danspelt.com`, `danspelt.ca`, `www.danspelt.ca`
- **Health check**: `GET /api/health` returns `{"status":"ok","service":"danspelt.com"}`

### Deploy flow

1. Push to `main` on GitHub — Coolify auto-deploys (builds the Docker image, swaps containers).
2. Or trigger a manual deploy from the Coolify dashboard.

### Environment variables

Set these in the Coolify app's environment settings:

#### Required
```
GITHUB_TOKEN=your_github_token_here        # /hubbies page — public_repo scope
SMTP_PASS=your_gmail_app_password_here     # contact form — Gmail App Password
```

#### Optional (AI features)
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SPEECH_KEY=your_azure_speech_key
SPEECH_REGION=eastus
QDRANT_URL=https://your-cluster.qdrant.io
QDRANT_API_KEY=your_qdrant_key
```

If a variable is needed during the Docker build, enable Coolify's "Available at Buildtime" option for it.

### Post-deploy verification

- [ ] Visit https://danspelt.com (and .ca)
- [ ] `curl https://danspelt.com/api/health` → 200
- [ ] `/hubbies` loads GitHub projects (or fallback data)
- [ ] Contact form sends (requires `SMTP_PASS`)
- [ ] Dark/light mode toggle works

## 📝 Environment Variable Details

### GITHUB_TOKEN
- **Purpose**: Fetch your public repositories for the `/hubbies` page
- **How to get**: GitHub Settings → Developer settings → Personal access tokens → Tokens (classic) → `public_repo` scope

### SMTP_PASS
- **Purpose**: Send emails from the contact form
- **How to get**: Gmail account → Security → 2-Step Verification → App passwords → "Mail" (16-char password)

### Optional AI variables
- **OPENAI_API_KEY**: platform.openai.com
- **SPEECH_KEY/REGION**: Azure Cognitive Services
- **QDRANT_URL/API_KEY**: Qdrant vector database

## 🐛 Troubleshooting

### Build fails with "GITHUB_TOKEN not configured"
- Expected at build time — the GitHub API route fetches client-side at runtime. Add `GITHUB_TOKEN` to Coolify env vars to silence it.

### Contact form doesn't work
- Missing/incorrect `SMTP_PASS`. Verify it's a Gmail **App Password**, not the account password.

### Projects page shows fallback data only
- `GITHUB_TOKEN` unset or missing `public_repo` scope.

### Deploy didn't pick up new commits
- Check Coolify auto-deploy is enabled for the app, or trigger a manual redeploy.

## 🔄 Continuous Deployment

- **Push to `main`** → Coolify production deploy
- **GitHub Actions** → updates `/hubbies` page hourly with latest repos
