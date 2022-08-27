import { Controller, Get } from '@nestjs/common';
import { HomeService } from '../Services/home.service';
import { FeaturesAndMeta } from '../Types/types';
import { ConfigService } from '@nestjs/config';

@Controller()
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    private configService: ConfigService,
  ) {}

  @Get()
  getFeatures(): FeaturesAndMeta {
    return {
      data: this.homeService.getFeatures(),
      meta: {
        method: 'GET',
        urn: 'home',
        uri: this.configService.get<string>('API_ENDPOINT'),
      },
    };
  }
}
