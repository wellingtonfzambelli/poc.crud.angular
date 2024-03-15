import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserCreate } from '../../../../models/Users/userCreate.model';
import { User } from '../../../../models/Users/user.model';
import { Router } from '@angular/router';
import { UserUpdateRequest } from '../../../../models/Users/userUpdate.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})

export class UserFormComponent implements OnInit {
  @Input({required: true}) userId: number = 0;

  private _usersServices: UsersService;
  private _router: Router;
  
  public user = {} as User;
  public response = {} as User;
  public statusDropdown: string[] = ['active', 'inactive'];  
  public showSpinner: boolean = true;

  public userForm = new FormGroup({
    nameForm: new FormControl('', Validators.required,),
    genderForm: new FormControl('', Validators.required),
    emailForm: new FormControl('', [Validators.required, Validators.email]),
    statusForm: new FormControl('', Validators.required)
  }, {updateOn: 'submit'});

  constructor(usersServices: UsersService, router: Router){
    this._usersServices = usersServices;
    this._router = router;
  }  
  
  ngOnInit(): void {
    if(this.userId != 0){
      this._usersServices.getUser(this.userId)
        .subscribe(res => {
          this.userForm.patchValue({
            nameForm: res.name,
            emailForm: res.email,
            genderForm: res.gender,
            statusForm: res.status
          });

          this.showSpinner = false;
        });
    }else{
      this.showSpinner = false;
    }
  }

  onSubmit() {
    if(this.userForm.valid){
      this.showSpinner = true;

      if(this.userId == 0) {
        this.create();
      }else{
        this.update(this.userId)
      }
    }
  }

  create(){
    const request: UserCreate = {
      name: this.userForm.value.nameForm as string,
      gender: this.userForm.value.genderForm as string,
      email: this.userForm.value.emailForm as string,
      status: this.userForm.value.statusForm as string
    }

    this._usersServices.createUser(request)
    .subscribe({
      next: value =>{
        alert("User created!");
        this._router.navigate(['users']);
      },
      error: err => {
        console.error('something wrong occurred: ' + err);
        this.showSpinner = false;
      },
      complete: () => {
        console.log('complete');
        this.showSpinner = false;
      },
    });
  }

  update(id: number){
    const request: UserUpdateRequest = {
      name: this.userForm.value.nameForm as string,
      email: this.userForm.value.emailForm as string,
      status: this.userForm.value.statusForm as string
    }

    this._usersServices.updateUser(id, request).subscribe({
      next: value =>{
        alert("User updated!");
        this._router.navigate(['users']);
      },
      error: err => {
        console.error('something wrong occurred: ' + err);
        this.showSpinner = false;
      },
      complete: () => {
        console.log('complete');
        this.showSpinner = false;
      },
    });
  }

  clear(){
    this.userForm.reset();
  }
}