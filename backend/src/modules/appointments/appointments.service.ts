import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const { firstName, lastName, age, gender, phone, address, userId, hospitalId } = data;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastToken = await this.prisma.appointment.findFirst({
      where: {
        hospitalId,
        appointmentDate: today,
      },
      orderBy: {
        token: 'desc',
      },
    });

    const nextToken = lastToken ? lastToken.token + 1 : 1;

    return this.prisma.appointment.create({
      data: {
        token: nextToken,
        appointmentDate: today,
        firstName,
        lastName,
        age,
        gender,
        phone,
        address,
        userId,
        hospitalId,
      },
      include: { hospital: true, user: true },
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.appointment.findMany({
      where: { userId },
      include: { hospital: true },
    });
  }

  async findByHospitalId(hospitalId: number) {
    return this.prisma.appointment.findMany({
      where: { hospitalId },
      include: { user: true },
    });
  }

  async findById(id: number) {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: { hospital: true, user: true },
    });
  }
}
