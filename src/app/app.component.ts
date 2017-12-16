import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Check if the user is logged in
  isUserLoggedIn = false;

  constructor(public AuthService: AuthService) {}

  ngOnInit() {
    // check for user
    // this.checkUserLogin();

    // subscribe to the isLogin event.
    this.AuthService.isLogin.subscribe( (isLogin: boolean) => {
      this.isUserLoggedIn = isLogin;
    });
  }

  /*
  * Check if there's any user logged in in the system.
  */
  checkUserLogin() {
    this.isUserLoggedIn = this.AuthService.isUserLoggedIn();
  }

}
