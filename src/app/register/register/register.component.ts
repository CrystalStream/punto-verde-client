import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';

import { RecycleService } from './../../shared/services/api/recycle.service';
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

  // neighborhoods
  neighborhoods: Array<any> = [];

  // scraps
  scraps: Array<any> = [];

  // promises array
  promises: Promise<any>[] = [];

  // loading object
  loading: { [key: string]: any } = {
    all: false
  };

  // Either if the registration is for users or neighborhoods.
  isForUsers = true;

  // userForm FormGroup
  registerForm: FormGroup;

  // active sector
  activeSector = '';

  // Boolean to check if the form is subbmitting
  submitting = false;

  // Notification error message
  notificationError: object = { position: 'top', location: '#main-wrapper', duration: '2200', type: 'error' };

  // Notification success message
  notificationSuccess: object = { position: 'top', location: '#main-wrapper', duration: '2200', type: 'success' };

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
    private RecycleService: RecycleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      scrapKg: new FormControl(null, Validators.required),
      user: new FormControl(null, Validators.required),
      scrap: new FormControl(null, Validators.required),
      neighborhood: new FormControl(null)
    });

    this.registerForm.get('scrap').valueChanges.subscribe(scrap => {
      if (!!scrap) {
        this.registerForm.get('scrapKg').enable();
      } else {
        this.registerForm.get('scrapKg').disable();
      }
    });
    this.promises.push(this.getSectors());
    this.promises.push(this.getScraps());

    Promise.all(this.promises)
      .then( () => {
        if (this.sectors.length) {
          console.log('this.sectors: ', this.sectors);
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
    return this.SectorService.findAll({}, 10, 0, 'id ASC', 'users, neighborhoods')
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
    this.users =  sector.users.map( user => ({ name: user.name, uuid: user.uuid}));
    this.neighborhoods =  sector.neighborhoods
                                    .map( n => ({ name: n.name, uuid: n.uuid, active: n.active }))
                                    .filter( n => n.active);
    this.registerForm.reset();
  }

  register() {
    console.log('form', this.registerForm);
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
    }, 1000);
  }

  changeEntity(event) {
    this.isForUsers = !event.target.checked;
    if (this.isForUsers) {
      this.registerForm.get('user').setValidators([Validators.required]);
      this.registerForm.get('neighborhood').setValidators(null);
    } else {
      this.registerForm.get('neighborhood').setValidators([Validators.required]);
      this.registerForm.get('user').setValidators(null);
    }
    this.RecycleService.changeEndpoint(this.isForUsers);
    this.registerForm.reset();
  }
}
