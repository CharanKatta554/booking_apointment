import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma:PrismaService
  ) {}

  async generateToken(payload: any) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async login(payload:LoginDto) {
    console.log('AuthService login called with payload:', payload);
    const isUserPresent=await this.prisma.user.findUnique({
      where:{
        email:payload.email,  
      }
    });
    console.log('User found in database:', isUserPresent);
    if (!isUserPresent) {
      throw new UnauthorizedException('Invalid email or password');
    }
    
    return isUserPresent;
  }

}