import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from '../users/users.component';
import { AddComponent } from './add/add.component';

const userRoutes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users/add', component: AddComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  exports: [RouterModule]
})
export class UsersRoutesModule { }