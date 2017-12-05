import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { SectorService } from './../../shared/services/api/sector.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  // Sector
  sector: { [key: string]: any };

  // uuid of sector
  sectorUuid: Observable<string>;

  // loading object
  loading: { [key: string]: any } = {
    all: false
  };

  // promises array
  promises: Promise<any>[] = [];

  /*
  * constructor
  * @param{UserService} UserService
  * @param{ActivatedRoute} route
  */
  constructor(
    public SectorService: SectorService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.route.params.map(p => p.id).subscribe(id => (this.sectorUuid = id));
    this.promises.push(this.getSector(this.sectorUuid));

    Promise.all(this.promises)
      .then(() => this.loading.all = true)
      .catch(err => {
        console.error('{Code: \'500\', message: err, method: \'DetailComponent.ngOnInit()\' }');
      });
  }

  getSector(uuid) {
    return this.SectorService.findOne(uuid, 'users')
      .then( response => {
        this.sector = response.data;
      })
      .catch( err => console.log('Error SectorDetailComponent@getSector: ', err));
  }
}
