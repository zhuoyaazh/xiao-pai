import { NextRequest, NextResponse } from "next/server";

// Simple in-memory OTP store (for demo; use Redis in production)
const otpStore: Record<string, { code: string; expiresAt: number }> = {};

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate .ac.id email
    if (!email || !email.endsWith(".ac.id")) {
      return NextResponse.json(
        { message: "Email harus menggunakan domain .ac.id" },
        { status: 400 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP
    otpStore[email] = { code: otp, expiresAt };

    // TODO: Send email via Nodemailer/SendGrid
    console.log(`📧 OTP for ${email}: ${otp}`);

    return NextResponse.json(
      { message: "OTP berhasil dikirim", otp }, // Remove otp from response in production
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { message: "Gagal mengirim OTP" },
      { status: 500 }
    );
  }
}
