import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserInterface } from '../Interfaces/user.interface';
import { AccountDto } from '../dto/account.dto'

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
      password: null
    },
    {
      firstName: 'Sarah',
      lastName: 'Dayan',
      job: 'Web Developer',
      description:
        "Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts to any design, and the build size is tiny.",
      photo: '/images/sarah-dayan.jpg',
      email: '',
      password: null
    },
    {
      firstName: 'Grafikart',
      lastName: '',
      job: 'Web Developer',
      description:
        'See my Tailwindcss tutorial on  you tube : https://www.youtube.com/watch?v=D6-g6JgiUIs',
      photo: '/images/grafikart.jpg',
      email: '',
      password: null
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      job: 'Web Developer',
      description:
        'I have been notice in million of code line just because nobody know who i am',
      photo: 'tpdne-1',
      email: 'jd@demo.fr',
      password: 123
    },
  ];


  getAllUsers(): UserInterface[] {
    return this.usersFromDB;
  }

  getUserById(id: number): UserInterface {
    const user = this.usersFromDB.filter(( user, index) => { 
      return id - 1 == index;
     })[0];
    return user ;
  }

  getUserByAccount(AccountDto: AccountDto): UserInterface {
    const accounts = this.usersFromDB.filter(user => {
      return user.email == AccountDto.email && user.password == AccountDto.password && AccountDto.email != '' &&  AccountDto.password != null 
    });

    if (accounts.length === 1) {
      let userAccount: UserInterface = accounts[0]
      return userAccount;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
