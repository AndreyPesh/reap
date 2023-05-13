import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ENV } from './shared/config/constants.env';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config: ConfigService = app.get(ConfigService);
  const PORT = config.get<number>(ENV.PORT);

  await app.listen(PORT);
}
bootstrap();
