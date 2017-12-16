import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { BaseApiService } from '../base.api.service';
import { AuthService } from '../auth.service';

import { environment } from '../../../../environments/environment';

@Injectable()
export class ScrapService extends BaseApiService {

  // Model for the search.
  model = 'scrap';

  /*
  * Constructor
  * @param{Http} http
	*/
  constructor(public http: Http, public AuthService: AuthService) {
    super(http, AuthService);
  }

  /*
	* Get base url
	*/
  getBaseUrl() {
    return `${environment.baseUrl}scraps`;
  }

}
