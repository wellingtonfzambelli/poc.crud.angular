import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGetResponse } from '../../../models/Users/userGet.model';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.scss'
})

export class UserDeleteComponent implements OnInit {
  
  public userGet = {} as UserGetResponse;
  
  private _id: string;
  private _usersServices: UsersService;
  private _route: ActivatedRoute;
  private _router: Router;

  constructor(usersServices: UsersService, route: ActivatedRoute, router: Router){
    this._usersServices = usersServices;
    this._route = route;
    this._router = router;
    this._id = '';
  }

  ngOnInit(): void {
    this._id = this._route.snapshot.paramMap.get('id') || '';

    this._usersServices.getUser(this._id)
      .subscribe(res => {
        this.userGet = res;
      });
  }

  delete(){
    this._usersServices.deleteUser(this._id)
      .subscribe(res => {
        alert('The data has been removed');
        this._router.navigate(['users']);
      });
  }

  cancel(){
    this._router.navigate(['users']);
  }
}