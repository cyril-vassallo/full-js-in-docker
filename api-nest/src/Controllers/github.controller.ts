import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from '../Services/github.service';
import { GithubAndMeta } from '../Types/types';
import { ConfigService } from '@nestjs/config';



@Controller('/github')
export class GithubController {
  constructor(
    private githubService: GithubService,
    private configService: ConfigService,
  ) {}

  @Get(':id')
  getGithub(@Param('id') id: number): GithubAndMeta {
    return {
      data: this.githubService.getGithubByUserId(id),
      meta: {
        urn: '/github/{:id}',
        uri: this.configService.get<string>('API_ENDPOINT') + '/github/{:id}',
      },
    };
  }
}
