import { PartialType } from '@nestjs/mapped-types';

export class CreatePersonDto {
  name: string;
  email: string;
  password: string;
  refreshToken: string;
}

export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
