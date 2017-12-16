import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';

import * as _ from 'lodash';

@Injectable()
export class AuthService {
  // base url
  baseUrl = `${environment.baseUrl}auth/signin`;

  // isLogin event Emitter to emit logins and logut's
  isLogin: EventEmitter<boolean> = new EventEmitter<boolean>();

  /*
  * Creates an instance of AuthService.
  * @param {StorageService} StorageService
  */
  constructor(public StorageService: StorageService, public http: Http, private router: Router) {}

  /*
  * Check if the user is logged in.
  */
  isUserLoggedIn() {
    return _.has(this.StorageService.getCurrentUser(), 'name');
  }

  /*
  * Return the current logged user
  */
  getUser() {
    return this.StorageService.getCurrentUser();
  }

  /*
  * Return the token
  */
  getToken() {
    return this.StorageService.getItem('token');
  }

  /*
  * Login htt request
  * @param{data} user data
  */
  login(data: any) {
    data.adminOnly = true;
    return this.http
    .post(this.baseUrl, data)
    .toPromise()
    .then(response => response.json())
    .catch(err => Promise.reject(err.message || err));
  }

  /*
  * Destroy the local storage and emit the logout event.
  */
  logout() {
    this.isLogin.emit(false);
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
