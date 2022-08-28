import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constant } from '../../config/config';
import { UserInterface, GithubInterface } from '../Interfaces/Interfaces';
import { Observable } from 'rxjs';
import { GithubAndMeta } from '../types/types';



@Injectable()
export class GithubService {
  constructor(private http: HttpClient) {}


  // path: /github
  public postGithub(github: GithubInterface): Observable<GithubAndMeta> {
    return this.http.post<GithubAndMeta>( constant.API_URL + constant.GITHUB, github)
  }

  // path: /github/user/{:userId}
  public getGithubByUser(user: UserInterface): Observable<GithubAndMeta> {
    return this.http.get<GithubAndMeta>(
      constant.API_URL + constant.GITHUB + constant.USER + '/'+ user.id
    );
  }

  // path: /repos/{:owner}/{:repository}/branches/{:branch}
  public checkGithubRepository(github: GithubInterface):  Observable<any> {
    return this.http.get<any>(
        constant.API_GITHUB + constant.REPOS  + '/' + github.owner + '/' + github.repository + constant.BRANCHES + '/' + github.branch
    );
  }



}
