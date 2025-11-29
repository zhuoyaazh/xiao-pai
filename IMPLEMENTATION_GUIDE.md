# XIAO PAI - Quick Start & Implementation Guide

## 📋 What Has Been Scaffolded

✅ **Project Structure**
- Next.js 14 App Router (TypeScript)
- Tailwind CSS 4 with dark mode support
- shadcn-style UI components (Button, Input, Badge, Card)
- Prisma schema with updated models (HelperJob, Wallet, KTM, DriverJob, etc.)
- Directory structure ready for pages and API routes

✅ **UI Components**
- `components/ui/Button.tsx` — Variants (default, outline, ghost, destructive) + sizes
- `components/ui/Input.tsx` — Dark mode aware
- `components/ui/Badge.tsx` — Color-coded (green, red, yellow, blue, gray)
- `components/ui/Card.tsx` — Card + CardHeader + CardTitle + CardDescription + CardContent + CardFooter
- `components/layout/Navbar.tsx` — Top navigation with dark mode toggle + notification bell
- `components/layout/FAB.tsx` — Floating action button (mobile only)
- `components/layout/Footer.tsx` — Footer with branding

✅ **Styling**
- `app/globals.css` — Tailwind directives + utility classes (.card-xiao, .badge-green, etc.)
- `tailwind.config.ts` — Colors (xiao-pink, xiao-green, xiao-red, xiao-yellow, xiao-blue)
- Dark mode support (toggle in navbar)

✅ **Database Schema** (Prisma)
- User (with roles, verification status, KTM approval)
- KTMVerification (selfie + KTM photos, manual review)
- Wallet (balance, earnings, spent)
- Transaction (history, types: top_up, purchase, earning, fee)
- GroupPurchase (Open PO with driver/helper slots)
- POParticipant (buyers joined to PO)
- DriverJob (delivery jobs with Big Split support)
- HelperJob (gig jobs with escrow)
- ProxyRequest + ProxyOffer (Jasa Titip)
- Order + OrderItem (transactions)
- Review + Notification

✅ **Home Page** (`app/(main)/page.tsx`)
- Hero banner with branding
- Search bar + category filter
- Hot PO section with mock cards
- Driver & Helper jobs board
- CTA section

✅ **Tailwind Config & Globals**
- Dark theme support
- Custom color scheme
- Utility classes for cards and badges

✅ **Environment Setup**
- `.env.example` with all required variables
- `vercel.json` for Vercel deployment
- `package.json` with all dependencies

---

## 🚀 Next Steps to Complete MVP

### Step 1: Install Dependencies & Setup DB
```bash
# Install all packages
npm install

# Copy env file
cp .env.example .env

# Fill in .env with your Postgres connection string
# Generate NEXTAUTH_SECRET: openssl rand -base64 32

# Generate Prisma client
npx prisma generate

# Run migrations
npm run prisma:migrate:dev

# Seed sample data (optional)
npm run seed

# Start dev server
npm run dev
```

### Step 2: Remaining Pages to Build (High Priority)
1. **Auth Pages** (`app/(auth)/`)
   - `signup/page.tsx` — Email .ac.id verification + OTP
   - `verify-otp/page.tsx` — OTP input and verification
   - `upload-ktm/page.tsx` — Selfie + KTM upload
   - `login/page.tsx` — Email + OTP login

2. **Main Pages** (`app/(main)/`)
   - `create/page.tsx` — Create Open PO form (with fields for driver/helper options)
   - `browse/page.tsx` — List all POs with filters
   - `browse/[id]/page.tsx` — PO detail + join button
   - `driver-jobs/page.tsx` — List driver jobs + accept button
   - `helper-jobs/page.tsx` — List helper jobs + apply button
   - `jasa-titip/page.tsx` — List proxy requests
   - `profile/[id]/page.tsx` — User profile + ratings + wallet
   - `wallet/page.tsx` — Wallet balance + top-up + transaction history
   - `notifications/page.tsx` — Notification list

3. **API Routes** (`app/api/`)
   - `auth/send-otp/route.ts` — Send OTP to .ac.id email
   - `auth/verify-otp/route.ts` — Verify OTP + create/login user
   - `users/route.ts` — GET profile, PATCH profile, POST upload-ktm
   - `po/route.ts` — GET list, POST create, GET detail
   - `po/[id]/join/route.ts` — POST join PO
   - `driver-jobs/route.ts` — GET list, POST accept job
   - `helper-jobs/route.ts` — GET list, POST apply for job
   - `wallet/route.ts` — GET balance, POST top-up
   - Admin routes for KTM review

### Step 3: Root Layout & Providers
Update `app/layout.tsx` to include:
- NextAuth session provider
- Dark mode provider (next-themes)
- Navbar + FAB + Footer wrapper
- Global error boundary

### Step 4: Auth Implementation
- Implement `lib/auth.ts` with NextAuth config
- OTP generation + validation
- Email service integration (Sendgrid/Mailgun)
- Session management

### Step 5: Wallet System
- Implement `lib/wallet.ts` for balance calculations
- Top-up flow (payment gateway integration)
- Transaction history
- Escrow logic for helper jobs

### Step 6: Real-time Features (Optional for MVP)
- Toast notifications (react-toastify or shadcn toast)
- Notification bell updates
- Job status updates

### Step 7: Deploy to Vercel
```bash
# Push to GitHub
git add .
git commit -m "Initial XIAO PAI MVP scaffold"
git push origin main

# On Vercel:
# 1. Import from GitHub
# 2. Add environment variables
# 3. Set DATABASE_URL (Vercel Postgres or external)
# 4. Deploy
```

---

## 🔄 Architecture Overview

```
XIAO PAI MVP
├─ Frontend (Next.js 14 + React 19)
│  ├─ Pages (Auth, Browse, Jobs, Profile, Wallet)
│  ├─ Components (UI, Cards, Forms)
│  └─ Styles (Tailwind + Dark Mode)
│
├─ Backend (Next.js API Routes)
│  ├─ Auth (OTP, verification, session)
│  ├─ User (profile, KTM upload, approval)
│  ├─ PO (create, browse, join)
│  ├─ Jobs (driver, helper, jasa titip)
│  ├─ Wallet (balance, top-up, transactions)
│  └─ Admin (KTM review, moderation)
│
├─ Database (PostgreSQL + Prisma)
│  ├─ User (roles, verification)
│  ├─ Wallet (balance, earnings)
│  ├─ Listings (PO, HelperJob, ProxyRequest)
│  ├─ Jobs (DriverJob, assignments)
│  └─ Reviews & Notifications
│
└─ Deployment (Vercel)
   ├─ GitHub (source control)
   ├─ Database (Vercel Postgres)
   └─ Environment variables
```

---

## 💰 Revenue Model (Implemented via API)

- **PO Purchase**: 8% fee → Platform
- **Driver Job**: Rp1,500–2,000 per job → Platform
- **Helper Job**: 10% of rate → Platform
- **Jasa Titip**: Negotiable tips

Fees auto-calculated in transaction system (see `lib/calculations.ts` TODO).

---

## 🎨 Design System

**Colors**:
- Primary: `#FF6B9D` (Soft Pink)
- Success: `#22C55E` (Green) — Open status
- Alert: `#EF4444` (Red) — Driver needed
- Warning: `#EAB308` (Yellow) — Helper needed
- Info: `#3B82F6` (Blue)

**Typography**:
- Font: Inter or Satoshi
- Headings: Bold (h1-h3)
- Body: Regular weight

**Components**:
- Card: Rounded corners, subtle shadow, hover effect
- Button: Rounded, medium padding, focus ring
- Badge: Inline-flex, color-coded

---

## ✅ MVP Success Criteria

- [ ] Users can sign up with .ac.id email + OTP
- [ ] Seller/Driver KTM upload + admin approval (24h SLA)
- [ ] Create Open PO with driver/helper options
- [ ] Browse POs with search + filters
- [ ] Join PO as buyer
- [ ] Accept driver/helper jobs
- [ ] Wallet: top-up + transaction history
- [ ] Notifications for job updates
- [ ] User profile + ratings
- [ ] Dark mode toggle
- [ ] Mobile responsive
- [ ] Deploy live on Vercel
- [ ] 10+ test users active

---

## 📚 File Checklist

### Created ✅
- `package.json` (updated with deps)
- `tailwind.config.ts` (updated)
- `app/globals.css` (updated)
- `components/ui/Button.tsx`
- `components/ui/Input.tsx`
- `components/ui/Badge.tsx`
- `components/ui/Card.tsx`
- `components/layout/Navbar.tsx`
- `components/layout/FAB.tsx`
- `components/layout/Footer.tsx`
- `app/(main)/page.tsx` (home)
- `prisma/schema.prisma` (updated with Wallet, HelperJob, KTM, etc.)
- `.env.example` (updated)
- `vercel.json`
- `XIAO_PAI_SPEC.md`
- `README.md` (updated)

### To Create (Next Priority)
- `app/layout.tsx` (root + providers)
- `app/(auth)/` pages (signup, verify-otp, upload-ktm, login)
- `app/(main)/` pages (create, browse, detail, jobs, profile, wallet)
- `app/api/auth/` routes (send-otp, verify-otp)
- `app/api/users/` routes
- `app/api/po/` routes
- `app/api/driver-jobs/` routes
- `app/api/helper-jobs/` routes
- `app/api/wallet/` routes
- `lib/auth.ts` (NextAuth config)
- `lib/email.ts` (OTP sending)
- `lib/wallet.ts` (balance calculations)
- `lib/validators.ts` (Zod schemas)

---

## 🔗 Quick Commands

```bash
# Development
npm run dev                   # Start dev server (localhost:3000)
npm run build                # Build for production
npm start                    # Start prod server

# Database
npm run prisma:generate      # Generate Prisma client
npm run prisma:migrate:dev   # Run pending migrations
npm run prisma:studio        # Open Prisma Studio
npm run seed                 # Seed sample data

# Deployment
npm run build && npm start   # Build + start
git push origin main         # Push to GitHub (triggers Vercel auto-deploy)
```

---

## 🎯 Current Status

**Completed**: 30%
- ✅ Project structure
- ✅ UI components & styling
- ✅ Database schema
- ✅ Home page
- ✅ Navigation & layout
- ❌ Auth pages & API
- ❌ Main feature pages
- ❌ Job listing & management
- ❌ Wallet system
- ❌ Admin panel

**Next 48 Hours**: Complete 60% (auth + core pages)
**Week 1**: Reach 90% (all MVPs + polish)
**Week 2**: Deploy 100% (production on Vercel)

---

## 🆘 Common Issues & Fixes

**Issue**: `Cannot find module 'next-themes'`  
**Fix**: Run `npm install` again after updating `package.json`

**Issue**: Prisma schema validation errors  
**Fix**: Ensure all relation fields have opposite fields defined

**Issue**: Dark mode not working  
**Fix**: Update `app/layout.tsx` to wrap with `ThemeProvider` from next-themes

**Issue**: Tailwind classes not applying  
**Fix**: Rebuild CSS by stopping and restarting dev server (`npm run dev`)

---

## 📞 Support & Questions

- 📖 Full spec: See `XIAO_PAI_SPEC.md`
- 🎨 Design inspiration: oskm.itb.ac.id
- 💬 GitHub Issues for bugs/features
- 📧 support@xiaopai.campus

---

**Made with ❤️ for XIAO PAI | Small dispatch, big impact | 小派**
