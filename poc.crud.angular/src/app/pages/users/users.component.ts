import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/Users/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {
  
  public users: User[] = [];
  public usersFilter: User[] = [];
  public showSpinner: boolean = true;

  private _usersServices: UsersService;

  constructor(usersServices: UsersService){
    this._usersServices = usersServices;
  }

  ngOnInit(): void {
    this._usersServices.getUsers().subscribe({
      next: value =>{
        this.users = value;
        this.usersFilter = this.users;
      },
      error: err => {
        console.error('something wrong occurred: ' + err);
      },
      complete: () => {
        this.showSpinner = false;
      },
    });
  }

  search(event: Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();

    this.users = this.usersFilter.filter(s => s.name.toLocaleLowerCase().includes(value));
  }
}