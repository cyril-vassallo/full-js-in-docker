import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';
import { UserInterface, GithubInterface } from '../Interfaces/Interfaces';
import { Observable } from 'rxjs';
import { GithubAndMeta } from '../types/types';


@Injectable()
export class GithubService {
  constructor(private http: HttpClient) {}

  public getGithubByUser(user: UserInterface): Observable<GithubAndMeta> {
    return this.http.get<GithubAndMeta>(
      config.apiUrl + config.getUserGithub + user.id
    );
  }

  public checkGithubRepository(github: GithubInterface):  Observable<any> {
    return this.http.get<any>(
        config.apiGithub + 'repos/'+ github.owner + '/' + github.repository + '/branches/' + github.branch
    );
  }

}
