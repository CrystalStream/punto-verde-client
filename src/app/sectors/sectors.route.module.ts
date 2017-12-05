import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SectorsComponent } from './sectors.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';

const sectorRoutes: Routes = [
  { path: 'sectors', component: SectorsComponent },
  { path: 'sectors/add', component: AddComponent },
  { path: 'sectors/edit/:id', component: EditComponent},
  { path: 'sectors/show/:id', component: DetailComponent}
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
