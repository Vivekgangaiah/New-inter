# Publishing Your Internship Tracker

Your website is ready to publish! Here's how to deploy it to Vercel.

## Step 1: Push to GitHub

1. Initialize git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - Internship Tracker"
```

2. Create a new repository on GitHub and push:
```bash
git remote add origin https://github.com/yourusername/internship-tracker.git
git branch -M main
git push -u origin main
```

## Step 2: Set Up Database

Choose one of these free options:

### Option A: Supabase (Recommended)
1. Go to https://supabase.com
2. Sign up and create a new project
3. Wait for database to be ready (~2 minutes)
4. Go to **Settings** → **Database**
5. Copy the **Connection string** (URI format)
6. Replace `[YOUR-PASSWORD]` with your database password

### Option B: Neon
1. Go to https://neon.tech
2. Sign up and create a project
3. Copy the connection string from dashboard

## Step 3: Deploy to Vercel

### Via Vercel Dashboard (Easiest)

1. Go to https://vercel.com and sign in with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. **Add Environment Variable:**
   - Name: `DATABASE_URL`
   - Value: Your PostgreSQL connection string from Step 2
6. Click **"Deploy"**

### Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
# Follow prompts, then:
vercel env add DATABASE_URL
# Paste your connection string
vercel --prod
```

## Step 4: Run Database Migrations

After your first deployment:

1. **Option 1 - Using Vercel CLI:**
```bash
vercel env pull .env.local
npx prisma migrate deploy
```

2. **Option 2 - Automatic (Recommended):**
The `vercel-build` script in `package.json` automatically runs migrations on each deploy. Just make sure your `DATABASE_URL` environment variable is set in Vercel.

## Step 5: Verify

1. Visit your Vercel deployment URL
2. Try adding a company
3. Add an internship
4. Update application status
5. Verify data persists after refresh

## Your Website is Live! 🎉

You now have a fully functional internship tracking website deployed to the cloud.

## Next Steps

- Add a custom domain (optional)
- Set up email notifications (future enhancement)
- Add automated scraping (future enhancement)

## Need Help?

- Check `DEPLOYMENT.md` for detailed instructions
- Check `README.md` for development setup
- Vercel docs: https://vercel.com/docs
