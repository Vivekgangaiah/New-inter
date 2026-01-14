# Deployment Fix - Database Setup Required

## The Error You're Seeing

The 500 error from `/api/companies` means your database is not connected. This is expected on first deployment.

## Quick Fix Steps

### 1. Set Up Your Database

Choose one:

**Option A: Supabase (Recommended - Free)**
1. Go to https://supabase.com
2. Create a new project
3. Wait for database to be ready (~2 minutes)
4. Go to **Settings** → **Database**
5. Copy the **Connection string** (URI format)
6. It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`

**Option B: Neon (Free Tier)**
1. Go to https://neon.tech
2. Create a project
3. Copy the connection string from dashboard

### 2. Add DATABASE_URL to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Click **Add New**
4. Name: `DATABASE_URL`
5. Value: Paste your connection string from Step 1
6. Select **Production**, **Preview**, and **Development**
7. Click **Save**

### 3. Run Database Migrations

After adding DATABASE_URL, you need to create the database tables:

**Option A: Using Vercel CLI (Recommended)**
```bash
npm i -g vercel
vercel login
vercel env pull .env.local
npx prisma migrate deploy
```

**Option B: Using Vercel Dashboard**
1. Go to your project → **Deployments**
2. Click the three dots on latest deployment → **Redeploy**
3. The `vercel-build` script will automatically run migrations

### 4. Verify It Works

1. Visit your deployed site
2. Try adding a company
3. If it works, you're done! 🎉

## Troubleshooting

- **Still getting 500 errors?** Check Vercel function logs (Settings → Logs) for specific error messages
- **Migration errors?** Make sure DATABASE_URL is set correctly
- **Connection timeout?** Check that your database allows connections from Vercel's IPs (Supabase/Neon do this automatically)

## What Changed in the Code

I've updated the frontend to:
- Handle API errors gracefully (won't crash if database isn't connected)
- Show empty state instead of crashing
- Display proper error messages

The API now:
- Returns empty array on error (prevents frontend crashes)
- Provides better error messages for debugging
