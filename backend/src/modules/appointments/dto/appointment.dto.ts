import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  phone?: string;

  @IsString()
  address?: string;

  userId?: number;

  hospitalId?: number;
}
