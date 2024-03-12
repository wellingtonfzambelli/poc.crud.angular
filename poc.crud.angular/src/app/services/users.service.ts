import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { UsersListResponse } from '../models/Users/userList.model';
import { UserCreate, UserCreateResponse } from '../models/Users/userCreate.model';
import { UserGetResponse } from '../models/Users/userGet.model';
import { UserUpdateRequest, UserUpdateResponse } from '../models/Users/userUpdate.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private _httpClient: HttpClient;
  private _apiBaseUrl = environment.apiBaseURL;
  
  constructor(httpClient: HttpClient) { 
    this._httpClient = httpClient;
  }

  getUser(id: string): Observable<UserGetResponse>{
    return this._httpClient.get<UserGetResponse>(this._apiBaseUrl + '/api/users/' + id);
  }

  getUsers(): Observable<UsersListResponse>{
    return this._httpClient.get<UsersListResponse>(this._apiBaseUrl + '/api/users');
  }

  createUser(request: UserCreate): Observable<UserCreateResponse>{
    return this._httpClient.post<UserCreateResponse>(this._apiBaseUrl + '/api/users', request);
  }

  updateUser(id: string, request: UserUpdateRequest): Observable<UserUpdateResponse>{
    return this._httpClient.put<UserUpdateResponse>(this._apiBaseUrl + '/api/users/' + id, request);
  }

  deleteUser(id: string): Observable<any>{
    return this._httpClient.delete<any>(this._apiBaseUrl + '/api/users/' + id);
  }
}