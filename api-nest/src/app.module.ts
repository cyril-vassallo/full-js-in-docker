import { Module } from '@nestjs/common';
import { HomeController } from './Controllers/home.controller';
import { UserController } from './Controllers/user.controller';
import { HomeService } from './Services/home.service';
import { UserService } from './Services/user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [HomeController, UserController],
  providers: [HomeService, UserService],
})
export class AppModule {}
