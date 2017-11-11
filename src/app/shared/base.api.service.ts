import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

/*
*	Base api service class
*/
@Injectable()
export abstract class BaseApiService {
	// http header
	headers: Headers;

	/*
	* constructor
	* param{Http} http service
	*/
  constructor(public http: Http) {
    this.headers = new Headers({'Content-Type': 'application/json'});
  }

	/*
	* Get base url (should be implemented on the child class)
	*/
	abstract getBaseUrl(): string;

	/*
	* Return a list of items
	* param{Object} where
	* param{Number} limit
	* param{Number} skip
	* param{Number} sort
	* param{Number} populate
	*/
	findAll(where: object = {}, limit: number = 20, skip: number = 0, sort: string = null, populate: string = null) {
		return this.http
      .get(this.getBaseUrl(), 
      	{ headers: this.headers,
      		params: {
      			where,
      			limit,
      			skip,
      			sort,
      			populate
      		} 
      	})
      .toPromise()
      .then( response => response.json() )
      .catch( err => Promise.reject(err.message || err) );
	}

	/*
	* Return a single item
	* param{string} id
	*/
	findOne(id: string) {
		return this.http
			.get(
				`${this.getBaseUrl()}/${id}`,
				{ headers: this.headers }
				)
			.toPromise()
      .then( response => response.json() )
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
      .then( response => response.json() )
      .catch( err => Promise.reject(err.message || err) );
	}

	/*
	* Destroy the resource
	* param{string} id
	*/
	destroy(id: string) {
		return this.http
			.delete(
				`${this.getBaseUrl()}/${id}`,
				{ headers: this.headers }
				)
			.toPromise()
      .then( response => response.json() )
      .catch( err => Promise.reject(err.message || err) );
	}

	/*
	* Update the resource
	* param{string} id
	* param{Object} data
	*/
	update(id: string, data: object) {
		console.log("data", data);
		return this.http
			.put(`${this.getBaseUrl()}/${id}`,
				data, 
				{ headers: this.headers })
			.toPromise()
      .then( response => response.json() )
      .catch( err => Promise.reject(err.message || err) );
	}

}