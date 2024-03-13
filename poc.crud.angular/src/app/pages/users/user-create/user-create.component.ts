import { Component, OnInit } from '@angular/core';
import { UserCreate } from '../../../models/Users/userCreate.model';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/Users/user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})

export class UserCreateComponent {
  
  private _usersServices: UsersService;
  
  public request: UserCreate = {
    name: '',
    gender: '',
    email: '',
    status: ''
  }

  public response = {} as User;

  constructor(usersServices: UsersService){
    this._usersServices = usersServices;
  }
  
  save(){
    this._usersServices.createUser(this.request)
      .subscribe(res =>{
        this.response = res
      });
  }
}