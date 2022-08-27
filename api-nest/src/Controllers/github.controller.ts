import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
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

  @Post()
  async createGithub( @Body() githubDto: GithubDto): Promise<GithubAndMeta> {
    return {
      data: await this.githubService.createOne(githubDto),
      meta: {
        method: 'POST',
        urn: '/github',
        uri: this.configService.get<string>('API_ENDPOINT') + '/github',
      },
    };
  }

  @Get('/user/:userId')
  async getGithub(@Param('userId') userId: string): Promise<GithubAndMeta> {
    return {
      data: await this.githubService.findOneByUserId(userId),
      meta: {
        method: 'GET',
        urn: '/github/user/{:id}',
        uri: this.configService.get<string>('API_ENDPOINT') + '/github/user/{:id}',
      },
    };
  }

  @Patch()
  async updateGithub( @Body() githubDto: GithubDto): Promise<GithubAndMeta> {
    return {
      data: await this.githubService.updateOne(githubDto),
      meta: {
        method: 'PATCH',
        urn: '/github',
        uri: this.configService.get<string>('API_ENDPOINT') + '/github',
      },
    };
  }
}
