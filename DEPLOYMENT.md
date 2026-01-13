# Deployment Checklist

## ✅ Pre-Deployment Verification

- [x] **Build passes locally**: `npm run build` completes successfully
- [x] **Dependencies installed**: `npm install` runs without errors
- [x] **Latest tech stack**: Next.js 15, React 18, TypeScript 5.6
- [x] **Security**: No secrets exposed in `next.config.mjs` or client code
- [x] **Lockfile**: Using `package-lock.json` (npm) only

## 🚀 Vercel Deployment Steps

### 1. Initial Setup

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your `danspelt.com` repository
4. Vercel will auto-detect Next.js settings

### 2. Configure Environment Variables

In Vercel Project Settings → Environment Variables, add:

#### Required Variables
```
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SMTP_PASS=your_gmail_app_password_here
```

#### Optional Variables (if using AI features)
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SPEECH_KEY=your_azure_speech_key
SPEECH_REGION=eastus
QDRANT_URL=https://your-cluster.qdrant.io
QDRANT_API_KEY=your_qdrant_key
```

**Note:** Add these to all environments (Production, Preview, Development) or scope as needed.

### 3. Deploy

- **Automatic**: Push to `main` branch → Vercel deploys automatically
- **Manual**: Click "Deploy" in Vercel dashboard

### 4. Verify Deployment

After deployment completes:

- [ ] Visit your production URL
- [ ] Test the `/hubbies` page (should load GitHub projects or fallback data)
- [ ] Test the contact form (requires `SMTP_PASS`)
- [ ] Check browser console for errors
- [ ] Verify dark/light mode toggle works

## 🔧 Build Configuration

The project uses these build settings (auto-detected by Vercel):

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`
- **Node Version**: 20.x (from Vercel default)

## 📝 Environment Variable Details

### GITHUB_TOKEN
- **Purpose**: Fetch your public repositories for the `/hubbies` page
- **How to get**: 
  1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token with `public_repo` scope
  3. Copy the token (starts with `ghp_`)

### SMTP_PASS
- **Purpose**: Send emails from the contact form
- **How to get**:
  1. Enable 2FA on your Gmail account
  2. Go to Google Account → Security → 2-Step Verification → App passwords
  3. Generate an app password for "Mail"
  4. Use the 16-character password

### Optional AI Variables
Only needed if you're using the AI/speech features:
- **OPENAI_API_KEY**: From [platform.openai.com](https://platform.openai.com)
- **SPEECH_KEY/REGION**: From Azure Cognitive Services
- **QDRANT_URL/API_KEY**: From your Qdrant vector database instance

## 🐛 Troubleshooting

### Build fails with "GITHUB_TOKEN not configured"
- **Expected during build**: The GitHub API route will show this error at build time
- **Not a problem**: The page fetches data client-side at runtime
- **Fix if needed**: Add `GITHUB_TOKEN` to Vercel environment variables

### Contact form doesn't work
- **Cause**: Missing or incorrect `SMTP_PASS`
- **Fix**: Verify you're using a Gmail App Password (not your regular password)

### Projects page shows fallback data only
- **Cause**: `GITHUB_TOKEN` not set or invalid
- **Fix**: Check token has `public_repo` scope and is added to Vercel

### Build fails with dependency errors
- **Fix**: Delete `node_modules` and `package-lock.json`, then run `npm install`

## 📊 Post-Deployment

After successful deployment:

1. **Set up custom domain** (if desired):
   - Vercel Project Settings → Domains
   - Add your custom domain and configure DNS

2. **Enable Analytics** (optional):
   - Vercel Project Settings → Analytics
   - Enable Web Analytics or Speed Insights

3. **Monitor builds**:
   - Check Vercel dashboard for build logs
   - Set up deployment notifications in Project Settings

## 🔄 Continuous Deployment

The repo is configured for automatic deployments:

- **Push to `main`** → Production deployment
- **Pull requests** → Preview deployments (automatic)
- **GitHub Actions** → Updates `/hubbies` page hourly with latest repos

## ✨ You're Ready!

Your site is now deployed with:
- ✅ Next.js 15.1.3
- ✅ React 18.3.1
- ✅ TypeScript 5.6.3
- ✅ Tailwind CSS 3.4.17
- ✅ Production-optimized build
- ✅ Secure environment variable handling

Visit your deployed site and enjoy! 🎉
