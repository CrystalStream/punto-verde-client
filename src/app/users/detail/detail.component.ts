import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { UserService } from '../../shared/services/api/user.service';

@Component({
  selector: 'app-detail-users',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  // User
  user: {[key: string]: any};

  // uuid of user
  userUuid: Observable<string>;

  // loading object
  loading: {[key: string]: any} = {
    all: false,
  };

  // User points
  userPoints = 0;

  // promises array
  promises: Promise<any>[] = [];

  /*
  * constructor
  * @param{UserService} UserService
  * @param{ActivatedRoute} route
  */
  constructor(private UserService: UserService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.params.map(p => p.id).subscribe( id => this.userUuid = id);
    this.promises.push(this.getUser(this.userUuid));

    Promise.all(this.promises)
      .then(() => {
        this.loading.all = true;
        if (this.user.points > 0) {
          const pointsInterval = setInterval( () => {
            this.userPoints ++;
            if (this.userPoints >= this.user.points) {
              clearInterval(pointsInterval);
            }
          }, 10);
        }
      })
    .catch( err => {
        // console.error(JSON.parse("{Code: '500', message: err, method: 'DetailComponent.ngOnInit()' }"))
    });
  }

  getUser(userId) {
    return this.UserService.findOne(userId, 'sector, assets')
      .then((response: any) => {
        this.user = response.data;
        console.log('this.user', this.user);
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
    this.UserService.destroy(uuid)
      .then( response => {
        console.log(response);
        this.router.navigateByUrl('/users');
      })
      .catch( err => console.error(JSON.parse(`{'error': ${err}}`)));
  }

  /*
  * Delete a user by the given uuid
  * @param{string} uuid
  */
  getGenreLabel() {
    return this.user.genre === 'men' ? 'fa fa-mars fa-fw fa-3x' : 'fa fa-venus fa-fw fa-3x';
  }

}
