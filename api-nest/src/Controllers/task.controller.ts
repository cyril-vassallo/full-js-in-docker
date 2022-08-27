import { Controller, Get, Param, Body, Post, Delete, Patch } from '@nestjs/common';
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

  @Post('')
  async postTask(@Body() taskDto: TaskDto): Promise<TaskAndMeta> {
    return {
      data: await this.taskService.createOne(taskDto),
      meta: {
        method: 'POST',
        urn: '/task',
        uri: this.configService.get<string>('API_ENDPOINT') + '/task',
      },
    };
  }

  @Get('/user/:id')
  async getTasks(@Param('id') userId: string): Promise<TasksAndMeta> {
    return {
      data: await this.taskService.findByUserId(userId),
      meta: {
        method: 'GET',
        urn: '/task/user/' + userId,
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/task/user/' + userId,
      },
    };
  }

  @Get('/all')
  async getAllTasks(): Promise<TasksAndMeta> {
    return {
      data: await this.taskService.findAll(),
      meta: {
        method: 'GET',
        urn: '/task/all',
        uri: this.configService.get<string>('API_ENDPOINT') + '/task/all',
      },
    };
  }


  @Get('/last')
  async getLastTaskId(): Promise<IdAndMeta> {
    return {
      data: await this.taskService.findLastCreatedId(),
      meta: {
        method: 'GET',
        urn: '/task/last',
        uri: this.configService.get<string>('API_ENDPOINT') + '/task/last',
      },
    };
  }

  @Patch('')
  async updateTask(@Body() taskDto: TaskDto): Promise<TaskAndMeta> {
    return {
      data: await this.taskService.updateOne(taskDto),
      meta: {
        method: 'PATCH',
        urn: '/task',
        uri: this.configService.get<string>('API_ENDPOINT') + '/task',
      },
    };
  }

  @Delete(':id')
  async deleteTask(@Param() TaskId: string): Promise<TaskAndMeta> {
    return {
      data: await this.taskService.deleteOne(TaskId),
      meta: {
        method: 'DELETE',
        urn: '/task/{:id}',
        uri: this.configService.get<string>('API_ENDPOINT') + '/task/{:id}',
      },
    };
  }




}
