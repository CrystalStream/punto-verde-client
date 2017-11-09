import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseApiService } from '../base.api.service';

import { environment } from '../../../environments/environment';

/*
*	User service class
*/
@Injectable()
export class UserService extends BaseApiService {

	/*
	* constructor
	*/
  constructor(public http: HttpClient) { 
  	super(http) 
  }

  /*
	* Get base url
	*/
  getBaseUrl(){
  	return `${environment.baseUrl}users`
  }


}
