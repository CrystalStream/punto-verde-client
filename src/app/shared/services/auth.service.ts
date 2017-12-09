import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';

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
  constructor(public StorageService: StorageService, public http: Http) {}

  /*
  * Check if the user is logged in.
  */
  isUserLoggedIn() {
    return !!this.StorageService.getCurrentUser();
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
    return new Promise((resolve, reject) => {
      this.isLogin.emit(false);
      localStorage.clear();
      resolve(true);
    })
  }
}
