import { Controller, UseGuards, Request, Post, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as Req } from 'express';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { User } from './user/entity/user.entity';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: Req) {
    const { name, id } = req.user as User;
    return this.authService.login({ username: name, id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/login')
  getProfile(@Request() req: Req) {
    return req.user;
  }
}
