# XIAO PAI (小派) — Campus Marketplace Full Specification

## Project Overview
**Name**: XIAO PAI (小派)  
**Tagline**: "Satu kampus, satu geng. Apa aja dibantuin."  
**Mission**: Campus-wide peer-to-peer marketplace for buying, selling, and completing odd jobs.  
**Target Launch**: MVP on Vercel in Q4 2025  

## Brand Guidelines
- **Primary Color**: Soft Pink (#FF6B9D)
- **Secondary Colors**: White (#FFFFFF), Light Gray (#F5F5F5), Dark Gray (#333333)
- **Accent Colors**: 
  - Green (#22C55E) — Active/Open status
  - Red (#EF4444) — Urgent/Driver Needed
  - Yellow (#EAB308) — Helper Needed
  - Blue (#3B82F6) — Information
- **Font**: Inter or Satoshi (similar to OSKM ITB aesthetic)
- **Visual Style**: Clean, card-based, mobile-first, 99% similar to oskm.itb.ac.id
- **Features**: Dark mode toggle, floating action button (FAB), color-coded badges, notification bell

---

## Access Control & Verification

### User Tiers
1. **Buyer** (default)
   - Can browse, purchase, request jastip
   - Access: immediate after email verification

2. **Seller** 
   - Can create Open PO, sell items, request drivers
   - Requirements: verified .ac.id email + upload selfie + KTM (manual review ≤24h)

3. **Driver** (freelance)
   - Can accept delivery jobs, earn per-job fee
   - Requirements: verified .ac.id email + upload selfie + KTM (manual review ≤24h)

4. **Helper**
   - Can accept helper jobs (cooking, packing, printing, etc.)
   - Requirements: verified .ac.id email + optional KTM (for trust boost)

### Email Verification
- Only **.ac.id** domain emails allowed (e.g., nim@mahasiswa.itb.ac.id, nim@student.itb.ac.id, etc.)
- OTP sent to email, valid for 10 minutes
- Resend limit: 3 per hour

### KTM (Student Card) Verification
- Seller/Driver **must** upload selfie + KTM photo before role activation
- Admin/moderator review within 24 hours (manual or auto-flagged for review)
- Approval grants "Verified" badge (green checkmark)
- Rejection → can resubmit after 24h

---

## Core Features & Activities

### 1. Open PO & Product Listing
**What**: Sellers create PO for bulk items (food, stickers, second-hand goods, services)

**Seller Options**:
- Title, description, category, images (up to 5)
- Base price, quantity needed, deadline
- `Self-delivery` OR `Butuh Driver?` (checkbox + num slots)
- `Butuh Helper?` (checkbox + num people + rate per person)
- Categories: Makanan, Barang, Jasa, Helper

**Buyer Action**:
- Browse with search + category filter
- Click PO → see details + join button
- "Gabung PO" → specify quantity → join

**Badge Types** (colored):
- 🟢 Sedang buka sampai 18:00 (green)
- 🔴 Butuh 3 Driver (red)
- 🟡 Butuh 5 Helper (yellow)

---

### 2. Driver Job Pool (Freelance Delivery)
**What**: Sellers needing delivery help → auto-generates driver jobs  
**Special Feature**: Big Split → 1 large order split into multiple driver slots (e.g., 200 boxes → 4 drivers × 50 boxes each)

**Driver Workflow**:
1. Browse "Kerja Antar" pool (real-time jobs)
2. Click "Ambil Slot" → confirm pickup & delivery address + Big Split slot (if applicable)
3. Status flow: `Pending` → `Accepted` → `Pickup` → `In Transit` → `Delivered`
4. Earn: Rp1,500–2,000 per order (platform fee separate)

**Job Info Display**:
- Origin location (seller address)
- Destination location (buyer address)  
- Estimated distance & reward
- "Butuh X slot(s)" for Big Split
- Status badge + driver rating

---

### 3. Helper Job Pool (Freelance Work)
**What**: Sellers open "lowongan" for help (cooking, packing, printing, sticker design, thesis printing, etc.)

**Seller Creates Job**:
- Job title + description
- Number of helpers needed
- Rate per person (Rp30,000–200,000)
- Timeline (start/end datetime)
- `Butuh X Helper`

**Helper Workflow**:
1. Browse "Butuh Helper" pool
2. Click job → "Ambil Pekerjaan" 
3. Status flow: `Posted` → `Accepted` → `In Progress` → `Completed` → `Payment Released`
4. Earn: payment rate × completion

**Payment (Escrow)**:
- Seller tops up wallet first (includes job cost + platform fee 10%)
- Helper completes work → confirms done
- Helper gets instant payout (seller's wallet deducted)
- Platform takes 10% fee

---

### 4. Jasa Titip (Proxy Request)
**What**: Any user can request someone to buy + deliver items (Indomaret run, laundry, phone top-up, etc.)

**Requester Creates**:
- Item description
- Estimated budget + tip
- Deadline
- Pickup/delivery location

**Helper Response**:
- Browse open titip requests
- Submit offer + counter-price
- Requester accepts best offer
- Helper buys + delivers
- Payment: cash + tip on delivery (or wallet if set up)

---

## Pages & UI Components Required for MVP

### 1. **Landing / Home Page**
- Hero banner (XIAO PAI branding)
- Large search bar (search by title/category)
- Filter buttons: Makanan | Barang | Jasa | Helper
- **3 Main Sections**:
  - Hot POs (newest, closing soon, popular)
  - Kerja Antar (active driver jobs)
  - Butuh Helper (active helper jobs)
- Card layout (mirip OSKM):
  - Thumbnail image
  - Title + short desc
  - Price/rate + badge (colored)
  - Seller avatar + name + rating
  - "Lihat Detail" button
- Footer with links, about, contact

### 2. **Auth Pages**
- **Sign Up**:
  - Email .ac.id input (validation)
  - Generate & send OTP
  - OTP verification (10 min timer)
  - Success → redirect to role selection OR dashboard
  
- **Login**:
  - Email input
  - OTP verification
  - If Seller/Driver role → check KTM verification status
  
- **Role Selection** (if new):
  - 3 cards: "Pembeli", "Penjual", "Driver"
  - Can select multiple
  - If Seller/Driver → redirect to KTM upload

### 3. **KTM Upload & Verification**
- Selfie camera capture (or upload)
- KTM photo capture (or upload)
- Submit → "Pending Review" badge
- Admin view: dashboard to approve/reject
- User notification: "Terverifikasi ✓" or "Ditolak, silakan coba lagi"

### 4. **Create Listing / Open PO**
- Form with fields:
  - Title, description, category dropdown
  - Images upload (multi)
  - Price, quantity needed, deadline datetime
  - `Self-delivery` radio OR `Butuh Driver?` (show "Berapa slot?" input)
  - `Butuh Helper?` checkbox + num + rate per person
  - Submit button
- Success → redirect to listing detail page

### 5. **Driver Job Pool / Kerja Antar**
- Real-time job list (card grid)
- Filter: distance, reward, status
- Each card shows:
  - Origin → Destination
  - Distance + estimated reward
  - "Butuh X slot" if Big Split
  - "Ambil Slot" button
- Detail view modal/page:
  - Full address, recipient name, item description
  - Big Split breakdown (if applicable)
  - Accept button
- Status tracking page (my accepted jobs)

### 6. **Helper Job Pool / Butuh Helper**
- Real-time job list (card grid)
- Each card shows:
  - Job title + seller name
  - "Butuh X Helper" badge (yellow)
  - Rate per person
  - Timeline
  - "Ambil Pekerjaan" button
- Detail view:
  - Full description, requirements, timeline
  - Accept button → confirm start time
- My jobs page (accepted helper jobs, status, earnings)

### 7. **Jasa Titip Listing**
- Browse requests (similar card layout)
- Create request form (title, budget, deadline, delivery location)
- Offer submission (driver/helper can respond)
- Requester selects best offer
- Status tracking (pending → assigned → completed)

### 8. **User Profile**
- Avatar (editable)
- Name + email
- Rating (⭐⭐⭐⭐⭐) + num reviews + transaction count
- Roles + verification badges (✓ verified, ⚠️ pending)
- Wallet section:
  - Current balance
  - Top-up button (redirect to payment later)
  - Transaction history (last 10)
- Links:
  - My listings
  - My orders (as buyer)
  - My jobs (as driver/helper)
  - My reviews
  - Settings

### 9. **Wallet & Transaction History**
- Balance display (prominent)
- Top-up button (Rp10k–1M, predefined steps)
- Transfer history (date, type, amount, status)
- Escrow holds (if helper job pending)
- Fee breakdown (how much platform took)

### 10. **Notifications**
- Bell icon (top-right, red dot if unread)
- Dropdown/modal showing:
  - "Pembeli bergabung PO kamu" + action
  - "Driver sudah pickup" + order link
  - "Helper accepted job kamu" + action
  - "KTM verification approved/rejected"
  - "Job dibatalkan" + reason
- Toast alerts (bottom-right corner)
  - Green for success
  - Red for error
  - Blue for info

---

## Database Schema

### Core Tables

#### User
```sql
id (UUID)
email (unique, must end with .ac.id)
passwordHash (bcrypt)
name
avatarUrl
bio
roles (ARRAY: 'buyer', 'seller', 'driver', 'helper')
rating (float, 0-5)
reviewCount
transactionCount
verificationStatus ('email_verified', 'pending_ktm', 'verified', 'rejected')
ktmApprovedAt
createdAt
updatedAt
```

#### KTM Verification
```sql
id (UUID)
userId (FK User)
selfiePath (S3/Cloudinary URL)
ktmPath (S3/Cloudinary URL)
status ('pending', 'approved', 'rejected')
rejectionReason
submittedAt
reviewedAt
reviewedBy (admin user ID, nullable)
```

#### Wallet
```sql
id (UUID)
userId (FK User, unique)
balanceCents (integer, in Rp × 100 for precision)
totalEarned
totalSpent
createdAt
updatedAt
```

#### Transaction
```sql
id (UUID)
userId (FK User)
type ('top_up', 'purchase', 'driver_earning', 'helper_earning', 'refund', 'fee')
amount
relatedId (nullable, link to PO/Order/HelperJob)
status ('pending', 'completed', 'failed')
createdAt
```

#### GroupPurchase (Open PO)
```sql
id (UUID)
sellerId (FK User)
title
description
category (Makanan/Barang/Jasa/Helper)
images (ARRAY of URLs)
price
minQty
currentQty
maxQty
deadline
status ('open', 'filled', 'closed', 'completed', 'cancelled')
needsDriver (boolean)
driverSlotsNeeded
driverSlotsFilled
needsHelper (boolean)
helperNeeded
helperRatePerPerson
createdAt
updatedAt
```

#### PO Participant
```sql
id (UUID)
poId (FK GroupPurchase)
buyerId (FK User)
qty
joinedAt
status ('joined', 'confirmed', 'delivered', 'cancelled')
```

#### DriverJob
```sql
id (UUID)
poId or OrderId (FK, which listing this job came from)
sellerId (FK User)
acceptedDriverId (nullable, FK User)
status ('open', 'accepted', 'pickup', 'in_transit', 'delivered', 'cancelled')
pickupAddress
pickupLat / pickupLng
deliveryAddress
deliveryLat / deliveryLng
estimatedDistance
rewardRp
isBigSplitSlot (boolean)
bigSplitSlotNumber (int, e.g., 1/4)
bigSplitTotalSlots (int, e.g., 4)
createdAt
acceptedAt
completedAt
```

#### HelperJob
```sql
id (UUID)
sellerId (FK User)
title
description
helpersNeeded
helpersFilled (current count)
ratePerPerson
startTime
endTime
acceptedHelperIds (ARRAY of User IDs)
status ('open', 'in_progress', 'completed', 'cancelled')
walletHeldAmount (total Rp, seller's escrow)
createdAt
updatedAt
```

#### ProxyRequest (Jasa Titip)
```sql
id (UUID)
requesterId (FK User)
title
description
estimatedBudget
deadline
pickupLat / pickupLng
deliveryLat / deliveryLng
status ('open', 'offered', 'assigned', 'completed', 'cancelled')
createdAt
```

#### ProxyOffer
```sql
id (UUID)
proxyId (FK ProxyRequest)
responderId (FK User)
proposedPrice
message
status ('pending', 'accepted', 'rejected', 'completed')
createdAt
```

#### Order
```sql
id (UUID)
buyerId (FK User)
sellerId (FK User)
poId or single (FK GroupPurchase, nullable)
totalPrice
fee (8% of totalPrice)
status ('created', 'confirmed', 'paid', 'shipped', 'delivered', 'completed', 'cancelled')
shippingAddress
shippingLat / shippingLng
paymentMethod
createdAt
completedAt
```

#### OrderItem
```sql
id (UUID)
orderId (FK Order)
productTitle
quantity
pricePerUnit
totalPrice
```

#### Review
```sql
id (UUID)
fromUserId (FK User)
targetUserId (FK User)
rating (1-5)
text
context ('seller', 'driver', 'helper')
createdAt
```

#### Notification
```sql
id (UUID)
userId (FK User)
type ('po_joined', 'driver_accepted', 'helper_accepted', 'order_shipped', 'ktm_verified', 'job_cancelled', etc.)
title
message
relatedId (nullable)
read (boolean)
createdAt
```

---

## API Routes (Next.js App Router)

### Authentication
- `POST /api/auth/send-otp` — Send OTP to .ac.id email
- `POST /api/auth/verify-otp` — Verify OTP + create/login user
- `POST /api/auth/logout` — Clear session
- `GET /api/auth/session` — Get current user + roles

### User & Verification
- `GET /api/users/[id]` — Get profile
- `PATCH /api/users/[id]` — Update profile
- `POST /api/users/[id]/upload-ktm` — Submit KTM (multipart: selfie, ktm image)
- `GET /api/users/[id]/verification-status` — Check KTM review status
- `GET /api/admin/ktm-reviews` — Admin: list pending KTM (only admin role)
- `POST /api/admin/ktm/[id]/approve` — Admin: approve KTM
- `POST /api/admin/ktm/[id]/reject` — Admin: reject KTM

### Wallet
- `GET /api/wallet/balance` — Get current balance
- `POST /api/wallet/topup` — Initiate top-up (redirect to payment)
- `POST /api/wallet/transfer` — Transfer to another user
- `GET /api/wallet/history` — Transaction history

### Open PO / Group Purchase
- `GET /api/po` — List POs (with filters: category, search, deadline, status)
- `POST /api/po` — Create PO (seller only)
- `GET /api/po/[id]` — Get PO detail + participants
- `POST /api/po/[id]/join` — Join PO as buyer
- `PATCH /api/po/[id]/leave` — Leave PO
- `PATCH /api/po/[id]/status` — Close/finalize PO (seller only)
- `GET /api/po/my-listings` — Seller's own POs

### Driver Jobs
- `GET /api/driver/jobs` — List available driver jobs (with filters: distance, reward)
- `POST /api/driver/jobs/[id]/accept` — Accept job (driver only)
- `PATCH /api/driver/jobs/[id]/status` — Update status (pickup → in_transit → delivered)
- `GET /api/driver/my-jobs` — Driver's accepted jobs
- `POST /api/driver/jobs/[id]/complete` — Mark delivered + trigger payment

### Helper Jobs
- `GET /api/helper/jobs` — List available helper jobs
- `POST /api/helper/jobs/[id]/apply` — Apply for job (helper only)
- `PATCH /api/helper/jobs/[id]/accept-helper` — Accept specific helper (seller only)
- `GET /api/helper/my-jobs` — Helper's accepted jobs
- `POST /api/helper/jobs/[id]/complete` — Mark done + trigger escrow release

### Jasa Titip / Proxy
- `GET /api/proxy` — List open requests
- `POST /api/proxy` — Create request
- `GET /api/proxy/[id]` — Get request detail + offers
- `POST /api/proxy/[id]/offer` — Submit offer (responder only)
- `PATCH /api/proxy/[id]/accept-offer` — Accept offer (requester only)
- `PATCH /api/proxy/[id]/complete` — Mark completed

### Reviews
- `POST /api/reviews` — Submit review
- `GET /api/users/[id]/reviews` — Get user reviews

### Notifications
- `GET /api/notifications` — List notifications
- `PATCH /api/notifications/[id]/read` — Mark as read
- `DELETE /api/notifications/[id]` — Delete notification

### Search & Browse
- `GET /api/search` — Global search (PO, jobs, requests)
- `GET /api/categories` — List categories

---

## Fee Structure

| Transaction Type | Fee | To Platform | To Recipient |
|---|---|---|---|
| PO Purchase | 8% | Platform | Seller 92% |
| Driver Delivery | Rp1,500–2,000 flat | Platform | Driver keeps full job reward |
| Helper Job | 10% of rate | Platform | Helper gets 90% |
| Jasa Titip | Negotiable (buyer tips) | — | Responder + tips |

**Example**:
- Open PO: Rp100k × 5 buyers = Rp500k
- Platform fee (8%): Rp40k → Platform
- Seller receives: Rp460k
- Driver job (Rp2k reward): Platform fee Rp2k
- Helper job: Rp100k rate, 10 helpers → Platform takes Rp10k × 10 = Rp100k total fees

---

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui (Button, Input, Dialog, Badge, Card, Tabs, etc.)
- **Icons**: Lucide React
- **Dark Mode**: next-themes
- **Forms**: React Hook Form + Zod validation
- **State**: Zustand (optional, for wallet/auth state)
- **Image Optimization**: Next.js Image component

### Backend
- **API**: Next.js API Routes
- **Database**: Vercel Postgres (or SQLite for local dev, migrate to Postgres on deploy)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5 (OTP strategy, email verification)
- **File Upload**: S3 or Vercel Blob
- **Payment**: Midtrans SDK (later) or QRIS manual for MVP

### DevOps & Deployment
- **Host**: Vercel (Next.js native)
- **Database**: Vercel Postgres (managed)
- **Version Control**: GitHub (private repo)
- **Environment**: .env.local with DATABASE_URL, NEXTAUTH_SECRET, etc.

---

## Color Scheme & Tailwind Config

```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'xiao-pink': '#FF6B9D',
        'xiao-green': '#22C55E',
        'xiao-red': '#EF4444',
        'xiao-yellow': '#EAB308',
        'xiao-blue': '#3B82F6',
        'xiao-gray-light': '#F5F5F5',
        'xiao-gray-dark': '#333333',
      },
    },
  },
}
```

---

## Deployment Checklist (Vercel)

- [ ] GitHub repo set up (private)
- [ ] Vercel project linked
- [ ] Environment variables added: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, etc.
- [ ] Vercel Postgres database created (or external Postgres linked)
- [ ] Prisma migrations run on Vercel DB (`npm run prisma:migrate:deploy`)
- [ ] `vercel.json` configured (if needed)
- [ ] Domain set up (optional: custom domain or use vercel.app)
- [ ] CI/CD: auto-deploy on push to main
- [ ] Email service (SendGrid/Mailgun API key for OTP) added to env
- [ ] Payment gateway test credentials added (Midtrans, Xendit)

---

## Success Criteria for MVP Launch

✅ Users can sign up with .ac.id email + OTP  
✅ Seller/Driver can upload KTM + get verified  
✅ Create Open PO with images, options for driver/helper  
✅ Browse POs, jobs, requests with search + filter  
✅ Join PO as buyer, accept driver/helper jobs  
✅ Wallet top-up + transaction history  
✅ Notifications for job updates + approval statuses  
✅ User profile with rating + verification badge  
✅ Dark mode toggle  
✅ Mobile responsive (90+ PageSpeed score on mobile)  
✅ Deploy live on Vercel with custom domain  
✅ ~10 test users active on platform  

---

## Next Phase (Post-MVP)

- [ ] Real payment integration (Midtrans/Xendit checkout)
- [ ] Real-time notifications (WebSocket / Pusher)
- [ ] Reviews & rating system (visible on profiles)
- [ ] Dispute resolution & refund system
- [ ] Analytics dashboard (admin)
- [ ] Recommend algorithm (trending POs, hot jobs)
- [ ] In-app chat (buyer ↔ seller, driver communication)
- [ ] Big Split auto-calculation refinement
- [ ] Video verification (KTM verification via liveness check)
- [ ] Referral system (invite friends, earn credits)

---

## File Structure (Next.js 14 App Router)

```
xiaopai-project/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── verify-otp/page.tsx
│   │   └── upload-ktm/page.tsx
│   ├── (main)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Home/Landing
│   │   ├── browse/page.tsx          # POs, jobs, requests
│   │   ├── create/page.tsx          # Create PO/request
│   │   ├── driver-jobs/page.tsx
│   │   ├── helper-jobs/page.tsx
│   │   ├── jasa-titip/page.tsx
│   │   ├── profile/[id]/page.tsx
│   │   ├── wallet/page.tsx
│   │   └── notifications/page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── send-otp/route.ts
│   │   │   ├── verify-otp/route.ts
│   │   │   └── logout/route.ts
│   │   ├── users/route.ts
│   │   ├── po/route.ts
│   │   ├── driver-jobs/route.ts
│   │   ├── helper-jobs/route.ts
│   │   ├── proxy/route.ts
│   │   ├── wallet/route.ts
│   │   ├── reviews/route.ts
│   │   └── notifications/route.ts
│   ├── layout.tsx                   # Root layout
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Dialog.tsx
│   │   └── ... (shadcn-style components)
│   ├── layout/
│   │   ├── Navbar.tsx               # Top navbar with bell, profile
│   │   ├── Sidebar.tsx              # Mobile nav
│   │   └── FAB.tsx                  # Floating action button
│   ├── cards/
│   │   ├── POCard.tsx
│   │   ├── JobCard.tsx
│   │   └── ProxyCard.tsx
│   └── ... (other components)
├── lib/
│   ├── prisma.ts                    # Prisma client
│   ├── auth.ts                      # NextAuth config
│   ├── utils.ts                     # Helper functions
│   ├── api-client.ts                # Fetch wrapper
│   └── validators.ts                # Zod schemas
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
│   ├── logo.svg
│   ├── images/
│   └── ...
├── .env.example
├── .env.local
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── package.json
└── vercel.json
```

---

## Summary

**XIAO PAI** is a campus-wide marketplace combining:
- **Open PO** for bulk buying
- **Driver Jobs** for delivery (with Big Split support)
- **Helper Jobs** for gigs (with wallet escrow)
- **Jasa Titip** for proxy requests

**Key differentiators**:
- .ac.id email verification only (campus-bound)
- KTM verification for trust (24h review)
- Wallet + escrow payment system
- Multi-role support (buyer, seller, driver, helper)
- OSKM ITB-inspired clean, card-based UI
- Mobile-first design
- Dark mode

**Ready to deploy on Vercel** with Postgres backend, fully TypeScript, shadcn/ui components, and dark mode toggle.

Copy this entire spec and paste into ChatGPT / Cursor with:
> "Build a complete Next.js 14 project (TypeScript) for XIAO PAI (小派) — campus marketplace. Use the detailed specification above. Stack: Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui, Prisma + Vercel Postgres, NextAuth OTP flow, email .ac.id verification, KTM upload. UI should be 99% similar to oskm.itb.ac.id. Deploy-ready for Vercel. Include all pages, APIs, database schema, and dummy seed data."
