import { AddComponent } from './add/add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SectorsComponent } from './sectors.component';
const sectorRoutes: Routes = [
  { path: 'sectors', component: SectorsComponent },
  { path: 'sectors/add', component: AddComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(sectorRoutes)
  ],
  exports: [RouterModule]
})
export class SectorsRoutesModule { }