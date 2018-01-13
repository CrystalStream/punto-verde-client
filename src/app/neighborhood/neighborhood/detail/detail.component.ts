import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { NeighborhoodService } from '../../../shared/services/api/neighborhood.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  // Neighborhood
  neighborhood: {[key: string]: any};

  // uuid of neighborhood
  neighborhoodUuid: Observable<string>;

  // loading object
  loading: {[key: string]: any} = {
    all: false,
  };

  // Neighborhood points
  neighborhoodPoints = 0;

  // promises array
  promises: Promise<any>[] = [];

  /*
  * constructor
  * @param{NeighborhoodService} NeighborhoodService
  * @param{ActivatedRoute} route
  */
  constructor( private NeighborhoodService: NeighborhoodService, private route: ActivatedRoute, public router: Router ) { }

  ngOnInit() {      
    this.route.params.map(p => p.id).subscribe( id => this.neighborhoodUuid = id);
    this.promises.push(this.getNeighborhood(this.neighborhoodUuid));

    Promise.all(this.promises)
      .then(() => {
        this.loading.all = true;
        if (this.neighborhood.points > 0) {
          const pointsInterval = setInterval( () => {
            this.neighborhoodPoints ++;
            if (this.neighborhoodPoints >= this.neighborhood.points) {
              clearInterval(pointsInterval);
            }
          }, 10);
        }
      })
    .catch( err => {
        // console.error(JSON.parse("{Code: '500', message: err, method: 'DetailComponent.ngOnInit()' }"))
    });
  }

  getNeighborhood(neighborhoodId) {
    return this.NeighborhoodService.findOne(neighborhoodId, 'sector')
      .then((response: any) => {
        this.neighborhood = response.data;
        console.log('this.neighborhood', this.neighborhood);
      })
      .catch( err => {
        // console.error(JSON.parse("{Code: '500', message: err, method: 'DetailComponent.getUser()' }"))
      });
  }

  /*
  * Delete a user by the given uuid
  * @param{string} uuid
  */
  deleteUser(uuid) {
    this.NeighborhoodService.destroy(uuid)
      .then( response => {
        console.log(response);
        this.router.navigateByUrl('/neighborhoods');
      })
      .catch( err => console.error(JSON.parse(`{'error': ${err}}`)));
  }

}
