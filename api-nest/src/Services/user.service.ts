import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserInterface } from '../Interfaces/interfaces';
import { AccountDto } from '../dto/account.dto';
import { UserDto } from '../dto/user.dto';
import { User, UserDocument } from '../Schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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
      password: "456"
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
      password: "789"
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
      password: "321"
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
      password: "123"
    },
  ];

  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>){}


  async findAll(): Promise<UserInterface[]> {
    const users =  await this.userModel.find().exec();
    return users.map(user => {
      return {
        id : user.id, 
        firstName: user.firstName, 
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        job: user.job,
        description: user.description,
        photo: user.photo
      }
    })
  }

  findOneById(id: number): UserInterface {
    const user: UserInterface = this.usersFromDB.filter((user) => { 
      return id == user.id;
     })[0]; 

    return { 
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      job: user.job,
      description: user.description,
      photo: user.photo
    } 
  }

  findOneByAccount(accountDto: AccountDto): UserInterface {
    const accounts: UserInterface [] = this.usersFromDB.filter(user => {
      return user.email == accountDto.email && user.password == accountDto.password && accountDto.email != '' &&  accountDto.password != null 
    });

    if (accounts.length === 1) {
      let userAccount: UserInterface = {...accounts[0]}
    
    return { 
        id: userAccount.id,
        firstName: userAccount.firstName,
        lastName: userAccount.lastName,
        email: userAccount.email,
        job: userAccount.job,
        description: userAccount.description,
        photo: userAccount.photo
      } 
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  updateOne(userDto: UserDto): UserInterface {
    let user : UserInterface = this.usersFromDB.filter(user => user.id === userDto.id)[0]
    
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;
    user.job = userDto.job;
    user.description = userDto.description;

    return this.findOneById(userDto.id)

  }
}
