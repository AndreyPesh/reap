import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as Req } from 'express';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: Req) {
    return req.user;
  }
}
