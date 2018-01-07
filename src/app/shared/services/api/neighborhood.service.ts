import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseApiService } from '../base.api.service';
import { AuthService} from './../auth.service';
import { environment } from '../../../../environments/environment';


/*
*	Neighborhoods service class
*/
@Injectable()
export class NeighborhoodService extends BaseApiService { 
   
  // Model for the search.
  model = 'neighborhood';

  /*
	* constructor
	*/
  constructor(public http: Http, public AuthService: AuthService) { 
    super(http, AuthService);
  }
  
  /*
	* Get base url
	*/
  getBaseUrl(): string {
    return `${environment.baseUrl}neighborhoods`;
  }
}
