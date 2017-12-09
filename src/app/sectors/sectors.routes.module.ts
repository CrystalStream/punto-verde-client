import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SectorsComponent } from './sectors.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const sectorRoutes: Routes = [
  { path: 'sectors', component: SectorsComponent, canActivate: [AuthGuard] },
  { path: 'sectors/add', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'sectors/edit/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'sectors/show/:id', component: DetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(sectorRoutes)
  ],
  exports: [RouterModule]
})
export class SectorsRoutesModule { }
