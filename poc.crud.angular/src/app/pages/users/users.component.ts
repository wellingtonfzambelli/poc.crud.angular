import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UsersListResponse } from '../../models/Users/userList.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {
  
  private _usersServices: UsersService;
  public responseUsers = {} as UsersListResponse;

  constructor(usersServices: UsersService){
    this._usersServices = usersServices;
  }

  ngOnInit(): void {
    this._usersServices.getUsers()
      .subscribe(res => this.responseUsers = res);
  }
}