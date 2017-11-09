import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from '../users/users.component';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';

const userRoutes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users/add', component: AddComponent },
  { path: 'users/show/:id', component: DetailComponent }
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