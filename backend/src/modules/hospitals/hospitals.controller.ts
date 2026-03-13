import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { AppointmentsService } from '../appointments/appointments.service';

@Controller('hospitals')
export class HospitalsController {
  constructor(
    private hospitalsService: HospitalsService,
    private appointmentsService: AppointmentsService,
  ) {}

  @Get()
  async findAll(@Query('city') city?: string) {
    if (city) {
      return this.hospitalsService.findByCity(city);
    }
    return this.hospitalsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.hospitalsService.findById(parseInt(id));
  }

  @Post(':hospitalId/offline-appointments')
  async createOfflineAppointment(
    @Param('hospitalId') hospitalId: string,
    @Body() appointmentData: any,
  ) {
    return this.appointmentsService.createOfflineAppointment({
      ...appointmentData,
      hospitalId: parseInt(hospitalId),
    });
  }
}
