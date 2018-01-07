import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '@jaspero/ng2-select';

import { RegisterRoutesModule } from './register.routes.module';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    RegisterRoutesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterComponent, SelectComponent]
})
export class RegisterModule { }
