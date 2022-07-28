import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { config } from '../../config/config' 
import { UserInterface } from '../Interfaces/Interfaces';
import { Observable } from "rxjs";
import { TasksAndMeta } from '../types/types';



@Injectable()
export class TaskService {

    constructor(private http: HttpClient) {}
    
    public getTaskByUser(user: UserInterface): Observable<TasksAndMeta> {
        return this.http.get<TasksAndMeta>(config.apiUrl + config.tasks + user.id)
    }

}