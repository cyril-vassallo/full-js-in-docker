import { Controller, Get } from '@nestjs/common';
import { PersonsService } from '../Services/persons.service';
import { PersonInterface } from '../Interfaces/person.interface';
import { ConfigService } from '@nestjs/config';


type PersonsAndMeta = {
  persons: PersonInterface[]
  toNextJs : string
}

@Controller('/persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService, private configService: ConfigService ) {}

  @Get('/')
  getPersons(): PersonsAndMeta {
    return { persons: this.personsService.getPersons(), toNextJs: this.configService.get<string>('NEXTJS')+ '/persons' };
  }
}
