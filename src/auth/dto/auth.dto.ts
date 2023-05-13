import { IsNotEmpty, Max, Min } from 'class-validator';
import { LENGTH_PASSWORD } from 'src/api/person/constants/constants';

export class AuthDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @Min(LENGTH_PASSWORD.MIN)
  @Max(LENGTH_PASSWORD.MAX)
  password: string;
}
