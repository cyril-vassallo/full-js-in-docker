import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { config } from '../../config/config' 
import { UserInterface } from "../Interfaces/Interfaces";

@Injectable()
export class UserService {

    private users: UserInterface[] = [];

    constructor(private http: HttpClient) {}
    

    getAllUsers(data: any, callback: (users: UserInterface[]) => void): void {
        this.http.get(config.apiUrl + config.user).subscribe((result: any) => {
            callback(result.data);
        })
    }

}