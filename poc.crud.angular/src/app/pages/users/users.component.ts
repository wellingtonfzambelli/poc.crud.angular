import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UsersListResponse } from '../../models/Users/userList.model';
import { Observable } from 'rxjs';
import { User } from '../../models/Users/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {
  
  private _usersServices: UsersService;
  public users: User[] = [];

  constructor(usersServices: UsersService){
    this._usersServices = usersServices;
  }

  ngOnInit(): void {
    this._usersServices.getUsers()
      .subscribe(res => this.users = res);
  }
}