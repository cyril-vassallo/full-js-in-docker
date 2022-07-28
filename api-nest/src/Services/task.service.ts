import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {  TaskInterface,} from '../Interfaces/task.interface';


@Injectable()
export class TaskService {

  private tasks:  TaskInterface[] =  [
    {
      date: '2022-07-07',
      list: ['task1', "Task2"],
      commits: [
        {
          url: "/task1",
          hash: "GUFUSSkGIHOIHYFTFYT1"
        },
          {
          url: "/task2",
          hash: "GUFUGIHOILKSJJFTFY2"
        }
      ]
     
    },
   
  ];


  getTasksByUserId(id: number): TaskInterface[] {
    return this.tasks ;
  }


}
