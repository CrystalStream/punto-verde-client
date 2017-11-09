import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

/*
*	Base api service class
*/
@Injectable()
export class BaseApiService {
	// http header
	headers: HttpHeaders;

	/*
	* constructor
	* param{Http} http service
	*/
  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

	/*
	* Get base url (should be implemented on the child class)
	*/
	getBaseUrl() {
		return null;
	}

	/*
	* Return a list of items
	* param{Object} where
	* param{Number} limit
	* param{Number} skip
	* param{Number} sort
	* param{Number} populate
	*/
	findAll() {
		return this.http
      .get(this.getBaseUrl(), 
      	{ headers: this.headers })
      .toPromise()
      .then( response => response )
      .catch( err => Promise.reject(err.message || err) );
	}

	/*
	* Return a list of items
	* param{string} id
	*/
	findOne(id: string) {
		return this.http
			.get(
				`${this.getBaseUrl()}${id}`,
				{ headers: this.headers }
				)
			.toPromise()
      .then( response => response)
      .catch( err => Promise.reject(err.message || err) );
	}

	/*
	* Save the resource
	* param{Object} data resource
	*/
	save(data: object) {
		return this.http
			.post(this.getBaseUrl(), 
				data, 
				{ headers: this.headers })
			.toPromise()
      .then( response => response )
      .catch( err => Promise.reject(err.message || err) );
	}

	/*
	* Destroy the resource
	* param{string} id
	*/
	destroy(id: string) {
		return this.http
			.delete(
				`${this.getBaseUrl()}${id}`,
				{ headers: this.headers }
				)
			.toPromise()
      .then( response => response )
      .catch( err => Promise.reject(err.message || err) );
	}

	/*
	* Update the resource
	* param{string} id
	* param{Object} data
	*/
	update(id: string, data: object) {
		return this.http
			.put(`${this.getBaseUrl()}${id}`,
				data, 
				{ headers: this.headers })
			.toPromise()
      .then( response => response )
      .catch( err => Promise.reject(err.message || err) );
	}

}