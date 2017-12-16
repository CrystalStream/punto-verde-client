import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrapsRoutesModule } from './scraps.routes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScrapsComponent } from './scraps.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    ScrapsComponent,
    AddComponent,
    EditComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrapsRoutesModule
  ]
})
export class ScrapsModule { }
