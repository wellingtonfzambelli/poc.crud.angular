import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUpdateRequest } from '../../../models/Users/userUpdate.model';
import { User } from '../../../models/Users/user.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss'
})

export class UserUpdateComponent implements OnInit {

  public response = {} as User;
  public request = {} as UserUpdateRequest;

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
        this.request = {
          name: res.name,
          email: res.email,
          status: res.status
        }
      });
  }

  update(){
    this._usersServices.updateUser(this._id, this.request)
      .subscribe(res => {
        alert('Updated: ' + res.id);
        this._router.navigate(['users']);
      });
  }
}