import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http"
import { config } from '../../config/config' 
import { UserInterface, LoginFormInterface } from '../Interfaces/Interfaces';



@Injectable()
export class UserService {

 
    constructor(private http: HttpClient) {}
    

    login(loginForm: LoginFormInterface, callback: (user: UserInterface|null) => void): void {
        console.log(loginForm)
        this.http.post(config.apiUrl + config.login, loginForm).subscribe((response: any| HttpErrorResponse) => {
            console.log(response)
            if (response.data) {
                callback(response.data)
            } else {
                callback(null)
            }
           
        })
    }

}