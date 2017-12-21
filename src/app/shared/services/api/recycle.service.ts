import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { BaseApiService } from '../base.api.service';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth.service';

@Injectable()
export class RecycleService extends BaseApiService {

  // endpoint to check what model should we use.
  private _endpoint = 'recycleusers';

   // endpoint to check what model should we use.
  model = 'not';

  /*
	* constructor
	*/
  constructor(public http: Http, public AuthService: AuthService) {
    super(http, AuthService);
  }

  /*
	* Get base url
	*/
  getBaseUrl() {
    return `${environment.baseUrl}${this._endpoint}`;
  }

  /*
  * Change the endpoint based on the given parameter
  * @param {boolean} forUser
  */
  changeEndpoint(forUser: boolean) {
    this._endpoint = forUser ? 'recycleusers' : 'recycleneighborhoods';
  }

}
