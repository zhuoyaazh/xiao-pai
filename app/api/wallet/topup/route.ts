import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    // TODO: Get actual user ID from session
    const userId = "user-id-placeholder";

    // Update wallet
    await prisma.wallet.update({
      where: { userId },
      data: {
        balanceCents: { increment: amount },
        totalEarned: { increment: amount },
      },
    });

    // Create transaction record
    await prisma.transaction.create({
      data: {
        userId,
        type: "TOP_UP",
        amountCents: amount,
        status: "COMPLETED",
      },
    });

    return NextResponse.json(
      { message: "Top-up berhasil" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error topup wallet:", error);
    return NextResponse.json(
      { message: "Gagal top-up" },
      { status: 500 }
    );
  }
}
