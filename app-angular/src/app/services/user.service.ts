import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { config } from '../../config/config' 
import { LoginFormInterface } from '../Interfaces/Interfaces';
import { Observable } from "rxjs";
import { UserAndMeta } from '../types/types';



@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}
    
    public login(loginForm: LoginFormInterface): Observable<UserAndMeta> {
        return this.http.post<UserAndMeta>(config.apiUrl + config.login, loginForm)
    }

}