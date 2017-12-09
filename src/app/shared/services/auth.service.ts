import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

  /*
  * Creates an instance of AuthService.
  * @param {StorageService} StorageService
  */
  constructor(public StorageService: StorageService) {}

  /*
  * Check if the user is logged in.
  */
  isUserLoggedIn() {
    return !!this.StorageService.getCurrentUser();
  }


}
