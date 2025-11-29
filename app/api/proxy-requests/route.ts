import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const requests = await prisma.proxyRequest.findMany({
      where: { status: "OPEN" },
      include: {
        requester: { select: { id: true, name: true, rating: true } },
        offers: { select: { id: true } },
      },
      take: 20,
    });

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error("Error fetching proxy requests:", error);
    return NextResponse.json(
      { message: "Gagal fetch proxy requests" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, details, estimatedBudget } = body;

    // TODO: Get actual user ID from session
    const requesterId = "user-id-placeholder";

    const proxyRequest = await prisma.proxyRequest.create({
      data: {
        requesterId,
        title,
        details,
        estimatedBudget,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week deadline
        status: "OPEN",
      },
    });

    return NextResponse.json(
      { id: proxyRequest.id, message: "Request berhasil dibuat" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating proxy request:", error);
    return NextResponse.json(
      { message: "Gagal membuat proxy request" },
      { status: 500 }
    );
  }
}
