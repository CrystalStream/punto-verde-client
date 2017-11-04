import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutesModule } from './users.routes.module';

import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
  	UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutesModule
  ]
})
export class UsersModule { }
