// This is a basic seed file for Prisma
// Learn more about seeding after next steps are documented here:
// https://pris.ly/d/seed/ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hospitalbooking.com' },
    update: {},
    create: {
      email: 'admin@hospitalbooking.com',
      password: adminPassword,
      name: 'Admin User',
      phone: '9999999999',
      role: 'ADMIN',
    },
  });
  console.log(`Created admin user with id: ${admin.id}`);

  // Create sample hospitals
  const hospital1Password = await bcrypt.hash('hospital@123', 10);
  const hospital1User = await prisma.user.create({
    data: {
      email: 'apollo@hospital.com',
      password: hospital1Password,
      name: 'Apollo Hospital',
      phone: '9000000001',
      role: 'HOSPITAL',
    },
  });

  const hospital1 = await prisma.hospital.create({
    data: {
      userId: hospital1User.id,
      name: 'Apollo Hospital',
      address: '123 Medical Street, Mumbai',
      city: 'Mumbai',
      pincode: '400001',
      opFee: 500,
      phone: '9000000001',
      email: 'apollo@hospital.com',
    },
  });
  console.log(`Created hospital: ${hospital1.name}`);

  const hospital2Password2 = await bcrypt.hash('hospital@123', 10);
  const hospital2User2 = await prisma.user.create({
    data: {
      email: 'nims@hospital.com',
      password: hospital2Password2,
      name: 'Nims Hospital',
      phone: '9000000002',
      role: 'HOSPITAL',
    },
  });

  const hospital2 = await prisma.hospital.create({
    data: {
      userId: hospital2User2.id,
      name: 'Nims Hospital',
      address: '123 Medical Street, Delhi',
      city: 'Delhi',
      pincode: '400001',
      opFee: 500,
      phone: '9000000002',
      email: 'nims@hospital.com',
    },
  });
  console.log(`Created hospital: ${hospital2.name}`);

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: await bcrypt.hash('user@123', 10),
      name: 'John Doe',
      phone: '9111111111',
      role: 'USER',
    },
  });
  console.log(`Created user: ${user1.name}`);

  // Create sample appointments
  const appointment = await prisma.appointment.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '9111111111',
      address: '456 Patient Lane, Mumbai',
      userId: user1.id,
      hospitalId: hospital1.id,
      status: 'BOOKED',
    },
  });
  console.log(`Created appointment with id: ${appointment.id}`);

  console.log('Seeding finished.');
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
