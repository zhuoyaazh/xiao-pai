import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Get actual user ID from session
    const userId = "user-id-placeholder";

    const job = await prisma.helperJob.findUnique({
      where: { id: params.id },
    });

    if (!job) {
      return NextResponse.json(
        { message: "Job tidak ditemukan" },
        { status: 404 }
      );
    }

    if (job.helpersFilled >= job.helpersNeeded) {
      return NextResponse.json(
        { message: "Kuota sudah penuh" },
        { status: 400 }
      );
    }

    // Update helper job
    await prisma.helperJob.update({
      where: { id: params.id },
      data: {
        helpersFilled: { increment: 1 },
        acceptedHelpers: {
          push: userId,
        },
      },
    });

    return NextResponse.json(
      { message: "Aplikasi berhasil dikirim" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error applying to helper job:", error);
    return NextResponse.json(
      { message: "Gagal apply job" },
      { status: 500 }
    );
  }
}
