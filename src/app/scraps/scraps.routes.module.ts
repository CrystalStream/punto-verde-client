import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ScrapsComponent } from './scraps.component';

const scrapsRoutes: Routes = [
  { path: 'scraps', component: ScrapsComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(scrapsRoutes)
  ],
  exports: [RouterModule]
})
export class ScrapsRoutesModule { }