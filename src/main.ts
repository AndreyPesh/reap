import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ENV } from './shared/config/constants.env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const PORT = config.get<number>(ENV.PORT);

  await app.listen(PORT);
}
bootstrap();
