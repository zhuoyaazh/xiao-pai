import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const seller = await prisma.user.upsert({
    where: { email: "seller@example.com" },
    update: {},
    create: {
      email: "seller@example.com",
      password: "password",
      name: "Alice Seller",
      roles: ["seller"],
    },
  });

  const buyer = await prisma.user.upsert({
    where: { email: "buyer@example.com" },
    update: {},
    create: {
      email: "buyer@example.com",
      password: "password",
      name: "Bob Buyer",
      roles: ["buyer"],
    },
  });

  const driver = await prisma.user.upsert({
    where: { email: "driver@example.com" },
    update: {},
    create: {
      email: "driver@example.com",
      password: "password",
      name: "Charlie Driver",
      roles: ["driver"],
    },
  });

  const product = await prisma.product.upsert({
    where: { title: "Campus T-Shirt" },
    update: {},
    create: {
      sellerId: seller.id,
      title: "Campus T-Shirt",
      description: "Official campus t-shirt",
      price: 120000,
      stock: 50,
      images: [],
    },
  });

  const po = await prisma.groupPurchase.create({
    data: {
      sellerId: seller.id,
      title: "PO: Campus Tote Bags",
      productTitle: "Campus Tote Bag",
      productDesc: "Canvas tote with campus logo",
      pricePerUnit: 80000,
      minQty: 10,
      maxQty: 100,
      startAt: new Date(),
      endAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      images: [],
    },
  });

  await prisma.poParticipant.create({
    data: {
      poId: po.id,
      userId: buyer.id,
      qty: 2,
    },
  });

  await prisma.proxyRequest.create({
    data: {
      requesterId: buyer.id,
      title: "Please pick up a snack",
      details: "Can someone buy and bring a snack from the campus store?",
      priceOffered: 15000,
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
