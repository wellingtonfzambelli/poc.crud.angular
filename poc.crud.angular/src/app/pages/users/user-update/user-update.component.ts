import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { UserGetResponse } from '../../../models/Users/userGet.model';
import { ActivatedRoute } from '@angular/router';
import { UserUpdateRequest } from '../../../models/Users/userUpdate.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss'
})

export class UserUpdateComponent implements OnInit {

  public response = {} as UserGetResponse;
  public request = {} as UserUpdateRequest;

  private _id: string;
  private _usersServices: UsersService;
  private _route: ActivatedRoute;

  constructor(usersServices: UsersService, route: ActivatedRoute){
    this._usersServices = usersServices;
    this._route = route;
    this._id = '';
  }
  
  ngOnInit(): void {
    this._id = this._route.snapshot.paramMap.get('id') || '';

    this._usersServices.getUser(this._id)
      .subscribe(res => {
        this.request = {
          name: res.data.first_name + ' ' + res.data.last_name,
          job: ''
        }
      });
  }

  update(){
    this._usersServices.updateUser(this._id, this.request)
      .subscribe(res => {
        alert('Updated: ' + res.updatedAt);
      });
  }
}