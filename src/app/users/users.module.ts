import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutesModule } from './users.routes.module';

import { UsersComponent } from './users.component';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
  	UsersComponent,
  	AddComponent,
  	DetailComponent,
  	FormComponent,
  	EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutesModule
  ]
})
export class UsersModule { }
