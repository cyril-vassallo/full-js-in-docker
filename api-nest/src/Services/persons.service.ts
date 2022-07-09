import { Injectable } from '@nestjs/common';
import { PersonInterface } from '../Interfaces/person.interface';

@Injectable()
export class PersonsService {
  getPersons(): PersonInterface[] {
    return [
      {
        name: 'Cyril Vassallo',
        job: 'Web Developer',
        intro:
          "I've tried Tailwindcss and it is fun and very powerful, discover here my pre-configured Next-js and Tailwindcss boiler plate in docker container",
        photo: '/images/cyril-vassallo.JPG',
      },
      {
        name: 'Sarah Dayan',
        job: 'Web Developer',
        intro:
          "Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts to any design, and the build size is tiny.",
        photo: '/images/sarah-dayan.jpg',
      },
      {
        name: 'Grafikart',
        job: 'Web Developer',
        intro:
          'See my Tailwindcss tutorial on  you tube : https://www.youtube.com/watch?v=D6-g6JgiUIs',
        photo: '/images/grafikart.jpg',
      },
      {
        name: 'John Doe',
        job: 'undefined',
        intro:
          'I have been notice in million of code line just because nobody know who i am',
        photo: '/images/john-doe.png',
      },
    ];
  }
}
