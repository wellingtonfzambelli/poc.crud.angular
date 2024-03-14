import { Component, OnInit } from '@angular/core';
import { UserCreate } from '../../../models/Users/userCreate.model';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/Users/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})

export class UserCreateComponent {
  
  private _usersServices: UsersService;
  
  public response = {} as User;

  public statusDropdown: string[] = ['active', 'inactive'];  

  public userForm = new FormGroup({
    nameForm: new FormControl('', Validators.required,),
    genderForm: new FormControl('', Validators.required),
    emailForm: new FormControl('', [Validators.required, Validators.email]),
    statusForm: new FormControl('', Validators.required)
  }, {updateOn: 'submit'});

  constructor(usersServices: UsersService){
    this._usersServices = usersServices;
  }

  onSubmit() {
    if(this.userForm.valid){
      
      const request: UserCreate = {
        name: this.userForm.value.nameForm as string,
        gender: this.userForm.value.genderForm as string,
        email: this.userForm.value.emailForm as string,
        status: this.userForm.value.statusForm as string
      }

      this._usersServices.createUser(request)
      .subscribe(res =>{
        alert("User created!");
        this.clear();
        this.response = res;
      });
    }
  }

  clear(){
    this.userForm.reset();
  }
}