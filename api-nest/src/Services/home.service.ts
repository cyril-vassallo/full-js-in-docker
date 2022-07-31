import { Injectable } from '@nestjs/common';
import { FeatureInterface } from '../Interfaces/interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HomeService {

  constructor(
    private configService: ConfigService,
  ) {}


  getFeatures(): FeatureInterface[] {
    return [
      {
        title: 'Get one user',
        url: 'GET: ' + this.configService.get<string>('API_ENDPOINT')+'/user/{:id}',
        description:
          'Get an user with a specific id provided in url parm except login information',
      },
      {
        title: 'Get all users',
        url: 'GET: ' + this.configService.get<string>('API_ENDPOINT')+'/user',
        description:
          'Get all users information except login info',
      },
      {
        title: 'User login',
        url: 'POST: ' + this.configService.get<string>('API_ENDPOINT')+'/user/login',
        description:
          'Get a specific user with email and password in a POST JSON Body request',
      },
      {
        title: 'Get an user tasks ',
        url: 'GET: '+this.configService.get<string>('API_ENDPOINT')+'/task/user/{:id}',
        description:
          'Get a specific user id tasks',
      },
    ];
  }
}
