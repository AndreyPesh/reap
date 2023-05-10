import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreatePersonDto } from 'src/api/person/dto/person.dto';
import { PersonService } from 'src/api/person/person.service';
import { ENV } from 'src/shared/config/constants.env';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private personService: PersonService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async signUp(createPersonDto: CreatePersonDto) {
    const userExists = await this.personService.getPersonByName(
      createPersonDto.name,
    );
    if (userExists) {
      throw new BadRequestException('User already exist');
    }

    const hash = await this.hashData(createPersonDto.password);
    const newPerson = await this.personService.createPerson({
      ...createPersonDto,
      password: hash,
    });

    const tokens = await this.getTokens(newPerson.id, newPerson.name);
    await this.updateRefreshToken(newPerson.id, tokens.refreshToken);
    return tokens;
  }

  async singIn(data: AuthDto) {
    const person = await this.personService.getPersonByName(data.username);
    if (!person) {
      throw new BadRequestException('User does not exist');
    }
    const passwordMatches = await bcrypt.compare(
      data.password,
      person.password,
    );
    if (!passwordMatches) {
      throw new BadRequestException('Password incorrect');
    }
    const tokens = await this.getTokens(person.id, person.name);
    await this.updateRefreshToken(person.id, tokens.refreshToken);
    return tokens;
  }

  async logout(personId: string) {
    return this.personService.update(personId, { refreshToken: '' });
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, 5);
  }

  async updateRefreshToken(personId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.personService.update(personId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(personId: string, name: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: personId,
          username: name,
        },
        {
          secret: this.configService.get<string>(ENV.JWT_ACCESS_SECRET),
          expiresIn: this.configService.get<string>(ENV.JWT_ACCESS_EXPIRES),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: personId,
          username: name,
        },
        {
          secret: this.configService.get<string>(ENV.JWT_REFRESH_SECRET),
          expiresIn: this.configService.get<string>(ENV.JWT_REFRESH_EXPIRES),
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
