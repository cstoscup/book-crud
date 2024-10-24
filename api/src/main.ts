import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sdk } from './tracing';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  sdk.start();

  await app.listen(3000);
}
bootstrap();
