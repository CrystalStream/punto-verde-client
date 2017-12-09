import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { StorageService } from './../../shared/services/storage.service';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // userForm FormGroup
  loginForm: FormGroup;

  // Error on login
  errorLogin = {
    hasError: false,
    message: ''
  };

  // Check if the user hits the login button
  logging = false;

  constructor(
    public AuthService: AuthService,
    public StorageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    // Create the login form
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  /**
   * Login.
   */
  login() {
    if (!this.logging) {
      this.logging = true;
      this.AuthService.login(this.loginForm.value)
        .then(response => {
          if (response.code === 'OK') {
            this.errorLogin.hasError = false;
            this.StorageService.setItem(
              'currentUser',
              `{"name": "${response.data.user.name}",
                  "email": "${response.data.user.email}"}`
            );
            this.StorageService.setItem('token', response.data.token);
            this.AuthService.isLogin.emit(true);
            this.router.navigate(['/home']);
          } else {
            this.errorLogin.hasError = true;
            this.errorLogin.message =
              'Ocurrio un error. Porfavor contacta al administrador.';
            console.error('LoginComponent@login :', response);
          }
          this.logging = false;
        })
        .catch(err => {
          this.logging = false;
          this.errorLogin.hasError = true;
          this.errorLogin.message = `No tenemos registro de un usuario con esas credenciales.
            Porfavor intentalo de nuevo`;
          console.error('LoginComponent@login: ', err);
        });
    }
  }
}
