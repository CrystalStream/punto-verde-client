import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutesModule } from './home.routes.module';

import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
  	HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutesModule
  ]
})
export class HomeModule { }
