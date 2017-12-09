import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from '../users/users.component';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';

import { AuthGuard } from '../shared/guards/auth.guard';

const userRoutes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/add', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'users/show/:id', component: DetailComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: EditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  exports: [RouterModule]
})
export class UsersRoutesModule { }
