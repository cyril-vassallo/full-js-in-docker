import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { config } from '../../config/config' 
import { UserInterface, LoginFormInterface } from '../Interfaces/Interfaces';


@Injectable()
export class UserService {

 
    constructor(private http: HttpClient) {}
    

    login(loginForm: LoginFormInterface, callback: (user: UserInterface) => void): void {
        console.log(loginForm)
        this.http.post(config.apiUrl + config.login, loginForm).subscribe((response: any) => {
            callback(response.data)
        })
    }

}