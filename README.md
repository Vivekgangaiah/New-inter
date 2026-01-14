# Internship Tracker

A web-based internship application tracking platform that helps you manage your internship applications across multiple companies.

## Features

- **Company Management**: Add and track companies you're interested in
- **Internship Tracking**: Manually add and track internship openings
- **Application Status**: Track application progress (Not Applied, Applied, Interview, Rejected, Offer)
- **Application Details**: Store resume versions, referral details, follow-up dates, and notes
- **Dashboard**: Visual overview of all companies and application statistics

## Tech Stack

- **Frontend & Backend**: Next.js 14 (App Router) with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd internship-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/internship_tracker?schema=public"
```

4. Set up the database:
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Create a Vercel account** at [vercel.com](https://vercel.com)

3. **Import your repository** in Vercel

4. **Set up a PostgreSQL database**:
   - Option 1: Use [Supabase](https://supabase.com) (free tier available)
   - Option 2: Use [Neon](https://neon.tech) (free tier available)
   - Option 3: Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

5. **Add environment variables** in Vercel:
   - Go to your project settings → Environment Variables
   - Add `DATABASE_URL` with your PostgreSQL connection string

6. **Deploy**:
   - Vercel will automatically detect Next.js and deploy
   - After deployment, run migrations:
     ```bash
     npx prisma migrate deploy
     ```
   - Or use Vercel's CLI:
     ```bash
     vercel env pull
     npx prisma migrate deploy
     ```

### Database Setup (Cloud Options)

#### Using Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → Database
3. Copy the connection string (URI format)
4. Use it as your `DATABASE_URL`

#### Using Neon

1. Create a new project at [neon.tech](https://neon.tech)
2. Copy the connection string from the dashboard
3. Use it as your `DATABASE_URL`

### Running Migrations in Production

After setting up your production database:

```bash
# Set your production DATABASE_URL
export DATABASE_URL="your-production-database-url"

# Run migrations
npx prisma migrate deploy
```

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   ├── companies/        # Company detail pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Dashboard
├── components/
│   └── ui/               # Reusable UI components
├── lib/
│   ├── companies.ts      # Company service functions
│   ├── internships.ts    # Internship service functions
│   ├── applications.ts   # Application service functions
│   ├── prisma.ts         # Prisma client instance
│   └── utils.ts          # Utility functions
└── prisma/
    └── schema.prisma     # Database schema
```

## Usage

1. **Add a Company**: Click "Add Company" on the dashboard and fill in company details
2. **Add Internships**: Navigate to a company page and click "Add Internship"
3. **Track Applications**: Update application status using the dropdown in the internship list
4. **Edit Details**: Click the edit icon on any internship to update details and application information

## Future Enhancements

- Automated internship scraping from career pages
- Email notifications for new opportunities
- Follow-up reminders
- Resume version tracking
- Interview scheduling
- Analytics dashboard

## License

MIT
