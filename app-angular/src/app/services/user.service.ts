import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constant } from '../../config/config';
import { LoginFormInterface, UserInterface } from '../Interfaces/Interfaces';
import { Observable } from 'rxjs';
import { UserAndMeta, UsersAndMeta } from '../types/types';


@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}


  // path: /user/login
  public login(loginForm: LoginFormInterface): Observable<UserAndMeta> {
    return this.http.post<UserAndMeta>(constant.API_URL + constant.LOGIN, loginForm);
  }

  // path: /user/all
  public getAllUsers(): Observable<UsersAndMeta>{
    return this.http.get<UsersAndMeta>(constant.API_URL + constant.USER + constant.ALL);
  }

  // path: /user
  public updateUser(user: UserInterface): Observable<UsersAndMeta>{
    return this.http.patch<UsersAndMeta>(constant.API_URL + constant.USER, user);
  }

  // BROWSER LOCAL STORAGE
  public saveUserToLocalStorage(content: string) {
    localStorage.setItem("user", content);
  }
}
