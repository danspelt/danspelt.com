# Dan Spelt's Personal Website

This is my personal website built with Next.js, React, and Tailwind CSS. It showcases my professional experience, skills, and hobby projects.

## Features

- Modern, responsive design with dark/light mode support
- Mobile-first approach
- Fast page loads with Next.js
- Interactive timeline of experience
- Skills & Tools showcase
- Hobby projects gallery with GitHub integration
- Contact form
- SEO optimized

## Tech Stack

- **Framework**: Next.js 15.1.3
- **Language**: JavaScript/TypeScript 5.6.3
- **Runtime**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber, Three.js
- **Deployment**: Vercel
- **Version Control**: Git/GitHub

## Development

1. Clone the repository:
```bash
git clone https://github.com/danspelt/danspelt.com.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Then edit `.env.local` with your actual API keys and credentials.

4. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/src/app/*` - Main application pages and routes
- `/src/components/*` - Reusable React components
- `/src/lib/*` - Utility functions and configurations
- `/public/*` - Static assets

## Automated Updates

This project includes GitHub Actions that automatically:
- Update the hobby projects section with my latest GitHub repositories
- Run hourly to keep content fresh
- Maintain project information accuracy

## Deployment

### Vercel (Recommended)

The website is configured for automatic deployment to Vercel:

1. **Connect your repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

2. **Configure environment variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - Required for production:
     - `GITHUB_TOKEN` - GitHub Personal Access Token
     - `SMTP_PASS` - Gmail App Password (for contact form)
   - Optional (if using AI features):
     - `OPENAI_API_KEY`
     - `SPEECH_KEY` and `SPEECH_REGION`
     - `QDRANT_URL` and `QDRANT_API_KEY`

3. **Deploy:**
   - Push to `main` branch for production
   - Vercel will automatically build and deploy

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

**Build output:** `.next/` directory contains the optimized production build.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Feel free to reach out if you have any questions or just want to connect:
- Website: [danspelt.com](https://danspelt.com)
- LinkedIn: [Dan Spelt](https://www.linkedin.com/in/danspelt)
- GitHub: [@danspelt](https://github.com/danspelt)
