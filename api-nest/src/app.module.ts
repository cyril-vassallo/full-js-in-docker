import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeController } from './Controllers/home.controller';
import { UserController } from './Controllers/user.controller';
import { TaskController } from './Controllers/task.controller';
import { HomeService } from './Services/home.service';
import { UserService } from './Services/user.service';
import { TaskService } from './Services/task.service';
import { FormatService } from './Services/format.service';
import { GithubService } from './Services/github.service';
import { GithubController } from './Controllers/github.controller';
import { NavigationService } from './Services/navigation.service';
import { NavigationController } from './Controllers/navigation.controller';
import { User, UserSchema } from './Schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      
    }),
    MongooseModule.forRoot('mongodb://mongo-db:27017/taskiteam'),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]) 
  ],
  controllers: [HomeController, UserController, TaskController, GithubController, NavigationController],
  providers: [HomeService, UserService, TaskService, FormatService, GithubService, NavigationService],
})
export class AppModule {}
