import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseApiService } from '../base.api.service';
import { environment } from '../../../environments/environment';

/*
*	User service class
*/
@Injectable()
export class UserService extends BaseApiService {

	/*
	* constructor
  * @param{Htpp} http
	*/
  constructor(public http: Http) { 
  	super(http) 
  }

  /*
	* Get base url
	*/
  getBaseUrl(){
  	return `${environment.baseUrl}users/`
  }


}
