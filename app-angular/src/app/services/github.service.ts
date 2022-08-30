import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constant } from '../../config/config';
import { UserInterface, GithubInterface } from '../Interfaces/Interfaces';
import { map, Observable } from 'rxjs';
import { GithubAndMeta } from '../types/types';
import { catchError, of } from 'rxjs';


@Injectable()
export class GithubService {
  constructor(private http: HttpClient) {}


  // path: /github
  public postGithub(github: GithubInterface): Observable<GithubAndMeta> {
    return this.http.post<GithubAndMeta>( constant.API_URL + constant.GITHUB, github)
  }

  // path: /github/user/{:userId}
  public getGithubByUser(user: UserInterface): Observable<GithubInterface> {
    return this.http.get<GithubInterface>(constant.API_URL + constant.GITHUB + constant.USER + '/' + user.id).pipe(
      map((_observable: any) => {
        return _observable.data as GithubInterface;
      }),
      catchError((err: any) => {
        const emptyGithub:  GithubInterface = { 
          id: "",
          user: "",
          owner: "",
          repository: "",
          branch: "",
          enabled : false,
          token: "",
        }
        return of(emptyGithub);
      })
    );
  }

  // path: /repos/{:owner}/{:repository}/branches/{:branch}
  public checkGithubRepository(github: GithubInterface):  Observable<any> {
    return this.http.get<any>(
        constant.API_GITHUB + constant.REPOS  + '/' + github.owner + '/' + github.repository + constant.BRANCHES + '/' + github.branch
    );
  }

}
