import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {

    // Create the login form
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  /**
   * Login.
   */
  login() {
    console.log("fomr", this.loginForm);
  }

}
