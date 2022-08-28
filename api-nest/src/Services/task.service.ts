import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskInterface, IdInterface } from '../Interfaces/interfaces';
import { FormatService } from './format.service';
import { TaskDto } from '../dto/task.dto';
import { Task, TaskDocument } from '../Schemas/task.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';



@Injectable()
export class TaskService {



  constructor(private format: FormatService, @InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createOne(taskDto: TaskDto): Promise<TaskInterface> {
    const newTask = { 
      user: taskDto.user,
      date: taskDto.date,
      list: taskDto.list,
      commits: taskDto.commits
    }
    const createdTask = new this.taskModel(newTask);

    createdTask.save();

    return  { 
      id: createdTask.id,
      user: createdTask.user,
      date: createdTask.date,
      list: createdTask.list,
      commits: createdTask.commits.map(commit => {
        return {
          hash: commit.hash, url: commit.url
        }
      }),
    }
  }

  async findByUserId(userId: string): Promise<TaskInterface[]>{
    const tasks =  await this.taskModel.find({ user: userId }).exec();
    return tasks.map( task => {
      return {
        id : task.id,
        user: task.user,
        date: task.date,
        list:  task.list,
        commits: task.commits.map(commit => {
          return {
            hash: commit.hash, url: commit.url
          }
        }),
      }
    })
  }

  async findAll(): Promise<TaskInterface[]>{
    const tasks = await  this.taskModel.find().exec();
    return tasks.map( task => {
      return {
        id : task.id,
        user: task.user,
        date: task.date,
        list:  task.list,
        commits: task.commits.map(commit => {
          return {
            hash: commit.hash, url: commit.url
          }
        }),
      }
    })
  }

  async findLastCreatedId(): Promise<IdInterface> {
    const lastCreatedTask =  await this.taskModel.find().sort({ $natural: -1 }).limit(1).exec();
    return {id: lastCreatedTask[0].id };
  }

  async updateOne(taskDto: TaskDto): Promise<TaskInterface> {
    let taskToUpdate = await this.taskModel.findOne({_id: taskDto.id}).exec();

    if(taskDto.list) {
      taskToUpdate.list = taskDto.list;
    }

    if(taskDto.commits) {
      taskToUpdate.commits = taskDto.commits.map(commit => {
        return {
          hash :commit.hash, 
          url: commit.url
        }
      });
    }

    taskToUpdate.save();

    return { 
      id: taskToUpdate.id, 
      user: taskToUpdate.user,
      date: taskToUpdate.date, 
      list: taskToUpdate.list, 
      commits: taskToUpdate.commits.map(commit => {
        return {
          hash: commit.hash, url: commit.url
        }
      }),

    }
  }

  async deleteOne(taskId: string):  Promise<null> {
      const result = await this.taskModel.deleteOne({id: taskId}).exec()
      if(result.deletedCount === 0) {
        throw new NotFoundException('Task could not be found!')
      }
      return null
  }

  async deleteAllByUserId(userId: string): Promise<null> {
    const result =  await this.taskModel.deleteMany({user: userId}).exec()
    if(result.deletedCount === 0) {
      throw new NotFoundException('Tasks could not be found!')
    }
    return null
  }

  async deleteOneByUserIdAndToday(userId: string):  Promise<null> {
    const todayDate: string = this.format.getTodayDate('fr');

    const result = await this.taskModel.findOneAndRemove(
      {user: userId, date: todayDate},
      function (err) {
        if (err){
          throw new NotFoundException('Task could not be found!');
        }
    }).clone().exec();


    if(result === null) {
      throw new NotFoundException('Task could not be found!');
    }

    return null
}


}
