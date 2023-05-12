import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LocalAuthGuard } from '../guards/local.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  find() {
    return 'Get all users with jwt token'
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.login(req.body);
  }
}
