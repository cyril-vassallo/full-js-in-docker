import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HomeController } from './Controllers/home.controller';
import { UserController } from './Controllers/user.controller';
import { TaskController } from './Controllers/task.controller';
import { HomeService } from './Services/home.service';
import { UserService } from './Services/user.service';
import { TaskService } from './Services/task.service';
import { FormatService } from './Services/format.service';
import { GithubService } from './Services/github.service';
import { GithubController } from './Controllers/github.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [HomeController, UserController, TaskController, GithubController],
  providers: [HomeService, UserService, TaskService, FormatService, GithubService],
})
export class AppModule {}
