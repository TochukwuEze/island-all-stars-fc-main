import { prisma } from "../src/lib/prisma";
import { experts } from "../src/lib/expertsData";

async function main() {
  console.log("Seeding executives...");

  for (let i = 0; i < experts.length; i++) {
    const expert = experts[i];

    await prisma.executive.upsert({
      where: { slug: expert.slug },
      update: {
        name: expert.name,
        role: expert.role,
        image: expert.image,
        description: expert.description || null,
        order: i, // use array index to maintain order
      },
      create: {
        name: expert.name,
        role: expert.role,
        slug: expert.slug,
        image: expert.image,
        description: expert.description || null,
        order: i,
      },
    });
    console.log(`Upserted ${expert.name}`);
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
