import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TasksAndMeta } from '../Types/types';
import { TaskService } from '../Services/task.service';
import { TaskDto } from '../dto/task.dto';

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
        urn: '/task/user/' + id,
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/task/user/' + id,
      },
    };
  }

  @Get('/all')
  getAllTasks(): TasksAndMeta {
    return {
      data: this.taskService.getAllTasks(),
      meta: {
        urn: '/task/all',
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/task/all',
      },
    };
  }

  @Post('')
  postTask(@Body() taskDto: TaskDto): TasksAndMeta  {
    return {
      data: this.taskService.updateTasksFromDb(taskDto),
      meta: {
        urn: '/task',
        uri: this.configService.get<string>('API_ENDPOINT') + '/task',
      },
    };
  }


}
