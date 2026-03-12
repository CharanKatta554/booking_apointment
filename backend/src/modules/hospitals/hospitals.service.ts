import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma.service';

@Injectable()
export class HospitalsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.hospital.findMany();
  }

  async findByCity(city: string) {
    return this.prisma.hospital.findMany({
      where: { city: { contains: city, mode: 'insensitive' } },
    });
  }

  async findById(id: number) {
    return this.prisma.hospital.findUnique({
      where: { id },
      include: { appointments: true },
    });
  }
}
