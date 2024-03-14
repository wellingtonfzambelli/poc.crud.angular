import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/Users/user.model';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.scss'
})

export class UserDeleteComponent implements OnInit {
  
  public user = {} as User;
  
  private id: number = 0;
  private _usersServices: UsersService;
  private _route: ActivatedRoute;
  private _router: Router;

  constructor(usersServices: UsersService, route: ActivatedRoute, router: Router){
    this._usersServices = usersServices;
    this._route = route;
    this._router = router;
  }

  ngOnInit(): void {
    this.id = Number(this._route.snapshot.paramMap.get('id') || '');

    this._usersServices.getUser(this.id)
      .subscribe(res => {
        this.user = res;
      });
  }

  delete(){
    this._usersServices.deleteUser(this.id)
      .subscribe(res => {
        alert('The data has been removed');
        this._router.navigate(['users']);
      }, (error) =>{
        alert(error.status);
      });
  }

  cancel(){
    this._router.navigate(['users']);
  }
}