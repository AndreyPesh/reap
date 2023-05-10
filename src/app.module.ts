import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './shared/config/validation.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm, { TYPE_ORM_CONFIG_KEY } from './shared/typeorm/typeorm.service';
import { AppController } from './app.controller';
import { PersonModule } from './api/person/person.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema, isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get(TYPE_ORM_CONFIG_KEY),
    }),
    PersonModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
