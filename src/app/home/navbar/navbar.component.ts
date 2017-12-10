import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // Either show the navbar and the sidebar.
  @Input() isUserLoggedIn = false;

  currentUser: any;

  constructor(public AuthService: AuthService, private router: Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(this.AuthService.getUser());
  }

  /*
  * Logout
  */
  logout() {
    this.AuthService.logout().then(response => {
      this.router.navigate(['/login']);
    });
  }
}
