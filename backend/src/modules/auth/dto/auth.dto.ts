import { IsEmail, IsString, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6)
  password?: string;

  @IsString()
  name?: string;

  @IsString()
  phone?: string;
}

export class LoginDto {
  @IsEmail()
  email?: string;

  @IsString()
  password?: string;
}
