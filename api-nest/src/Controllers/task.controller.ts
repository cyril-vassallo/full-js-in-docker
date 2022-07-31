import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TasksAndMeta } from '../Types/types';
import { TaskService } from '../Services/task.service';

@Controller('/task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private configService: ConfigService,
  ) {}


  @Get('/user/:id')
  getTasks(@Param('id') id: number): TasksAndMeta {
    return {
      data: this.taskService.getTasksByUserId(id),
      meta: {
        urn: 'task/user/' + id,
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/task/user/' + id,
      },
    };
  }


}
