import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from '../users/users.component';

const userRoutes: Routes = [
  { path: 'users', component: UsersComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class UsersRoutesModule { }