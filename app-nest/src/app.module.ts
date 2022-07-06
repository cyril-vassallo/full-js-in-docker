import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PersonsController } from './Controllers/persons.controller';
import { AppService } from './app.service'
import { PersonsService } from './Services/persons.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal : true
  })],
  controllers: [AppController, PersonsController],
  providers: [AppService, PersonsService],
})
export class AppModule {}
