import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async createHospital(data: any) {
    return this.prisma.hospital.create({
      data,
    });
  }

  async updateHospital(id: number, data: any) {
    return this.prisma.hospital.update({
      where: { id },
      data,
    });
  }

  async deleteHospital(id: number) {
    return this.prisma.hospital.delete({
      where: { id },
    });
  }

  async getAllHospitals() {
    return this.prisma.hospital.findMany();
  }
}
