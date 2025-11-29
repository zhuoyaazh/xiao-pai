import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { read } = await req.json();

    const notification = await prisma.notification.update({
      where: { id: params.id },
      data: { read },
    });

    return NextResponse.json(notification, { status: 200 });
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { message: "Gagal update notification" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.notification.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Notification deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json(
      { message: "Gagal delete notification" },
      { status: 500 }
    );
  }
}
