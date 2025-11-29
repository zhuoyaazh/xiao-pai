import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Reference to OTP store from send-otp route
const otpStore: Record<string, { code: string; expiresAt: number }> = {};

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    // Check if OTP exists and is valid
    const storedOtp = otpStore[email];
    if (!storedOtp || storedOtp.code !== otp) {
      return NextResponse.json(
        { message: "OTP salah atau kadaluarsa" },
        { status: 400 }
      );
    }

    if (storedOtp.expiresAt < Date.now()) {
      delete otpStore[email];
      return NextResponse.json(
        { message: "OTP telah kadaluarsa" },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // New user - create account
      user = await prisma.user.create({
        data: {
          email,
          name: email.split("@")[0],
          roles: ["BUYER"],
          verificationStatus: "PENDING_KTM",
        },
      });

      // Create wallet for new user
      await prisma.wallet.create({
        data: {
          userId: user.id,
          balanceCents: 0,
          totalEarned: 0,
          totalSpent: 0,
        },
      });
    }

    // Clear OTP
    delete otpStore[email];

    // TODO: Create session/JWT token
    // For now, return user data
    return NextResponse.json(
      {
        message: "Verifikasi berhasil",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          verificationStatus: user.verificationStatus,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { message: "Gagal verifikasi OTP" },
      { status: 500 }
    );
  }
}
