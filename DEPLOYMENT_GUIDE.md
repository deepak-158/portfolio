# 🚀 Vercel Deployment Guide

This guide will help you deploy your portfolio to Vercel with automatic GitHub builds.

## Prerequisites

- [x] Node.js installed
- [x] Git repository initialized
- [x] Portfolio project ready
- [ ] GitHub account
- [ ] Vercel account

## Step 1: Push to GitHub

First, make sure your repository is pushed to GitHub:

```bash
# Navigate to your project directory
cd "c:\Users\dipak\OneDrive\Desktop\portfolio"

# Add all files to staging
git add .

# Commit your changes
git commit -m "Initial portfolio deployment setup"

# Add your GitHub repository as origin (replace with your actual repo)
git remote add origin https://github.com/deepak-158/portfolio.git

# Push to GitHub
git push -u origin main
```

## Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

## Step 3: Deploy Your Project

1. **Import Project**:
   - Click "New Project" on your Vercel dashboard
   - Find your repository: `deepak-158/portfolio`
   - Click "Import"

2. **Configure Project**:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

3. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your portfolio is now live! 🎉

## Step 4: Configure Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Add your custom domain or use the provided `.vercel.app` domain
3. Follow DNS configuration instructions if using a custom domain

## Step 5: Set Up Automatic Deployments

Automatic deployments are already configured! Every time you:
- Push to the `main` branch → Production deployment
- Create a pull request → Preview deployment

## Project Configuration Files

Your portfolio includes these deployment-ready files:

### `vercel.json`
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      }
    }
  }
})
```

## Deployment Checklist

- [x] `.gitignore` configured
- [x] `vercel.json` configuration
- [x] `vite.config.js` optimized
- [x] Build warnings resolved
- [x] Resume PDF included
- [x] All components working
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project deployed
- [ ] Domain configured (optional)

## Useful Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for issues
npm run build 2>&1 | findstr /v "MODULE_LEVEL_DIRECTIVE"
```

## Troubleshooting

### Build Fails
1. Check `package.json` dependencies
2. Run `npm install` to ensure all packages are installed
3. Test local build with `npm run build`

### Deployment Issues
1. Verify GitHub repository is public or Vercel has access
2. Check build logs in Vercel dashboard
3. Ensure `vercel.json` is in root directory

### Runtime Errors
1. Check browser console for errors
2. Verify all assets are loading correctly
3. Test all routes and functionality

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)
- **GitHub**: [github.com/deepak-158/portfolio](https://github.com/deepak-158/portfolio)

---

**Your portfolio will be live at**: `https://your-project-name.vercel.app`

After deployment, you can share this link in your resume, LinkedIn, and job applications! 🚀
