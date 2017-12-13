import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseApiService } from '../base.api.service';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth.service';


/*
*	Sectors service class
*/
@Injectable()
export class SectorService extends BaseApiService{

  // Model for the search.
  model = 'sector';

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
    return `${environment.baseUrl}sectors`;
  }


}
