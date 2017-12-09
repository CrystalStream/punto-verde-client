import { Injectable } from '@angular/core';

/*
*	Storage service class
*/
@Injectable()
export class StorageService {

  constructor() { }

  /*
  * Returns the item of the given key
  * @param {string} key
  */
  getItem(key: string) {
      return localStorage.getItem(key);
  }

  /*
  * Set an item to localStorage
  * @param {string} key
  * @param {string} body
  */
  setItem(key: string, body: string) {
    localStorage.setItem(key, body);
  }

  /*
  * Returns the current user
  * @param {string} key
  * @param {string} user
  */
  getCurrentUser() {
    return localStorage.getItem('currentUser');
  }



}
