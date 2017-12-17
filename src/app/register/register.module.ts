import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutesModule } from './register.routes.module';

import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    RegisterRoutesModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
