# Quick Start Guide

## For Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Set up your database:**
   - Create a PostgreSQL database (local or cloud)
   - Create a `.env` file:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/internship_tracker"
   ```

3. **Generate Prisma Client and run migrations:**
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. **Start the development server:**
```bash
npm run dev
```

Visit http://localhost:3000

## For Deployment to Vercel

### Option 1: Use Vercel's One-Click Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variable `DATABASE_URL` with your PostgreSQL connection string
4. Deploy!

### Option 2: Manual Setup

1. **Set up database** (choose one):
   - **Supabase**: https://supabase.com (free tier available)
   - **Neon**: https://neon.tech (free tier available)  
   - **Vercel Postgres**: Available in Vercel dashboard

2. **Deploy to Vercel:**
```bash
npm i -g vercel
vercel login
vercel
```

3. **Add environment variable:**
```bash
vercel env add DATABASE_URL
# Paste your connection string
```

4. **Run migrations:**
```bash
vercel env pull .env.local
npx prisma migrate deploy
```

5. **Redeploy:**
```bash
vercel --prod
```

## Prisma 7 Note

If you encounter Prisma Client import issues, ensure:
- `npx prisma generate` runs before build
- The `.prisma/client` directory exists after generation
- Your `DATABASE_URL` is set correctly

The `vercel-build` script in package.json handles this automatically.

## Troubleshooting

- **Build fails**: Make sure `DATABASE_URL` is set and database is accessible
- **Prisma errors**: Run `npx prisma generate` manually
- **Module not found**: Delete `.next` folder and rebuild
