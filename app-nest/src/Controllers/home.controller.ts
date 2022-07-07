import { Controller, Get } from '@nestjs/common';
import { HomeService } from '../Services/home.service';
import { FeaturesAndMeta } from '../Types/types'
import { ConfigService } from '@nestjs/config';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService, private configService: ConfigService ) {}

  @Get()
  getFeatures(): FeaturesAndMeta {
    return { data: this.homeService.getFeatures(), meta: { sourceName: "home", frontEndUrl: this.configService.get<string>('NEXTJS') } };
  }
}
