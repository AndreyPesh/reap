import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePersonDto {
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  refreshToken: string;
}

export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
