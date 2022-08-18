import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';
import { LoginFormInterface } from '../Interfaces/Interfaces';
import { Observable } from 'rxjs';
import { UserAndMeta, UsersAndMeta } from '../types/types';
import { catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  public login(loginForm: LoginFormInterface): Observable<UserAndMeta> {
    return this.http.post<UserAndMeta>(config.apiUrl + config.login, loginForm);
  }

  public getAllUsers(): Observable<UsersAndMeta>{
    return this.http.get<UsersAndMeta>(config.apiUrl + config.users);
  }
}
