import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseApiService } from '../base.api.service';

import { environment } from '../../../../environments/environment';


/*
*	Sectors service class
*/
@Injectable()
export class SectorService extends BaseApiService{

  /*
	* constructor
	*/
  constructor(public http: Http) {
    super(http);
  }

  /*
	* Get base url
	*/
  getBaseUrl() {
    return `${environment.baseUrl}sectors`;
  }


}
