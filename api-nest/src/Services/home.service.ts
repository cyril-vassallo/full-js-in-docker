import { Injectable } from '@nestjs/common';
import { FeaturesInterface } from '../Interfaces/interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HomeService {

  constructor(
    private configService: ConfigService,
  ) {}


  getFeatures(): FeaturesInterface {
    return { 
      user  : [
        {
          title: 'User login',
          url: this.configService.get<string>('API_ENDPOINT')+'/user/login',
          method: 'POST',
          description:
            'Get a specific user with email and password in a POST JSON Body request',
        },
        {
          title: 'Get one user',
          url: this.configService.get<string>('API_ENDPOINT')+'/user/{:id}',
          method: 'GET',
          description:
            'Get an user with a specific id provided in url parm except login information',
        },
        {
          title: 'Get all users',
          url: this.configService.get<string>('API_ENDPOINT')+'/user/all',
          method: 'GET',
          description:
            'Get all users information except login info',
        },
        {
          title: 'Update user',
          url: this.configService.get<string>('API_ENDPOINT')+'/user',
          method: 'PATCH',
          description:
            'Update a given user need body JSON',
        },
      ],
      task: [
        {
          title: 'Create a task',
          url: this.configService.get<string>('API_ENDPOINT')+'/task',
          method: 'POST',
          description:
            'Create a given task need body JSON',
        },
        {
          title: 'Get all tasks for one user',
          url: this.configService.get<string>('API_ENDPOINT')+'/task/user/{:id}',
          method: 'GET',
          description:
            'Get all task for one specific user id tasks',
        },
        {
          title: 'Get all db tasks',
          url: this.configService.get<string>('API_ENDPOINT')+'/task/all',
          method: 'GET',
          description:
            'Get a all tasks of all users',
        },
        {
          title: 'Get last task id',
          url: this.configService.get<string>('API_ENDPOINT')+'/task/last',
          method: 'GET',
          description:
            'Get last created task id',
        },
        {
          title: 'Update task',
          url: this.configService.get<string>('API_ENDPOINT')+'/task',
          method: 'PATCH',
          description:
            'Update a given task need body JSON',
        },
        {
          title: 'Delete a task',
          url: this.configService.get<string>('API_ENDPOINT')+'/task/{:id}',
          method: 'DELETE',
          description:
            'Delete a given task by id',
        },
      ], 
      github: [
        {
          title: 'Create a github',
          url: this.configService.get<string>('API_ENDPOINT')+'/github',
          method: 'POST',
          description:
            'Create a new github, need a JSON body',
        },
        {
          title: 'Get github by user id',
          url: this.configService.get<string>('API_ENDPOINT')+'/github/user/{:id}',
          method: 'GET',
          description:
            'Find a github by user id',
        },
        {
          title: 'Update a github',
          url: this.configService.get<string>('API_ENDPOINT')+'/github',
          method: 'PATCH',
          description:
            'Update a given github, need a JSON body',
        },
    ]};
  }
}
