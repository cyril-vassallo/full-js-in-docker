import { Controller, Get } from '@nestjs/common';
import { PersonsService } from '../Services/persons.service';
import { PersonsAndMeta } from '../Types/types';
import { ConfigService } from '@nestjs/config';


@Controller('/persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService, private configService: ConfigService ) {}

  @Get('/')
  getPersons(): PersonsAndMeta {
    return { data: this.personsService.getPersons(), meta: { sourceName: "Persons", frontEndUrl: this.configService.get<string>('NEXTJS') + '/persons' } } ;
  }
}
