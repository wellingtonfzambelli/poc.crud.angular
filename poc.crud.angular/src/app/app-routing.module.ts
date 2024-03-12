import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { UserCreateComponent } from './pages/users/user-create/user-create.component';
import { UserUpdateComponent } from './pages/users/user-update/user-update.component';
import { UserDeleteComponent } from './pages/users/user-delete/user-delete.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'users/create', component: UserCreateComponent},
  {path: 'users/update/:id', component: UserUpdateComponent},
  {path: 'users/delete/:id', component: UserDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
