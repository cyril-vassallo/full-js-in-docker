import { Injectable } from '@nestjs/common';
import {  TaskInterface,} from '../Interfaces/task.interface';


@Injectable()
export class TaskService {

  private tasksFromDb:  TaskInterface[] =  [
    {
      id: 1,
      userId: 1,
      date: '11/07/2022',
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
      ],
    },
    {
      id: 2,
      userId: 4,
      date: '28/07/2022',
      list: ['task1', "Task2"],
      commits: [
        {
          url: "/task1",
          hash: "GUFUSSkGIHOHKHLLFYT4"
        },
          {
          url: "/task2",
          hash: "GUKJDINIKSKSJJFTFY3"
        }
      ]
    },
    {
      id: 3,
      userId: 4,
      date: '29/07/2022',
      list: ['task1', "Task2"],
      commits: [
        {
          url: "/task1",
          hash: "GUFUSSkGIHOHKHLLFYT4"
        },
          {
          url: "/task2",
          hash: "GUKJDINIKSKSJJFTFY3"
        }
      ]
    },
    {
      id: 4,
      userId: 2,
      date: '12/07/2022',
      list: ['task1', "Task2"],
      commits: [
        {
          url: "/task1",
          hash: "GUFUSSkGIHOHKHLLFYT4"
        },
          {
          url: "/task2",
          hash: "GUKJDINIKSKSJJFTFY3"
        }
      ]
    },
  ];


  getTasksByUserId(id: number): TaskInterface[] {
    return this.tasksFromDb.filter(task => task.userId == id) ;
  }


}
