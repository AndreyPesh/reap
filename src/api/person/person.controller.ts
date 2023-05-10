import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { PersonService } from './person.service';
import { CreatePersonDto, UpdatePersonDto } from './dto/person.dto';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

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

  @UseGuards(AccessTokenGuard)
  @Patch()
  update(@Body() updatePersonDto: UpdatePersonDto, @Req() req: Request) {
    const userId = req.user['sub'];
    return this.personService.update(userId, updatePersonDto);
  }
}
