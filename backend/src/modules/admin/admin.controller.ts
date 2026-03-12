import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('hospitals')
  async createHospital(@Body() data: any) {
    return this.adminService.createHospital(data);
  }

  @Get('hospitals')
  async getAllHospitals() {
    return this.adminService.getAllHospitals();
  }

  @Put('hospitals/:id')
  async updateHospital(@Param('id') id: string, @Body() data: any) {
    return this.adminService.updateHospital(parseInt(id), data);
  }

  @Delete('hospitals/:id')
  async deleteHospital(@Param('id') id: string) {
    return this.adminService.deleteHospital(parseInt(id));
  }
}
