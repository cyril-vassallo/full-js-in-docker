import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserInterface } from '../Interfaces/interfaces';
import { AccountDto } from '../dto/account.dto';
import { UserDto } from '../dto/user.dto';
import { User, UserDocument } from '../Schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

  async findAll(): Promise<UserInterface[]> {
    const users: UserDocument[] =  await this.userModel.find().exec();

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

  async findOneById(userId: string): Promise<UserInterface> {
    const user: UserDocument = await this.userModel.findOne({_id: userId}).exec()

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

  async findOneByAccount(accountDto: AccountDto): Promise<UserInterface> {
    const account: UserDocument  = await this.userModel.findOne({email: accountDto.email, password: accountDto.password}).exec()
    
    if(account){
    return { 
        id: account.id,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        job: account.job,
        description: account.description,
        photo: account.photo
      } 
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async updateOne(userDto: UserDto): Promise<UserInterface> {

    let user: UserDocument = await this.userModel.findOne({_id: userDto.id}).exec();

    if(userDto.firstName){
      user.firstName = userDto.firstName;
    }

    if(userDto.lastName) {
      user.lastName = userDto.lastName;
    }

    if(userDto.email) {
      user.email = userDto.email;
    }

    if(userDto.job) {
      user.job = userDto.job;
    }

    if(userDto.description) {
      user.description = userDto.description;
    }

    user.save();

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      job: user.job,
      description: user.description,
      email: user.email,
      photo: user.photo,
    };

  }
}
