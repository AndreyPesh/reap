import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV } from '../config/constants.env';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.config.get<string>(ENV.POSTGRES_HOST),
      port: this.config.get<number>(ENV.POSTGRES_PORT),
      database: this.config.get<string>(ENV.POSTGRES_DB),
      username: this.config.get<string>(ENV.POSTGRES_USER),
      password: this.config.get<string>(ENV.POSTGRES_PASSWORD),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: false,
    }
  }
}
