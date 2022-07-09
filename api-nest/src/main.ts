import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const ENV: string = process.env.ENV.toLowerCase();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (ENV === 'dev') app.enableCors();
  console.log(ENV);
  await app.listen(8080);
}
bootstrap();
