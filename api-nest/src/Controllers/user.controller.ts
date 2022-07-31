import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersAndMeta } from '../Types/types';
import { UserAndMeta } from '../Types/types';
import { AccountDto } from '../dto/account.dto';
import { UserService } from '../Services/user.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private configService: ConfigService,
  ) {}

  @Get('/all')
  getUsers(): UsersAndMeta {
    return {
      data: this.usersService.getAllUsers(),
      meta: {
        urn: 'user',
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user/all',
      },
    };
  }

  @Get('/:id')
  getUser(@Param('id') id: number): UserAndMeta {
    return {
      data: this.usersService.getUserById(id),
      meta: {
        urn: 'user/' + id,
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user/' + id,
      },
    };
  }

  @Post('/login')
  login(@Body() accountDto: AccountDto): UserAndMeta {
    return {
      data: this.usersService.getUserByAccount(accountDto),
      meta: {
        urn: 'user/login',
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user/login',
      },
    };
  }
}
