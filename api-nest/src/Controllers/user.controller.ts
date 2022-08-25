import { Controller, Get, Param, Body, Post, Put } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersAndMeta } from '../Types/types';
import { UserAndMeta } from '../Types/types';
import { AccountDto } from '../dto/account.dto';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../Services/user.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private configService: ConfigService,
  ) {}

  @Get('/all')
  async getUsers(): Promise<UsersAndMeta> {
    return {
      data: await this.usersService.findAll(),
      meta: {
        urn: '/user',
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user/all',
      },
    };
  }


  @Post('/login')
  async login(@Body() accountDto: AccountDto): Promise<UserAndMeta> {
    return {
      data: await this.usersService.findOneByAccount(accountDto),
      meta: {
        urn: '/user/login',
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user/login',
      },
    };
  }


  @Get('/:id')
  async getUser(@Param('id') userId: string): Promise<UserAndMeta> {
    return {
      data: await this.usersService.findOneById(userId),
      meta: {
        urn: 'user/' + userId,
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user/' + userId,
      },
    };
  }



  @Put('')
  async updateUser(@Body() userDto: UserDto): Promise<UserAndMeta> {
    return {
      data: await this.usersService.updateOne(userDto),
      meta: {
        urn: '/user',
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user',
      },
    };
  }
}

