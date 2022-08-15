import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GithubService } from '../Services/github.service';
import { GithubAndMeta } from '../Types/types';
import { ConfigService } from '@nestjs/config';
import { GithubDto } from '../dto/githubDto';



@Controller('/github')
export class GithubController {
  constructor(
    private githubService: GithubService,
    private configService: ConfigService,
  ) {}

  @Get(':userId')
  getGithub(@Param('userId') userId: number): GithubAndMeta {
    return {
      data: this.githubService.getGithubByUserId(userId),
      meta: {
        urn: '/github/{:id}',
        uri: this.configService.get<string>('API_ENDPOINT') + '/github/{:id}',
      },
    };
  }

  @Post('/user')
  updateGithub( @Body() githubDto: GithubDto): GithubAndMeta {
    return {
      data: this.githubService.updateGithubRepository(githubDto),
      meta: {
        urn: '/github/user',
        uri: this.configService.get<string>('API_ENDPOINT') + '/github/user',
      },
    };
  }
}
