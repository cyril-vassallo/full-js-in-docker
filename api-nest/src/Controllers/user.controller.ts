import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { UserService } from '../Services/user.service';
import { UsersAndMeta } from '../Types/types';
import { UserAndMeta } from '../Types/types';
import { ConfigService } from '@nestjs/config';
import { AccountDto } from '../dto/account.dto';

@Controller('/user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private configService: ConfigService,
  ) {}

  @Get('/')
  getUsers(): UsersAndMeta {
    return {
      data: this.usersService.getAllUsers(),
      meta: {
        urn: 'user',
        uri:
          this.configService.get<string>('API_ENDPOINT') + '/user',
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
