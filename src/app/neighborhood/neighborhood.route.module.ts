import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NeighborhoodComponent } from './neighborhood/neighborhood.component';
import { EditComponent } from './neighborhood/edit/edit.component';
import { AddComponent } from './neighborhood/add/add.component';
import { DetailComponent } from './neighborhood/detail/detail.component';

import { AuthGuard } from '../shared/guards/auth.guard';

const neighborhoodRoutes: Routes = [
  { path: 'neighborhoods', component: NeighborhoodComponent, canActivate: [AuthGuard] },
  { path: 'neighborhoods/add', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'neighborhoods/edit/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'neighborhoods/show/:id', component: DetailComponent, canActivate: [AuthGuard] },
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
