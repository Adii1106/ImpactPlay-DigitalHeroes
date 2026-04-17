import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const charities = [
    {
      name: "Ocean Clean",
      description: "Removing plastic waste from the world's oceans using advanced technology.",
    },
    {
      name: "Tech for Kids",
      description: "Providing laptops and coding education to underprivileged communities.",
    },
    {
      name: "Global Health Init",
      description: "Ensuring access to essential medicines and vaccines in developing nations.",
    },
    {
      name: "Reforest Now",
      description: "Planting native trees to restore ecosystems and fight climate change.",
    },
  ];

  for (const charity of charities) {
    await prisma.charity.upsert({
      where: { id: charity.name }, // This is just a placeholder, name isn't unique in schema but we can use it for seeding
      update: {},
      create: {
        name: charity.name,
        description: charity.description,
      },
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
