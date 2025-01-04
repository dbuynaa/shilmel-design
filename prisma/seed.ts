import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const CATEGORIES = [
  {
    name: 'Ажлын хувцас',
    icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/Frame-oPylpPrUvt0Bo5LureMibZdykx2cWD.png',
  },
  {
    name: 'Оффис хувцас',
    icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/Frame%20(1)-luDJKtFdh8EuzsM7SwD4ZheZ1uk6n1.png',
  },
  {
    name: 'Пальто',
    icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/Frame%20(2)-ZttpCJamHGmWlaS2bPNGASbahHWiiE.png',
  },
  {
    name: 'Хатгамал',
    icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/Frame%20(3)-GSOuvIIKgHaHa7RX8Wh8XccyGxWRLr.png',
  },
  {
    name: 'Наалт, хэвлэл',
    icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/Frame-oPylpPrUvt0Bo5LureMibZdykx2cWD.png',
  },
];

const WORK_BRANCHES = [
  {
    id: 'MEDICAL',
    name: 'Эмнэлэг',
    icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/workBranches/b108077b56376a29711398beef150a0c-JANr3vG1pOlwhtdJIgKDTin7xVknNH.png',
    children: [
      {
        name: 'Цамц',
        icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/workBranches/5935df0dbe5adc7c800ff97b97ffa672-GlwN3OFXjZg4rwfM1MUUl8gPoIvGOB.png',
      },
      {
        name: 'Өмд',
        icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/workBranches/d838cff6eaaceddd43099b8aa08c54da-EVMPvVnQ3tSMMM8DN1whyDQOa951kC.png',
      },
      {
        name: 'Халаад',
        icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/workBranches/b2fcfe1517e0e5105c8c34d50080a88a-hrWQk2bzGc7JbdxHGzKCGqgMo4tnJN.png',
      },
    ],
  },

  {
    id: 'POLICE',
    name: 'Цагдаагын дүрэмт хувцас',
    icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/workBranches/a98c061aaaee9a95c3214a73aeeb15c3-FG33nX9WNTmpT8nY8RrClQOMo0tNJI.png',
    children: [
      {
        name: 'Цамц',
        icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/workBranches/5935df0dbe5adc7c800ff97b97ffa672-GlwN3OFXjZg4rwfM1MUUl8gPoIvGOB.png',
      },
      {
        name: 'Өмд',
        icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/workBranches/d838cff6eaaceddd43099b8aa08c54da-EVMPvVnQ3tSMMM8DN1whyDQOa951kC.png',
      },
      {
        name: 'Халаад',
        icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/workBranches/b2fcfe1517e0e5105c8c34d50080a88a-hrWQk2bzGc7JbdxHGzKCGqgMo4tnJN.png',
      },
    ],
  },
  {
    id: 'FACTORY',
    name: 'Талхчин, Бариста',
    icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/workBranches/c25f3f0f30fbaa63e9f418fa17dd265e-l86lUOyVppGlNjsG8jHgjO0TI3gWmL.png',
    children: [
      {
        name: 'Цамц',
        icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/workBranches/5935df0dbe5adc7c800ff97b97ffa672-GlwN3OFXjZg4rwfM1MUUl8gPoIvGOB.png',
      },
      {
        name: 'Өмд',
        icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/workBranches/d838cff6eaaceddd43099b8aa08c54da-EVMPvVnQ3tSMMM8DN1whyDQOa951kC.png',
      },
      {
        name: 'Халаад',
        icon: 'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/workBranches/b2fcfe1517e0e5105c8c34d50080a88a-hrWQk2bzGc7JbdxHGzKCGqgMo4tnJN.png',
      },
    ],
  },
];

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create regular user
  const userPassword = await hash('user123', 12);
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: userPassword,
      role: 'USER',
    },
  });

  // Create categories
  for (const category of CATEGORIES) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
        icon: category.icon,
      },
    });
  }

  // Create work branches with hierarchy
  for (const branch of WORK_BRANCHES) {
    const parentBranch = await prisma.workBranch.upsert({
      where: { id: branch.id },
      update: {
        name: branch.name,
        icon: branch.icon,
      },
      create: {
        id: branch.id,
        name: branch.name,
        icon: branch.icon || '',
      },
    });

    // Create children
    if (branch.children) {
      for (const child of branch.children) {
        await prisma.workBranch.create({
          data: {
            name: child.name,
            icon: child.icon,
            parentId: parentBranch.id,
          },
        });
      }
    }
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
