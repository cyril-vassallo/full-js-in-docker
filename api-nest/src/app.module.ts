import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HomeController } from './Controllers/home.controller';
import { UserController } from './Controllers/user.controller';
import { TaskController } from './Controllers/task.controller';
import { HomeService } from './Services/home.service';
import { UserService } from './Services/user.service';
import { TaskService } from './Services/task.service';
import { FormatService } from './Services/format.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [HomeController, UserController, TaskController],
  providers: [HomeService, UserService, TaskService, FormatService],
})
export class AppModule {}
