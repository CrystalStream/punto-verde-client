import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationService } from 'ng2-notify-popup';
import { ScrapService } from './../../shared/services/api/scrap.service';
import { SectorService } from './../../shared/services/api/sector.service';

// Jquery
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // sectors
  sectors: Array<any> = [];

  // users
  users: Array<any> = [];

  // scraps
  scraps: Array<any> = [];

  // promises array
  promises: Promise<any>[] = [];

  // loading object
  loading: { [key: string]: any } = {
    all: false
  };

  // active sector
  activeSector = '';

  /*
  * constructor
  * @param{UserService} UserService
  * @param{ScrapService} ScrapService
  * @param{NotificationService} NotifyService
  * @param{Router} router
  */
  constructor(
    private ScrapService: ScrapService,
    private SectorService: SectorService,
    private NotifyService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.promises.push(this.getSectors());
    this.promises.push(this.getScraps());

    Promise.all(this.promises)
      .then( () => {
        if (this.sectors.length) {
          this.setActiveSector(this.sectors[0]);
          this.loading.all = true;
        }
      });
    // init foundation js
    $(document).foundation();
  }

  /*
  * Get all the sectors.
  */
  getSectors() {
    return this.SectorService.findAll({}, 10, 0, 'id ASC', 'users')
    .then( response => this.sectors = response.data)
    .catch(err => {
      console.error('Error: RegisterComponent@getSectors', err);
    });
  }

  /*
  * Get all the users related to the given sector.
  */
  getScraps() {
    return this.ScrapService.findAll()
      .then( response => this.scraps = response.data)
      .catch(err => {
        console.error('Error: RegisterComponent@getScraps', err);
      });
  }

  /*
  * Set the sector to display users..
  * @param{string} sectorId
  */
  setActiveSector(sector: any) {
    this.activeSector = sector.uuid;
    this.users = sector.users;
  }

}
