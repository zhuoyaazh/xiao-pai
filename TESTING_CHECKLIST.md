# ✅ XIAO PAI — Installation & Testing Checklist

## Before You Start
- [ ] Node.js 18+ installed? Check: `node --version`
- [ ] PostgreSQL available? (local or Vercel Postgres)
- [ ] Git repo initialized? (will be pushed to GitHub)

---

## 🟢 STEP 1: Install Dependencies (5 min)

```bash
cd c:/Users/Najatunnisa\ S/snapjoyy-project
npm install
```

**Expected output**: "added X packages in Ys"  
**Common issue**: If you see `ERESOLVE unable to resolve dependency tree`, run:
```bash
npm install --legacy-peer-deps
```

---

## 🟢 STEP 2: Setup Environment (2 min)

```bash
# Copy example .env file
cp .env.example .env
```

**Edit `.env` and set these values:**

```env
# 1. DATABASE_URL - Use one of these:
# Option A: Local PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/xiaopai?schema=public"

# Option B: Vercel Postgres (recommended for deployment)
DATABASE_URL="postgresql://default:PASSWORD@ep-XXXX.region.postgres.vercel.com/xiaopai?schema=public"

# 2. NextAuth
NEXTAUTH_SECRET="generate with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# 3. Email (for OTP) - Optional for MVP testing (just logs to console)
EMAIL_SERVICE="sendgrid"
SENDGRID_API_KEY="your-key-here"

# 4. AWS S3 (Optional - file uploads will use placeholder names for now)
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
AWS_S3_BUCKET="xiaopai-uploads"
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
# Output: gvF8a2kL9xQpZm3nB7jKoPs2wRt1vYuH8qM5dCxJ+2I=
# Copy this and paste in .env
```

---

## 🟢 STEP 3: Setup Database (3 min)

```bash
# Generate Prisma client
npx prisma generate

# Create tables (runs migration)
npx prisma migrate dev --name init

# (Optional) Seed demo data
npx prisma db seed
```

**Expected output**: "PostgreSQL database synchronised"

---

## 🟢 STEP 4: Run Development Server (1 min)

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 16.0.3
- Local:        http://localhost:3000
- Environments: .env.local

✓ Ready in 2.5s
```

✅ If you see this, SUCCESS! Open http://localhost:3000

---

## 🧪 STEP 5: Test Full Auth Flow (10 min)

### Test 5A: Signup
```
1. Go to: http://localhost:3000/signup
2. Enter: anyname@student.universitas.ac.id (any .ac.id email)
3. Click: "Kirim OTP"
   → Should see page: "Verifikasi OTP" with email shown
4. Check CONSOLE OUTPUT in your terminal:
   → Look for: "📧 OTP for ... : 123456"
   → Copy this 6-digit code
```

### Test 5B: Verify OTP
```
1. You're already on /verify-otp page
2. Paste the 6-digit OTP in the input
3. Click: "Verifikasi"
   → Should redirect to /upload-ktm
```

### Test 5C: Upload KTM
```
1. You're now on /upload-ktm page
2. Click "Pilih Foto" under "Foto Selfie"
   → Select any .jpg/.png file from your computer
3. Click "Pilih Foto" under "Foto Kartu Tanda Mahasiswa"
   → Select any other .jpg/.png file
4. Click: "Upload dan Lanjut"
   → Should redirect to home page /
```

### Test 5D: Home Page
```
1. You're now logged in on the home page
2. You should see:
   ✓ XIAO PAI logo + navigation bar
   ✓ Search bar for POs
   ✓ "Hot POs" section with 3 sample cards
   ✓ Driver & Helper job boards
   ✓ Dark mode toggle (top right of Navbar)
```

---

## 🎮 STEP 6: Test Main Features (15 min)

### Feature A: Create Open PO
```
1. Click "+ Buat PO" button (FAB on mobile, or Navbar link)
2. Fill the form:
   - Judul: "Jajan Kue di Ace Bakery"
   - Kategori: "Makanan"
   - Deskripsi: "Beliin kue tart chocolate, ambil yang fresh"
   - Harga: 50000
   - Min Qty: 2
   - Max Qty: 10
   - Deadline: Tomorrow 3:00 PM
   - ☑ Butuh Driver? Yes, 1 slot
   - ☑ Butuh Asisten? Yes, 1 orang, Rp10,000/person
3. Click: "Buat PO"
   → Should see success and redirect to /browse/[id]
```

### Feature B: Browse POs
```
1. Go to: http://localhost:3000/browse
2. You should see:
   ✓ Search bar at top
   ✓ Category filter buttons (Semua, Makanan, Barang, etc.)
   ✓ Your created PO as a card in the list
3. Click on a card:
   → Should show full PO details
```

### Feature C: View Driver Jobs
```
1. Go to: http://localhost:3000/driver-jobs
2. You should see:
   ✓ Filter buttons: Tersedia, Diterima, Selesai
   ✓ List of driver job cards (may be empty if none created)
   ✓ Each card shows: Title, Pickup, Delivery, Reward, "Terima Job" button
```

### Feature D: View Helper Jobs
```
1. Go to: http://localhost:3000/helper-jobs
2. You should see:
   ✓ Filter buttons
   ✓ Job listings with helper count and rate per helper
   ✓ "Lamar Sekarang" button to apply
```

### Feature E: Wallet System
```
1. Go to: http://localhost:3000/wallet
2. You should see:
   ✓ Large pink "Saldo Wallet" card showing: Rp0
   ✓ Total Dikeluarkan, Total Diterima stats
   ✓ Top-up form
3. Try top-up:
   - Enter: 100000
   - Click: "Top-up Sekarang"
   → Should see success message
   ✓ Balance updates to Rp100,000
```

### Feature F: Notifications
```
1. Go to: http://localhost:3000/notifications
2. You should see:
   ✓ Notification list (may be empty at start)
   ✓ Mark read (✓) and delete (✕) buttons
3. List should populate as you trigger actions (create PO, accept job, etc.)
```

### Feature G: Jasa Titip (Proxy)
```
1. Go to: http://localhost:3000/jasa-titip
2. Click: "Buat Request" tab
3. Fill form:
   - Apa yang diminta?: "Ambilkan dokumen di Admisi"
   - Detail: "Perlu diambil hari ini sebelum jam 5 sore"
   - Budget: 50000
4. Click: "Buat Request"
   → Success, switches to "Cari Request" tab
5. See your request in the list
```

### Feature H: Profile
```
1. Go to: http://localhost:3000/profile/[any-user-id]
   (Use your user ID from signup, or a placeholder)
2. You should see:
   ✓ User name + email
   ✓ Verification status badge
   ✓ Star rating
   ✓ Wallet balance
   ✓ Reviews section
```

---

## 🌙 STEP 7: Test Dark Mode (1 min)

```
1. Click the moon/sun icon in Navbar (top right)
2. Page should switch to dark theme
3. All text, backgrounds, and cards should be readable in both modes
4. Click again to switch back to light
```

---

## 📊 Expected Results Summary

| Component | Expected Status |
|-----------|-----------------|
| **Pages** | ✅ All 12 pages load without 404 errors |
| **Forms** | ✅ Can fill and submit without validation errors |
| **Database** | ✅ Data saves to PostgreSQL |
| **Styling** | ✅ All colors match design (pink, green, red, yellow, blue) |
| **Dark Mode** | ✅ Toggle works, theme persists on refresh |
| **Navigation** | ✅ All links work, no broken routes |
| **API Calls** | ✅ Network tab shows successful 200/201 responses |
| **Responsive** | ✅ Works on mobile (375px), tablet (768px), desktop (1200px) |

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'next-themes'"
**Solution**: Run `npm install`. Dependencies weren't installed yet.

### Issue: "PrismaClientInitializationError: Can't reach database"
**Solution**: Check your DATABASE_URL in .env matches your actual PostgreSQL credentials

### Issue: "EADDRINUSE: address already in use :::3000"
**Solution**: Port 3000 is in use. Either:
```bash
# Option A: Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Option B: Use different port
npm run dev -- -p 3001
```

### Issue: "OTP not appearing in console"
**Solution**: Make sure you're looking at the TERMINAL console where `npm run dev` is running, not the browser DevTools console.

### Issue: "Tailwind 4 gradient error: 'bg-gradient-to-br'"
**Solution**: This is already fixed (uses `bg-linear-to-br` in new auth pages), but if you see it elsewhere, replace `bg-gradient-` with `bg-linear-`.

---

## 🎉 You're Done!

When all tests pass, you have a fully functional MVP ready for:
- ✅ Testing core workflows
- ✅ Gathering user feedback
- ✅ Integration with real auth (NextAuth.js)
- ✅ File uploads (S3)
- ✅ Email service (SendGrid)
- ✅ Payment processing (Midtrans/Stripe)

---

## 📝 Notes for Next Phase

**Priority 1 - Session Management**:
- Implement NextAuth.js properly (currently uses placeholder `"user-id-placeholder"`)
- All API routes will then automatically get real user ID

**Priority 2 - File Uploads**:
- Setup AWS S3 bucket
- KTM photos will actually upload instead of placeholder names

**Priority 3 - Email Service**:
- Setup SendGrid API
- OTP will actually email instead of logging to console

See `SETUP_COMPLETE.md` for full TODO list.

---

**Questions?** Check these files:
- `XIAO_PAI_SPEC.md` — Full API & feature specifications
- `FILE_INDEX.md` — Complete file reference
- `SCAFFOLDED_SUMMARY.md` — Architecture overview

**Ready to build?** Start with Step 1 above! 🚀
