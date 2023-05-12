import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async retrieveUser(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    if (!user) return null;
    const { password, ...result } = user;
    return result;
  }

  login(user: UserDto) {
    const payload = {username: user.username, sub: user.userId}
    return payload;
  }
}
