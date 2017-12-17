import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';

import { AuthGuard } from '../shared/guards/auth.guard';

const registerRoutes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(registerRoutes)
  ],
  exports: [RouterModule]
})
export class RegisterRoutesModule { }
