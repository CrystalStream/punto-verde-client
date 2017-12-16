import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../shared/services/auth.service';
import { StorageService } from './../../shared/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // Either show the navbar and the sidebar.
  @Input() isUserLoggedIn = false;

  // current user info
  currentUser: any;

  constructor(public AuthService: AuthService, private router: Router, public StorageService: StorageService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(this.StorageService.getCurrentUser());
  }

  /*
  * Logout
  */
  logout() {
    this.AuthService.logout();
  }
}
