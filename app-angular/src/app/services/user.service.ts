import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constant } from '../../config/config';
import { LoginFormInterface, UserInterface } from '../Interfaces/Interfaces';
import { Observable } from 'rxjs';
import { UsersAndMeta } from '../types/types';
import { map } from 'rxjs/operators';


@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}


  // path: /user/login
  public login(loginForm: LoginFormInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(constant.API_URL + constant.USER + constant.LOGIN, loginForm)
    .pipe(
      map((_observable: any) => {
        return _observable.data as UserInterface;
      }));
  }

  // path: /user
  public createUser(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(constant.API_URL + constant.USER, user)
    .pipe(
      map((_observable: any) => {
        return _observable.data as UserInterface;
      }));
  }

  // path: /user/all
  public getAllUsers(): Observable<UserInterface[]>{
    return this.http.get<UserInterface[]>(constant.API_URL + constant.USER + constant.ALL)    
    .pipe(
      map((_observable: any) => {
        return _observable.data as UserInterface[];
      }));
  }

  // path: /user
  public updateUser(user: UserInterface): Observable<UserInterface>{
    return this.http.patch<UserInterface>(constant.API_URL + constant.USER, user)
    .pipe(
      map((_observable: any) => {
        return _observable.data as UserInterface;
      }));
  }
  

  // BROWSER LOCAL STORAGE
  public saveUserToLocalStorage(content: string) {
    localStorage.setItem("user", content);
  }
}
