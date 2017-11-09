import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutesModule } from './users.routes.module';

import { UsersComponent } from './users.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [
  	UsersComponent,
  	AddComponent
  ],
  imports: [
    CommonModule,
    UsersRoutesModule
  ]
})
export class UsersModule { }
