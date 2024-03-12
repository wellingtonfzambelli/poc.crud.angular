import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { UsersListResponse } from '../models/Users/userList.model';
import { UserCreate, UserCreateResponse } from '../models/Users/userCreate.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private _httpClient: HttpClient;
  private _apiBaseUrl = environment.apiBaseURL;
  
  constructor(httpClient: HttpClient) { 
    this._httpClient = httpClient;
  }

  getUsers(): Observable<UsersListResponse>{
    return this._httpClient.get<UsersListResponse>(this._apiBaseUrl + '/api/users');
  }

  createUser(request: UserCreate): Observable<UserCreateResponse>{
    return this._httpClient.post<UserCreateResponse>(this._apiBaseUrl + '/api/users', request);
  }
}