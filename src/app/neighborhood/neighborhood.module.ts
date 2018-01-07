import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { NeighborhoodRoutesModule } from './neighborhood.route.module';

import { NeighborhoodComponent } from './neighborhood/neighborhood.component';
import { AddComponent } from './neighborhood/add/add.component';
import { FormComponent } from './neighborhood/form/form.component';
import { EditComponent } from './neighborhood/edit/edit.component';
import { DetailComponent } from './neighborhood/detail/detail.component';

@NgModule({
  declarations: [
    NeighborhoodComponent, 
    AddComponent, 
    EditComponent,
    FormComponent,
    DetailComponent 
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    NeighborhoodRoutesModule,
    FormsModule
  ],
})
export class NeighborhoodModule { }
