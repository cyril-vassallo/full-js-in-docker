import { Controller, Get, Param, Body, Post, Delete } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TasksAndMeta, TaskAndMeta, IdAndMeta } from '../Types/types';
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
        uri: this.configService.get<string>('API_ENDPOINT') + '/task/all',
      },
    };
  }

  @Get('/last')
  getLastTaskId(): IdAndMeta {
    return {
      data: this.taskService.getLastTaskId(),
      meta: {
        urn: '/task/last',
        uri: this.configService.get<string>('API_ENDPOINT') + '/task/last',
      },
    };
  }

  @Post('')
  postTask(@Body() taskDto: TaskDto): TaskAndMeta {
    return {
      data: this.taskService.updateTasksFromDb(taskDto),
      meta: {
        urn: '/task',
        uri: this.configService.get<string>('API_ENDPOINT') + '/task',
      },
    };
  }




  @Delete(':id')
  deleteTask(@Param() id: number): TaskAndMeta {
    return {
      data: this.taskService.deleteTasksFromDb(id),
      meta: {
        urn: '/task/{:id}',
        uri: this.configService.get<string>('API_ENDPOINT') + '/task/{:id}',
      },
    };
  }
}
