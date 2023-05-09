import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './shared/config/validation.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import typeorm, { TYPE_ORM_CONFIG_KEY } from './shared/typeorm/typeorm.service';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema, isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get(TYPE_ORM_CONFIG_KEY),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
