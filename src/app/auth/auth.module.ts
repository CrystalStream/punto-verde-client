import { NgModule } from '@angular/core';
import { AuthRoutesModule } from './auth.routes.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutesModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
