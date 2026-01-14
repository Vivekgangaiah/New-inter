# Deployment Guide

## Quick Deploy to Vercel

### Step 1: Prepare Your Code

1. Make sure all your code is committed to Git:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Set Up Database

Choose one of these options:

#### Option A: Supabase (Recommended - Free)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Wait for the database to be ready
4. Go to **Settings** → **Database**
5. Find the **Connection string** section
6. Copy the **URI** connection string (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
7. Replace `[YOUR-PASSWORD]` with your database password

#### Option B: Neon (Free Tier)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string from the dashboard

#### Option C: Vercel Postgres

1. In your Vercel project, go to **Storage** tab
2. Click **Create Database** → **Postgres**
3. The connection string will be automatically added as an environment variable

### Step 3: Deploy to Vercel

#### Method 1: Via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. **Add Environment Variable**:
   - Name: `DATABASE_URL`
   - Value: Your PostgreSQL connection string from Step 2
6. Click **Deploy**

#### Method 2: Via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variable:
```bash
vercel env add DATABASE_URL
# Paste your connection string when prompted
```

5. Redeploy:
```bash
vercel --prod
```

### Step 4: Run Database Migrations

After your first deployment:

1. **Option A: Using Vercel CLI**
```bash
vercel env pull .env.local
npx prisma migrate deploy
```

2. **Option B: Using Vercel Dashboard**
   - Go to your project → **Settings** → **Environment Variables**
   - Make sure `DATABASE_URL` is set
   - Go to **Deployments** tab
   - Click the three dots on the latest deployment → **Redeploy**

3. **Option C: Add to package.json scripts** (Recommended)
   Add this to your `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

Then Vercel will automatically run migrations on each deploy.

### Step 5: Verify Deployment

1. Visit your Vercel deployment URL
2. Try adding a company
3. Check that data persists (refresh the page)

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` is set correctly in Vercel environment variables
- Check that your database allows connections from Vercel's IPs
- For Supabase: Make sure your project is not paused

### Migration Errors

- Make sure `DATABASE_URL` is set before running migrations
- Run `npx prisma generate` first
- Check Prisma logs for specific errors

### Build Errors

- Ensure all dependencies are in `package.json`
- Check that TypeScript compiles: `npm run build`
- Review Vercel build logs for specific errors

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |

## Post-Deployment Checklist

- [ ] Database migrations completed
- [ ] Environment variables set
- [ ] Can add a company
- [ ] Can add an internship
- [ ] Data persists after refresh
- [ ] Custom domain configured (optional)
