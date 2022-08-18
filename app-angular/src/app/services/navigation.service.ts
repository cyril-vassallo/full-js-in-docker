import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';
import { LoginFormInterface } from '../Interfaces/Interfaces';
import { Observable } from 'rxjs';
import { NavigationAndMeta } from '../types/types';

@Injectable()
export class NavigationService {
  constructor(private http: HttpClient) {}

  public getNavigation(): Observable<NavigationAndMeta> {
    return this.http.get<NavigationAndMeta>(config.apiUrl + config.navigation);
  }

}
