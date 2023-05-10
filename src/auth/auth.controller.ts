import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreatePersonDto } from 'src/api/person/dto/person.dto';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createPersonDto: CreatePersonDto) {
    return this.authService.signUp(createPersonDto);
  }

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.singIn(data);
  }
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }
}
