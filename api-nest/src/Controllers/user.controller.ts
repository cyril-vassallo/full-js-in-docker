import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../Services/user.service';
import { UsersAndMeta } from '../Types/types';
import { UserAndMeta } from '../Types/types';
import { ConfigService } from '@nestjs/config';

@Controller('/User')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private configService: ConfigService,
  ) {}

  @Get('/')
  getUsers(): UsersAndMeta {
    return {
      data: this.usersService.getUsers(),
      meta: {
        sourceName: 'user',
        frontEndUrl:
          this.configService.get<string>('API_ENDPOINT') + '/user',
      },
    };
  }

  @Get('/:id')
  getUser(@Param('id') id: number): UserAndMeta {
    return {
      data: this.usersService.getUser(id),
      meta: {
        sourceName: 'user/' + id,
        frontEndUrl:
          this.configService.get<string>('API_ENDPOINT') + '/user/' + id,
      },
    };
  }


  @Post()
  getUseAccount(@Body() body: UserDTO): UserAndMeta {
    return {
      data: this.usersService.getUserAccount(email, password),
      meta: {
        sourceName: 'user/',
        frontEndUrl:
          this.configService.get<string>('API_ENDPOINT') + '/user/,
      },
    };
  }
}
