import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { CreatePersonDto } from './dto/person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAll() {
    return await this.userRepository.find();
  }

  async createPerson(createPersonDto: CreatePersonDto) {
    return await this.userRepository.save(createPersonDto);
  }

  async getPersonById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async getPersonByName(username: string) {
    return await this.userRepository.findOneBy({ name: username });
  }
}
