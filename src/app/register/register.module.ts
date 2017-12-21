import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutesModule } from './register.routes.module';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from '@jaspero/ng2-select';

import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    RegisterRoutesModule,
    FormsModule
  ],
  declarations: [RegisterComponent, SelectComponent]
})
export class RegisterModule { }
