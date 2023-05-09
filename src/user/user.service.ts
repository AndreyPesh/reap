import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(body: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = body.name;
    user.email = body.email;
    user.password = body.password;
    return this.userRepository.save(user);
  }
}
