import { Component, OnInit } from '@angular/core';

import { ScrapService } from './../shared/services/api/scrap.service';
import { NotificationService } from 'ng2-notify-popup';


@Component({
  selector: 'app-scraps',
  templateUrl: './scraps.component.html',
  styleUrls: ['./scraps.component.scss']
})
export class ScrapsComponent implements OnInit {
   // array to hold users
  scraps: Array<any> = [];

   // loading object
  loading: { [key: string]: any } = {
     all: false
   };

   // promises array
  promises: Promise<any>[] = [];

  constructor(
    public ScrapService: ScrapService,
    public NotifyService: NotificationService
  ) {}

  ngOnInit() {
    this.promises.push(this.getAllScraps());
    Promise.all(this.promises)
      .then(() => {
        this.loading.all = true;
      })
      .catch(err => {
        console.error(
          ('{Code: \'500\', message: err, method: \'SectorComponent.ngOnInit()\'}')
        );
      });
  }

  getAllScraps() {
    return this.ScrapService.findAll()
      .then(response => {
        console.log('response: ', response);
        this.scraps = response.data;
        console.log('this.scraps', this.scraps);
      })
      .catch(err => {
        console.error(
          ('{Code: \'500\', message: err, method: \'ScrapsComponent.getAllScraps()\'}')
        );
      });
  }

}
