import { IsString, IsEmail, IsPhoneNumber, IsNumber, IsOptional } from 'class-validator';

export class CreateHospitalDto {
  @IsString()
  name?: string;

  @IsString()
  address?: string;

  @IsString()
  city?: string;

  @IsString()
  pincode?: string;

  @IsNumber()
  opFee?: number;

  @IsString()
  phone?: string;

  @IsEmail()
  email?: string;
}

export class UpdateHospitalDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  pincode?: string;

  @IsOptional()
  @IsNumber()
  opFee?: number;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
