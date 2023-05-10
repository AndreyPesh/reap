import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/person.dto';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Post()
  createPerson(@Body() createPersonData: CreatePersonDto) {
    return this.personService.createPerson(createPersonData);
  }

  @Get(':id')
  findById(@Param(':id') id: string) {
    return this.personService.getPersonById(id);
  }

  @Get(':name')
  findByName(@Param(':name') name: string) {
    return this.personService.getPersonById(name);
  }

  @Get()
  findAll() {
    return this.personService.getAll();
  }
}
