import { Controller, Get, Param, Query } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';

@Controller('hospitals')
export class HospitalsController {
  constructor(private hospitalsService: HospitalsService) {}

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
}
