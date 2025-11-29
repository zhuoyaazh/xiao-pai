# 🚀 QUICK START CARD

## One-Minute Setup

```bash
# 1. Install
npm install

# 2. Setup .env
cp .env.example .env
# Then edit and set: DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

# 3. Database (generate Prisma + create tables)
npx prisma generate
npx prisma migrate dev --name init

# 4. Run!
npm run dev

# Open: http://localhost:3000 ✨
```

---

## Test Accounts

### Default Test User
- Email: `test@student.universitas.ac.id`
- Password: (Use OTP system — no password needed)
- OTP: Check terminal console (logged there for MVP)

### Test Files for KTM
- Use any `.jpg` or `.png` from your computer
- No size limit for MVP testing

---

## Page Quick Links

| Feature | URL | What to Test |
|---------|-----|-------------|
| **Sign Up** | `/signup` | Enter .ac.id email → Get OTP |
| **OTP** | `/verify-otp` | Paste OTP from console → Verify |
| **Upload KTM** | `/upload-ktm` | Upload 2 images → Complete signup |
| **Home** | `/` | See hot POs + job boards |
| **Create PO** | `/create` | Fill form → Create PO |
| **Browse** | `/browse` | See all POs → Search/filter |
| **Driver Jobs** | `/driver-jobs` | See jobs → Accept |
| **Helper Jobs** | `/helper-jobs` | See jobs → Apply |
| **Jasa Titip** | `/jasa-titip` | Create/browse proxy requests |
| **Wallet** | `/wallet` | See balance → Top-up |
| **Profile** | `/profile/any-id` | View user profile |
| **Notifications** | `/notifications` | See alerts → Mark read |

---

## API Endpoints Quick Reference

```
POST   /api/auth/send-otp           Send OTP email
POST   /api/auth/verify-otp         Verify OTP code
POST   /api/po                       Create Open PO
GET    /api/po                       List POs (with filters)
POST   /api/driver-jobs/[id]/accept  Accept driver job
GET    /api/driver-jobs              List driver jobs
POST   /api/helper-jobs/[id]/apply   Apply for helper job
GET    /api/helper-jobs              List helper jobs
GET/POST /api/proxy-requests         List/create proxy requests
POST   /api/wallet/topup             Top-up wallet
GET    /api/wallet/balance           Get wallet balance
GET    /api/wallet/history           Transaction history
GET    /api/notifications            List notifications
GET    /api/users/[id]               Get user profile
POST   /api/users/me/upload-ktm      Upload KTM files
```

---

## Commands Cheat Sheet

```bash
# Development
npm run dev              Start dev server (port 3000)

# Database
npx prisma generate     Create Prisma client
npx prisma migrate dev  Run migrations
npx prisma studio      Open DB admin UI

# Build & Deploy
npm run build           Build for production
npm run start           Start production server
npm run lint            Check code quality

# Cleanup
rm -rf node_modules    Delete dependencies (if stuck)
npm install --legacy   Install with compatibility mode
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Can't find module X" | `npm install` |
| "Port 3000 in use" | `lsof -ti:3000 \| xargs kill -9` or use `-p 3001` |
| "Database connection failed" | Check `.env` DATABASE_URL |
| "OTP not showing" | Check TERMINAL console (not browser DevTools) |
| "Tailwind styles missing" | Run `npm run dev` again (rebuild) |
| "TypeScript errors" | These are expected during MVP — not blocking |

---

## Key Files to Know

```
SETUP_COMPLETE.md         Full setup guide
TESTING_CHECKLIST.md      Step-by-step testing
PROJECT_STATUS_REPORT.md  Current status
FILE_INDEX.md             All files created
XIAO_PAI_SPEC.md          Full specifications
```

---

## Color System (Tailwind)

- 🔴 Primary (Pink): `text-xiao-pink`, `bg-xiao-pink`
- 🟢 Success: `text-xiao-green`, `bg-xiao-green`
- 🔴 Error: `text-xiao-red`, `bg-xiao-red`
- 🟡 Warning: `text-xiao-yellow`, `bg-xiao-yellow`
- 🔵 Info: `text-xiao-blue`, `bg-xiao-blue`

---

## Dark Mode

Toggle with moon/sun icon in top-right of Navbar. Applies to all pages automatically via `next-themes`.

---

## Next Priority

**After testing this MVP:**
1. Implement proper NextAuth.js (currently uses placeholder user ID)
2. Setup SendGrid for real email OTP
3. Integrate AWS S3 for file uploads
4. Setup Midtrans/Stripe for payments

See `SETUP_COMPLETE.md` for full TODO list.

---

**Status**: ✅ **READY TO RUN**

Start with: `npm install && npm run dev` 🚀

Questions? Check the docs or review XIAO_PAI_SPEC.md
