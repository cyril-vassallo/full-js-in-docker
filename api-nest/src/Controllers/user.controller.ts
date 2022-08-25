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
  login(@Body() accountDto: AccountDto): UserAndMeta {
    return {
      data: this.usersService.findOneByAccount(accountDto),
      meta: {
        urn: '/user/login',
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user/login',
      },
    };
  }


  @Get('/:id')
  getUser(@Param('id') id: number): UserAndMeta {
    return {
      data: this.usersService.findOneById(id),
      meta: {
        urn: 'user/' + id,
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user/' + id,
      },
    };
  }



  @Put('')
  updateUser(@Body() userDto: UserDto): UserAndMeta {
    return {
      data: this.usersService.updateOne(userDto),
      meta: {
        urn: '/user',
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user',
      },
    };
  }
}

