import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ReturnedUserInterface, UserInterface,  } from '../Interfaces/interfaces';
import { AccountDto } from '../dto/account.dto'

@Injectable()
export class UserService {

  private usersFromDB:  UserInterface[] =  [
    {
      id: 1,
      firstName: 'Cyril',
      lastName: 'Vassallo',
      job: 'Web Developer',
      description:
        "I've tried Tailwindcss and it is fun and very powerful, discover here my pre-configured Next-js and Tailwindcss boiler plate in docker container",
      photo: 'tpdne-2',
      email: 'cyrilvssll34@gmail.com',
      password: 456
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Dayan',
      job: 'Web Developer',
      description:
        "Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts to any design, and the build size is tiny.",
      photo: 'tpdne-3',
      email: 'sd@demo.fr',
      password: 789
    },
    {
      id: 3,
      firstName: 'Grafikart',
      lastName: '',
      job: 'Web Developer',
      description:
        'See my Tailwindcss tutorial on  you tube : https://www.youtube.com/watch?v=D6-g6JgiUIs',
      photo: 'tpdne-4',
      email: 'ga@demo.fr',
      password: 321
    },
    {
      id: 4,
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


  getAllUsers(): ReturnedUserInterface[] {
    const users = this.usersFromDB.map((user)=> {
      delete user.password;
      delete user.email;
      return user;
    })
    return this.usersFromDB;
  }

  getUserById(id: number): ReturnedUserInterface {
    let user = this.usersFromDB.filter(( user) => { 
      return id == user.id;
     })[0];
    delete user.password;
    delete user.email;
    return user ;
  }

  getUserByAccount(accountDto: AccountDto): ReturnedUserInterface {
    const accounts = this.usersFromDB.filter(user => {
      return user.email == accountDto.email && user.password == parseInt(accountDto.password) && accountDto.email != '' &&  accountDto.password != null 
    });

    if (accounts.length === 1) {
      let userAccount: UserInterface = {...accounts[0]}
      delete userAccount.password;
      delete userAccount.email;
      return userAccount;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
