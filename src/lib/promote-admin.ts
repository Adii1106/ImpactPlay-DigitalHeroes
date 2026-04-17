import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function promoteAdmin(email: string) {
  if (!email) {
    console.error("Please provide an email address as an argument.");
    process.exit(1);
  }

  try {
    const user = await prisma.userProfile.update({
      where: { email },
      data: { role: "admin" },
    });

    console.log(`Success! ${user.email} has been promoted to ADMIN.`);
  } catch (error) {
    console.error(`Error: User with email ${email} not found or update failed.`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

const email = process.argv[2];
promoteAdmin(email);
