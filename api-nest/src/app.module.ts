import { Module } from '@nestjs/common';
import { HomeController } from './Controllers/home.controller';
import { UserController } from './Controllers/user.controller';
import { HomeService } from './Services/home.service';
import { UserService } from './Services/user.service';
import { ConfigModule } from '@nestjs/config';
import { TaskController } from './Controllers/task.controller';
import { TaskService } from './Services/task.service';
import { FormateService } from './Services/formate.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [HomeController, UserController, TaskController],
  providers: [HomeService, UserService, TaskService, FormateService],
})
export class AppModule {}
