import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UsersListResponse } from '../../models/Users/userList.model';
import { Observable, map } from 'rxjs';
import { User } from '../../models/Users/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {
  
  private _usersServices: UsersService;
  public users = new Observable<User[]>();
  public usersFilter = new Observable<User[]>();

  constructor(usersServices: UsersService){
    this._usersServices = usersServices;
  }

  ngOnInit(): void {
    this.users = this._usersServices.getUsers();
    this.usersFilter = this.users;
  }

  search(event: Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();

    this.users = this.usersFilter.pipe(
      map(arr => arr.filter(f => f.name.toLocaleLowerCase().includes(value)))
    );
  }
}