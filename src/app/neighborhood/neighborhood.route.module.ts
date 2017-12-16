import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NeighborhoodComponent } from './neighborhood/neighborhood.component';

import { AuthGuard } from '../shared/guards/auth.guard';

const neighborhoodRoutes: Routes = [
  { path: 'neighborhoods', component: NeighborhoodComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(neighborhoodRoutes)
  ],
  exports: [RouterModule]
})
export class NeighborhoodRoutesModule { }
