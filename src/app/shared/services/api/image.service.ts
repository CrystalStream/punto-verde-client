import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { BaseApiService } from '../base.api.service';

import { environment } from '../../../../environments/environment';

@Injectable()
export class ImageService extends BaseApiService {

  /*
  * Constructor
  * @param{Http} http
	*/
  constructor(public http: Http) {
    super(http);
  }

  /*
	* Get base url
	*/
  getBaseUrl() {
    return `${environment.baseUrl}images`;
  }

}
