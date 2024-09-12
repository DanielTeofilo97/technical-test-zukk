import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {

    // Create adm
    const password = await bcrypt.hash('12345678', await bcrypt.genSalt());
    await prisma.user.create({
      data: {
        name: 'Galvão Alves',
        cpf: '51103282000',
        password: password,
        role: 0,
      },
    });


    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
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
