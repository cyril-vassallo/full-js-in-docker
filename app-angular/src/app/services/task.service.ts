import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';
import { UserInterface } from '../Interfaces/Interfaces';
import { Observable } from 'rxjs';
import { TaskAndMeta, TasksAndMeta } from '../types/types';
import { TaskInterface } from '../Interfaces/Interfaces';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {}

  public getTasksByUser(user: UserInterface): Observable<TasksAndMeta> {
    return this.http.get<TasksAndMeta>(
      config.apiUrl + config.getUserTasks + user.id
    );
  }

  public postTask(task: TaskInterface): Observable<TaskAndMeta> {
    return this.http.post<TaskAndMeta>(config.apiUrl + config.postTask, task);
  }
}
