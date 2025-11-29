import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "OPEN";

    const jobs = await prisma.driverJob.findMany({
      where: { status },
      include: {
        po: {
          select: {
            id: true,
            title: true,
            seller: { select: { id: true, name: true } },
          },
        },
      },
      take: 20,
    });

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching driver jobs:", error);
    return NextResponse.json(
      { message: "Gagal fetch driver jobs" },
      { status: 500 }
    );
  }
}
