import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {

    // Create adm
    const password = await bcrypt.hash('12345678', await bcrypt.genSalt());
    const user = await prisma.user.create({
      data: {
        name: 'Galvão Alves',
        cpf: '51103282000',
        password: password,
        role: 0,
      },
    });

    //Crete Cultures

    const cultures = [
      {
        nome:'Soja',
        idUserCreate: user.id,
      },
      {
        nome:'Milho',
        idUserCreate: user.id,
      },
      {
        nome:'Algodão',
        idUserCreate: user.id,
      },
      {
        nome:'Café',
        idUserCreate: user.id,
      },
      {
        nome:'Cana de Açucar',
        idUserCreate: user.id,
      },

    ]

    await prisma.culture.createMany({
      data: cultures,
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
