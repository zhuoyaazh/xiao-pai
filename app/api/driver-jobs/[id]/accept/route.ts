import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Get actual user ID from session
    const userId = "user-id-placeholder";

    const job = await prisma.driverJob.update({
      where: { id: params.id },
      data: {
        acceptedDriverId: userId,
        status: "ACCEPTED",
      },
    });

    return NextResponse.json(
      { message: "Job accepted successfully", job },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error accepting job:", error);
    return NextResponse.json(
      { message: "Gagal accept job" },
      { status: 500 }
    );
  }
}
