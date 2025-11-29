import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // TODO: Get actual user ID from session
    const userId = "user-id-placeholder";

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return NextResponse.json(
      { message: "Gagal fetch history" },
      { status: 500 }
    );
  }
}
