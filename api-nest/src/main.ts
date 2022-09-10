import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { constants } from './Config/conf';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (constants.ENV === 'dev') app.enableCors();
  await app.listen(8080);
}
bootstrap();
