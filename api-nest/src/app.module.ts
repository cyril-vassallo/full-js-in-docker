import { Module } from '@nestjs/common';
import { HomeController } from './Controllers/home.controller';
import { PersonsController } from './Controllers/persons.controller';
import { HomeService } from './Services/home.service'
import { PersonsService } from './Services/persons.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal : true
  })],
  controllers: [HomeController, PersonsController],
  providers: [HomeService, PersonsService],
})
export class AppModule {}
