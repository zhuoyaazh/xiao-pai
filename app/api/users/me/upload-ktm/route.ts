import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const selfie = formData.get("selfie") as File;
    const ktm = formData.get("ktm") as File;

    if (!selfie || !ktm) {
      return NextResponse.json(
        { message: "Semua file harus diunggah" },
        { status: 400 }
      );
    }

    // TODO: Get actual user ID from session
    const userId = "user-id-placeholder";

    // TODO: Upload files to S3/storage
    // const selfieUrl = await uploadToS3(selfie);
    // const ktmUrl = await uploadToS3(ktm);

    const selfieUrl = `file-${Date.now()}-selfie.jpg`;
    const ktmUrl = `file-${Date.now()}-ktm.jpg`;

    // Create KTM verification record
    await prisma.kTMVerification.create({
      data: {
        userId,
        selfiePath: selfieUrl,
        ktmPath: ktmUrl,
        status: "PENDING",
      },
    });

    // Update user status
    await prisma.user.update({
      where: { id: userId },
      data: { verificationStatus: "PENDING_KTM" },
    });

    return NextResponse.json(
      { message: "KTM berhasil diunggah, menunggu verifikasi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading KTM:", error);
    return NextResponse.json(
      { message: "Gagal upload KTM" },
      { status: 500 }
    );
  }
}
