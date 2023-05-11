import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.find()
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
