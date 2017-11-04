import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrapsRoutesModule } from './scraps.routes.module';

import { ScrapsComponent } from './scraps.component';


@NgModule({
  declarations: [
  	ScrapsComponent
  ],
  imports: [
    CommonModule,
    ScrapsRoutesModule
  ]
})
export class ScrapsModule { }
