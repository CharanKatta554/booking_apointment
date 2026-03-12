import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.appointment.create({
      data,
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
