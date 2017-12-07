import { NgModule } from '@angular/core';
import { AuthRoutesModule } from './auth.routes.module';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutesModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
