import { Module } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { HospitalsController } from './hospitals.controller';
import { PrismaService } from '@common/prisma.service';

@Module({
  providers: [HospitalsService, PrismaService],
  controllers: [HospitalsController],
  exports: [HospitalsService],
})
export class HospitalsModule {}
