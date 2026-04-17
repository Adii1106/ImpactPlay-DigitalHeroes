<<<<<<< HEAD
# ImpactPlay - Digital Heroes

ImpactPlay is a high-performance Next.js 16 lottery and charity platform designed for transparency and social impact.

## 🚀 Key Features
- **Score Tracking**: Retains only your latest 5 scores for fair play.
- **Admin Draws**: Fully transparent and auditable winner selection.
- **Charity Integration**: Choose where your impact goes.
- **Stripe Integration**: Secure, PCI-compliant payment flows.

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase / PostgreSQL
- **ORM**: Prisma 6
- **Styling**: Tailwind CSS / Shadcn UI

## 🏁 Getting Started
1. Clone the repo
2. Run `npm install`
3. Set up your `.env` with Supabase and Prisma URLs
4. Run `npx prisma db push`
5. Run `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
=======
# ImpactPlay

ImpactPlay is a high-performance SaaS platform built for a 1-day MVP challenge. It combines tournament score tracking, a monthly lottery (draw) engine, and a charitable contribution system.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Auth**: Supabase Auth
- **UI**: Tailwind CSS + Shadcn UI + Lucide Icons
- **Animation**: CSS Keyframes + Tailwind Animate

## ⚙️ Core Modules

### 1. Score System
- **Strict Logic**: Users can record one score per day.
- **Auto-Pruning**: Only the latest 5 scores are retained via PostgreSQL triggers.
- **Integrity**: Enforced by unique constraints and database-level functions.

### 2. Subscription System
- **Access Control**: Active subscriptions are required to participate in the draws.
- **Mock Implementation**: A production-ready structure that can be easily connected to Stripe.

### 3. Draw Engine
- **Admin Triggered**: Authorized admins can execute the monthly draw.
- **Eligibility**: Only users with an active subscription and at least 5 recorded scores are eligible.
- **Prize Splitting**: Automatically calculates charity donations based on user preferences.

### 4. Charity System
- **Personalized Impact**: Users choose their preferred charity.
- **Variable Contribution**: Users can adjust their donation percentage (default 10%).

## 🛠️ Setup

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Set up Environment Variables**:
   ```env
   DATABASE_URL="your-postgresql-url"
   DIRECT_URL="your-direct-postgresql-url"
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-key"
   ```
4. **Push Schema**: `npx prisma db push`
5. **Run Migrations**: Apply the SQL triggers and RLS policies provided in `/supabase/migrations`.
6. **Start Dev Server**: `npm run dev`

## 🛡️ Security

- **Defense-in-Depth**: Role-based access control (RBAC) enforced via Next.js Server Actions and validated by Supabase Row Level Security (RLS).
- **Manual Overrides**: Admin routes are protected by server-side role checks.

---

Built with ❤️ by Antigravity
>>>>>>> bf2164f (docs: update readme and final project documentation)
