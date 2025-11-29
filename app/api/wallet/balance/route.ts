import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // TODO: Get actual user ID from session
    const userId = "user-id-placeholder";

    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      return NextResponse.json(
        { message: "Wallet tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(wallet, { status: 200 });
  } catch (error) {
    console.error("Error fetching wallet:", error);
    return NextResponse.json(
      { message: "Gagal fetch wallet" },
      { status: 500 }
    );
  }
}
