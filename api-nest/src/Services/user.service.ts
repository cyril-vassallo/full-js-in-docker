import { Injectable } from '@nestjs/common';
import { UserInterface } from '../Interfaces/user.interface';

@Injectable()
export class UserService {

  private usersFromDB:  UserInterface[] =  [
    {
      firstName: 'Cyril',
      lastName: 'Vassallo',
      job: 'Web Developer',
      description:
        "I've tried Tailwindcss and it is fun and very powerful, discover here my pre-configured Next-js and Tailwindcss boiler plate in docker container",
      photo: '/images/cyril-vassallo.JPG',
      email: '',
      password: ''
    },
    {
      firstName: 'Sarah',
      lastName: 'Dayan',
      job: 'Web Developer',
      description:
        "Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts to any design, and the build size is tiny.",
      photo: '/images/sarah-dayan.jpg',
      email: '',
      password: ''
    },
    {
      firstName: 'Grafikart',
      lastName: '',
      job: 'Web Developer',
      description:
        'See my Tailwindcss tutorial on  you tube : https://www.youtube.com/watch?v=D6-g6JgiUIs',
      photo: '/images/grafikart.jpg',
      email: '',
      password: ''
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      job: 'undefined',
      description:
        'I have been notice in million of code line just because nobody know who i am',
      photo: '/images/john-doe.png',
      email: 'jd@demo.fr',
      password: '123'
    },
  ];


  getUsers(): UserInterface[] {
    return this.usersFromDB;
  }

  getUser(id: number): UserInterface {
    const user = this.usersFromDB.filter(( user, index) => { 
      return id - 1 == index
     })[0];
    return user 
  }

  getUserAccount(email: string, password: string ): UserInterface {
    const user = this.usersFromDB.filter( user => { 
      return user.email == email && user.password == password
     })[0];
    return user 
  }
}
