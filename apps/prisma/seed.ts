import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { CardStatus, PrismaClient } from '../generated/prisma';

const connectionString = process.env['DATABASE_URL'];

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const customer = await prisma.customer.upsert({
    where: { email: 'alex@example.com' },
    update: {},
    create: {
      id: '11111111-1111-4111-8111-111111111111',
      name: 'Alex Doe',
      email: 'alex@example.com',
    },
  });

  await prisma.card.upsert({
    where: { id: '22222222-2222-4222-8222-222222222222' },
    update: {},
    create: {
      id: '22222222-2222-4222-8222-222222222222',
      customerId: customer.id,
      creditLimit: '5000',
      availableLimit: '5000',
      status: CardStatus.ACTIVE,
    },
  });

  console.log('Seed data created');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
