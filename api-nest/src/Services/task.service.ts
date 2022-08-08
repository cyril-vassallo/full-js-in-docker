import { Injectable } from '@nestjs/common';
import { TaskInterface } from '../Interfaces/interfaces';
import { FormatService } from './format.service';
import { TaskDto } from './../dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private format: FormatService) {}

  private tasksFromDb: TaskInterface[] = [
    {
      id: 1,
      userId: 1,
      date: '11/07/2022',
      list: ['task1', 'Task2'],
      commits: [
        {
          url: '/task1',
          hash: 'GUFUSSkGIHOIHYFTFYT1',
        },
        {
          url: '/task2',
          hash: 'GUFUGIHOILKSJJFTFY2',
        },
      ],
    },
    {
      id: 1,
      userId: 4,
      date: '28/07/2022',
      list: ['task1', 'Task2'],
      commits: [
        {
          url: '/task1',
          hash: 'GUFUSSkGIHOHKHLLFYT4',
        },
        {
          url: '/task2',
          hash: 'GUKJDINIKSKSJJFTFY3',
        },
      ],
    },
    {
      id: 2,
      userId: 4,
      date: '29/07/2022',
      list: ['task1', 'Task2'],
      commits: [
        {
          url: '/task1',
          hash: 'GUFUSSkGIHOHKHLLFYT4',
        },
        {
          url: '/task2',
          hash: 'GUKJDINIKSKSJJFTFY3',
        },
      ],
    },
    {
      id: 1,
      userId: 2,
      date: '12/07/2022',
      list: ['task1', 'Task2'],
      commits: [
        {
          url: '/task1',
          hash: 'GUFUSSkGIHOHKHLLFYT4',
        },
        {
          url: '/task2',
          hash: 'GUKJDINIKSKSJJFTFY3',
        },
      ],
    },
  ];

  getTasksByUserId(id: number): TaskInterface[] {
    const tasks: TaskInterface[] = this.tasksFromDb.filter(
      (task) => task.userId == id,
    );
    const sortedTasksByMostRecentDate = [...tasks];
    sortedTasksByMostRecentDate
      .sort((aTask: TaskInterface, bTask: TaskInterface) => {
        const aDate: any = new Date(
          this.format.DateFrToEn(aTask.date),
        ).getTime();
        const bDate: any = new Date(
          this.format.DateFrToEn(bTask.date),
        ).getTime();
        return aDate - bDate;
      })
      .reverse();
    return sortedTasksByMostRecentDate;
  }

  getAllTasks(): TaskInterface[] {
    return this.tasksFromDb;
  }

  updateTasksFromDb(taskDto: TaskDto): TaskInterface[] {
    const lastInsertTask: TaskInterface =
      this.tasksFromDb[this.tasksFromDb.length - 1];

    const isSameTask: boolean =
      lastInsertTask.id === taskDto.id &&
      lastInsertTask.userId === taskDto.userId;
    const isListSame: boolean =
      lastInsertTask.list.length !== taskDto.list.length;
    const isCommitsSame: boolean =
      lastInsertTask.commits.length !== taskDto.commits.length;

    if (!isSameTask) {
      const task: TaskInterface = {
        id: taskDto.id,
        userId: taskDto.userId,
        date: taskDto.date,
        list: taskDto.list,
        commits: taskDto.commits,
      };

      this.tasksFromDb.push(task);
    } else if (isSameTask && (isListSame || isCommitsSame)) {
      lastInsertTask.list = taskDto.list;
      lastInsertTask.commits = taskDto.commits;
    }

    return this.tasksFromDb;
  }
}
