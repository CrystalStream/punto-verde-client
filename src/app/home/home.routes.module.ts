import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  exports: [RouterModule]
})
export class HomeRoutesModule { }
