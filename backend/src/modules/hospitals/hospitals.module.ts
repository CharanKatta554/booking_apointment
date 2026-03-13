import { Module } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { HospitalsController } from './hospitals.controller';
import { PrismaService } from '@common/prisma.service';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  providers: [HospitalsService, PrismaService],
  controllers: [HospitalsController],
  imports: [AppointmentsModule],
  exports: [HospitalsService],
})
export class HospitalsModule {}
