import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  // base url
  baseUrl = `${environment.baseUrl}auth/signin`;

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


  login(data: any) {
    return this.http
    .post(this.baseUrl, data)
    .toPromise()
    .then(response => response.json())
    .catch(err => Promise.reject(err.message || err));
  }
}
