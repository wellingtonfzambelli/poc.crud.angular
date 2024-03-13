import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserCreate } from '../models/Users/userCreate.model';
import { User } from '../models/Users/user.model';
import { UserUpdateRequest } from '../models/Users/userUpdate.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private _httpClient: HttpClient;
  private _apiBaseUrl = environment.apiBaseURL;
  private _token = environment.apiToken;
  
  constructor(httpClient: HttpClient) { 
    this._httpClient = httpClient;
  }

  getUser(id: string): Observable<User>{
    return this._httpClient.get<User>(this._apiBaseUrl + '/users/' + id);
  }

  getUsers(): Observable<User[]>{
    return this._httpClient.get<User[]>(this._apiBaseUrl + '/users');
  }

  createUser(request: UserCreate): Observable<User>{
    return this._httpClient.post<User>(
      this._apiBaseUrl + '/users', 
      request,
      { headers: this.createHeader() }
    );
  }

  updateUser(id: string, request: UserUpdateRequest): Observable<User>{
    return this._httpClient.put<User>(
      this._apiBaseUrl + '/users/' + id, 
      request,
      { headers: this.createHeader() }
    );
  }

  deleteUser(id: string): Observable<any>{
    return this._httpClient.delete<any>(
      this._apiBaseUrl + '/users/' + id, 
      { headers: this.createHeader() }
    );
  }

  createHeader() {
    return new HttpHeaders(
    {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': `Bearer ${this._token}`
    });
  }
}