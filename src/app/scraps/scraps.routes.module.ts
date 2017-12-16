import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ScrapsComponent } from './scraps.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const scrapsRoutes: Routes = [
  { path: 'scraps', component: ScrapsComponent, canActivate: [AuthGuard] },
  { path: 'scraps/add', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'scraps/edit/:id', component: EditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(scrapsRoutes)
  ],
  exports: [RouterModule]
})
export class ScrapsRoutesModule { }
