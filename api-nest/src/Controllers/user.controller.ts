import { Controller, Get, Param, Body, Post, Patch } from '@nestjs/common';
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

  @Post('/login')
  async login(@Body() accountDto: AccountDto): Promise<UserAndMeta> {
    return {
      data: await this.usersService.findOneByAccount(accountDto),
      meta: {
        method: 'POST',
        urn: '/user/login',
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user/login',
      },
    };
  }

  @Get('/all')
  async getUsers(): Promise<UsersAndMeta> {
    return {
      data: await this.usersService.findAll(),
      meta: {
        method: 'GET',
        urn: '/user',
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user/all',
      },
    };
  }

  @Get('/:id')
  async getUser(@Param('id') userId: string): Promise<UserAndMeta> {
    return {
      data: await this.usersService.findOneById(userId),
      meta: {
        method: 'GET',
        urn: 'user/' + userId,
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user/' + userId,
      },
    };
  }

  @Patch('')
  async updateUser(@Body() userDto: UserDto): Promise<UserAndMeta> {
    return {
      data: await this.usersService.updateOne(userDto),
      meta: {
        method: 'PATCH',
        urn: '/user',
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user',
      },
    };
  }
}
