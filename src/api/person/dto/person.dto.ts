import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, Max, Min } from 'class-validator';
import { LENGTH_PASSWORD } from '../constants/constants';

export class CreatePersonDto {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @Min(LENGTH_PASSWORD.MIN)
  @Max(LENGTH_PASSWORD.MAX)
  password: string;
  refreshToken: string;
}

export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
