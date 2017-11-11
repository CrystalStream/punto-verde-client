import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutesModule } from './users.routes.module';

import { UsersComponent } from './users.component';
import { AddComponent } from './add/add.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
  	UsersComponent,
  	AddComponent,
  	FormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutesModule
  ]
})
export class UsersModule { }
