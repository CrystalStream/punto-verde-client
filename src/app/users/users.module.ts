import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutesModule } from './users.routes.module';

import { UsersComponent } from './users.component';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
  	UsersComponent,
  	AddComponent,
  	DetailComponent
  ],
  imports: [
    CommonModule,
    UsersRoutesModule
  ]
})
export class UsersModule { }
