import { Controller, Post, Body, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  phone: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  private users: User[] = [];

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const { email, password, name, phone } = body;

    const existingUser = this.users.find((user) => user.email === email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const newUser: User = {
      id: this.users.length + 1,
      email: email!,
      password: password!,
      name: name!,
      phone: phone!,
    };

    this.users.push(newUser);

    const token = await this.authService.generateToken({
      userId: newUser.id,
      email: newUser.email,
    });

    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
      },
      ...token,
    };

  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    console.log('Login request received:', { email });

    const user = await this.authService.login(body);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.authService.generateToken({
      userId: user.id,
      email: user.email,
    });

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
      ...token,
    };
  }
}
