import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      category,
      description,
      price,
      minQty,
      maxQty,
      deadline,
      needsDriver,
      driverSlotsNeeded,
      needsHelper,
      helperNeeded,
      helperRatePerPerson,
    } = body;

    // TODO: Get actual user ID from session
    const sellerId = "user-id-placeholder";

    const po = await prisma.groupPurchase.create({
      data: {
        sellerId,
        title,
        category,
        description,
        images: [],
        price,
        minQty: parseInt(minQty),
        maxQty: parseInt(maxQty),
        currentQty: 0,
        deadline: new Date(deadline),
        status: "ACTIVE",
        needsDriver,
        driverSlotsNeeded: needsDriver ? parseInt(driverSlotsNeeded) : 0,
        driverSlotsFilled: 0,
        needsHelper,
        helperNeeded: needsHelper ? parseInt(helperNeeded) : 0,
        helperRatePerPerson: needsHelper ? parseInt(helperRatePerPerson) : 0,
      },
    });

    return NextResponse.json({ id: po.id, message: "PO berhasil dibuat" }, { status: 201 });
  } catch (error) {
    console.error("Error creating PO:", error);
    return NextResponse.json({ message: "Gagal membuat PO" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: { status: string; category?: string; title?: any } = { status: "ACTIVE" };
    if (category) where.category = category;
    if (search) where.title = { contains: search, mode: "insensitive" };

    const pos = await prisma.groupPurchase.findMany({
      where,
      include: {
        seller: { select: { id: true, name: true, rating: true } },
        participants: { select: { id: true } },
      },
      take: 20,
    });

    return NextResponse.json(pos, { status: 200 });
  } catch (error) {
    console.error("Error fetching POs:", error);
    return NextResponse.json({ message: "Gagal fetch POs" }, { status: 500 });
  }
}
