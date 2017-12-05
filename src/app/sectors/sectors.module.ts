
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectorsRoutesModule } from './sectors.route.module';

import { AddComponent } from './add/add.component';
import { SectorsComponent } from './sectors.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    SectorsComponent,
    AddComponent,
    EditComponent,
    FormComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SectorsRoutesModule

  ]
})
export class SectorsModule { }
