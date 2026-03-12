import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Body() data: any) {
    return this.appointmentsService.create(data);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return this.appointmentsService.findByUserId(parseInt(userId));
  }

  @Get('hospital/:hospitalId')
  async findByHospitalId(@Param('hospitalId') hospitalId: string) {
    return this.appointmentsService.findByHospitalId(parseInt(hospitalId));
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.appointmentsService.findById(parseInt(id));
  }
}
