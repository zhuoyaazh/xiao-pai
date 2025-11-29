# XIAO PAI (小派) — Campus Marketplace Platform

**Tagline**: "Satu kampus, satu geng. Apa aja dibantuin."

A modern, mobile-first campus marketplace for students to buy, sell, and earn through 4 main activities:
1. **Open PO & Product Listing** — Group bulk purchases with automatic driver/helper matching
2. **Driver Jobs Pool** — Accept delivery gigs (with Big Split support for large orders)
3. **Helper Jobs Pool** — Pick up gigs (cooking, packing, printing) with wallet escrow payment
4. **Jasa Titip** — Request proxy purchases (Indomaret run, laundry, etc.)

## 🎯 Key Features

- ✅ **Campus-Verified Only**: Email .ac.id verification + KTM upload for Sellers/Drivers (24h manual review)
- ✅ **Multi-Role Support**: Users can be Buyer, Seller, Driver, Helper simultaneously
- ✅ **Wallet & Escrow System**: Top-up, earn, transfer; Helper jobs locked in escrow until completion
- ✅ **Big Split Delivery**: 1 large order auto-split into multiple driver slots (e.g., 200 boxes → 4 drivers)
- ✅ **Color-Coded Badges**: Green (open), Red (needs driver), Yellow (needs helper), Blue (info)
- ✅ **OSKM ITB-Inspired UI**: Card-based, clean, mobile-first design (99% visual similarity)
- ✅ **Dark Mode**: Toggle dark/light theme system-wide
- ✅ **Floating Action Button (FAB)**: Quick "+ Create PO" on mobile
- ✅ **Real-time Notifications**: Bell icon with status updates + toast alerts

## 📋 Prerequisites & Setup

### Requirements
- Node.js 18+ 
- PostgreSQL (local or Vercel Postgres)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Edit `.env`:
```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/xiaopai?schema=public"

# NextAuth & Authentication
NEXTAUTH_SECRET="generate with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Email Service (for OTP)
EMAIL_SERVICE="sendgrid"  # or mailgun
EMAIL_API_KEY="your-api-key"

# File Upload (S3/Vercel Blob)
S3_BUCKET="your-bucket"
S3_REGION="us-east-1"
S3_ACCESS_KEY_ID="xxx"
S3_SECRET_ACCESS_KEY="yyy"

# Payment Gateway (optional for MVP)
MIDTRANS_SERVER_KEY="xxx"
MIDTRANS_CLIENT_KEY="yyy"
```

### 3. Database Setup
```bash
# Generate Prisma Client
npm run prisma:generate

# Create & migrate database
npm run prisma:migrate:dev

# Seed sample data (optional)
npm run seed

# View database (optional, opens Prisma Studio)
npm run prisma:studio
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui |
| **Backend** | Next.js API Routes, NextAuth v5 (OTP), Prisma ORM |
| **Database** | PostgreSQL (Vercel Postgres recommended) |
| **Auth** | Email .ac.id verification + OTP, KTM upload + admin review |
| **File Storage** | S3 / Vercel Blob |
| **Payment** | Midtrans / Xendit (MVP: manual QRIS) |
| **Deployment** | Vercel (auto-deploy on push) |

## 📁 Project Structure

```
xiaopai/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── verify-otp/
│   │   └── upload-ktm/
│   ├── (main)/
│   │   ├── page.tsx                 # Home/Landing
│   │   ├── browse/                  # Browse POs/Jobs
│   │   ├── create/                  # Create PO/Request
│   │   ├── driver-jobs/
│   │   ├── helper-jobs/
│   │   ├── jasa-titip/
│   │   ├── profile/[id]/
│   │   ├── wallet/
│   │   └── notifications/
│   ├── api/
│   │   ├── auth/                    # OTP, verification
│   │   ├── users/                   # Profile, KTM upload
│   │   ├── po/                      # Open PO CRUD
│   │   ├── driver-jobs/
│   │   ├── helper-jobs/
│   │   ├── proxy/                   # Jasa Titip
│   │   ├── wallet/
│   │   ├── reviews/
│   │   └── notifications/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                          # shadcn-style components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── FAB.tsx
│   │   └── Sidebar.tsx
│   ├── cards/
│   │   ├── POCard.tsx
│   │   ├── JobCard.tsx
│   │   └── ProxyCard.tsx
│   └── forms/
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── validators.ts
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
│   ├── logo.svg
│   └── images/
├── XIAO_PAI_SPEC.md                 # Full spec (for AI generation)
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

## 🚀 Available Scripts

```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm start                # Start prod server
npm run lint             # Run ESLint
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate:dev   # Run pending migrations
npm run prisma:studio    # Open Prisma Studio (visual DB)
npm run seed             # Populate with sample data
```

## 💾 Database Schema Overview

**Core Tables**:
- `User` — Profile, roles, ratings, verification status
- `KTMVerification` — Selfie + KTM photos, admin review status
- `Wallet` — Balance, transaction history, earnings
- `GroupPurchase` — Open PO listings
- `POParticipant` — Buyers joined to PO
- `HelperJob` — Helper gig listings
- `DriverJob` — Delivery job listings (with Big Split support)
- `ProxyRequest` — Jasa Titip requests
- `ProxyOffer` — Responses to Jasa Titip
- `Review` — User ratings & feedback
- `Notification` — User alerts
- `Transaction` — Wallet transactions

👉 **See `XIAO_PAI_SPEC.md` for complete schema, API routes, and detailed specs.**

## 🎨 UI/UX Design System

- **Colors**:
  - Primary: Soft Pink (#FF6B9D)
  - Success: Green (#22C55E)
  - Urgent: Red (#EF4444)
  - Warning: Yellow (#EAB308)
  - Info: Blue (#3B82F6)

- **Badges** (auto-colored):
  - 🟢 Sedang buka sampai 18:00
  - 🔴 Butuh X Driver
  - 🟡 Butuh X Helper
  - ✓ Verified badge

- **Components**: Button, Input, Badge, Card, Dialog, Tabs (all shadcn-style)
- **Responsive**: Mobile-first (100% mobile optimized)
- **Theme**: Dark mode toggle (Tailwind + next-themes)

## 🔐 Authentication Flow

1. User enters `.ac.id` email → OTP sent (10 min validity)
2. User verifies OTP → Creates account or logs in
3. If becoming Seller/Driver → Must upload selfie + KTM
4. Admin reviews within 24h → Approval/rejection notification
5. Once verified → Can create POs, accept driver/helper jobs

## 💰 Fee Structure

| Activity | Fee | Example |
|----------|-----|---------|
| PO Purchase | 8% | Rp500k order → Platform takes Rp40k |
| Driver Delivery | Rp1,500–2,000 flat | Assigned automatically per job |
| Helper Job | 10% | Rp100k rate × 10 helpers → Platform takes Rp100k total |
| Jasa Titip | Negotiable | Buyer tips + responder negotiates |

## 📤 Deployment to Vercel

```bash
# 1. Push to GitHub (private repo)
git push origin main

# 2. Import on Vercel (vercel.com)
# 3. Add Environment Variables:
#    - DATABASE_URL
#    - NEXTAUTH_SECRET
#    - NEXTAUTH_URL (production domain)
#    - EMAIL_API_KEY
#    - S3_* keys
#    - MIDTRANS_* keys

# 4. Auto-deploy on push
```

For manual deploy:
```bash
npm i -g vercel
vercel --prod
```

## ✅ MVP Checklist

- [ ] Email .ac.id verification + OTP login
- [ ] KTM upload & admin review (24h SLA)
- [ ] Create Open PO (with driver/helper options)
- [ ] Browse & filter POs, jobs, requests
- [ ] Accept driver/helper jobs (with Big Split)
- [ ] Wallet top-up & transaction history
- [ ] Real-time notifications
- [ ] User profile + ratings
- [ ] Dark mode toggle
- [ ] Mobile responsive (90+ Lighthouse score)
- [ ] Live on Vercel with custom domain
- [ ] 10+ test users active
- [ ] Seed data loaded

## 🎯 Next Phase (Post-MVP)

- Real payment integration (Midtrans checkout)
- In-app chat (buyer ↔ seller, driver communication)
- Video KTM verification (liveness check)
- Dispute resolution & refunds
- Analytics dashboard (admin)
- Referral system (invite friends, earn credits)
- Auto recommendation engine (trending POs)
- Review & rating visibility on profiles

## 📚 Full Specification

**For complete API routes, database schema, UI mockups, and detailed feature specs:**
👉 **See [`XIAO_PAI_SPEC.md`](./XIAO_PAI_SPEC.md)**

To generate full Next.js codebase from spec, copy [`XIAO_PAI_SPEC.md`](./XIAO_PAI_SPEC.md) and paste into ChatGPT/Cursor with:
> "Build complete Next.js 14 (TypeScript) project for XIAO PAI using the spec above. Stack: Next.js 14 App Router, Tailwind CSS, shadcn/ui, Prisma + Vercel Postgres, NextAuth OTP. UI 99% similar to oskm.itb.ac.id. Deploy-ready for Vercel."

## 📞 Support & Issues

- 🐛 Found a bug? Create an issue on GitHub
- 💬 Have questions? Check `XIAO_PAI_SPEC.md` or GitHub Discussions
- 📧 Email: support@xiaopai.campus

## 📄 License

MIT © 2025 XIAO PAI

---

**Made with ❤️ for campus communities | #小派**
