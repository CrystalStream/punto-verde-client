import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutesModule } from './home.routes.module';

import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutesModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ]
})
export class HomeModule { }
