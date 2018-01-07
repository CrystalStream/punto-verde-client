import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { environment } from './../../../../environments/environment';
import { NeighborhoodService } from './../../../shared/services/api/neighborhood.service';
import { SectorService } from './../../../shared/services/api/sector.service';
import { NotificationService } from 'ng2-notify-popup';

// for jquery
declare var $: any;

@Component({
  selector: 'app-form-neighborhoods',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  // Edit mode
  @Input() editMode = false;

  // Neighborhoods array
  neighborhoods: [{ [key: string]: any }];

  // Sectors array
  sectors: [{ [key: string]: any }];

  // neighborhood uuid
  neighborhoodId: string;

  // Neighborhood sectors
  sectorsA: Array<any> = [];

  // promises array
  promises: Promise<any>[] = [];

  // neighborhoodForm FormGroup
  neighborhoodForm: FormGroup;

  // Notification error message
  notificationError: object = { position: 'top', location: '#main-wrapper', duration: '2200', type: 'error' };

  // Notification success message
  notificationSuccess: object = { position: 'top', location: '#main-wrapper', duration: '2200', type: 'success' };

  /*
  * constructor
  * @param{NeighborhoodService} NeighborhoodService
  * @param{ActivatedRoute} route
  * @param{Router} router
  */
  constructor(
    public NeighborhoodService: NeighborhoodService,
    public SectorService: SectorService,
    public route: ActivatedRoute,
    public router: Router,
    private NotifyService: NotificationService,
  ) { }

  /*
  * init
  */
  ngOnInit() {
    // Create the form
    this.neighborhoodForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      sector: new FormControl(null, Validators.required),
      active: new FormControl(false),
    });
    
    this.promises.push(this.getAllSectors());

    /* EDIT MODE*/
    if (this.editMode) {
      this.route.params.subscribe(params => {
        this.neighborhoodId = params.id;
      });
      this.promises.push(this.getNeighborhood(this.neighborhoodId));
    }
  }
  /*
  * Creates an user
  */
  save() {
    if (this.neighborhoodForm.valid) {
      this.NeighborhoodService
        .save(this.neighborhoodForm.value)
        .then(response => {
          if (response.code === 'CREATED') {
            // redirect to /neighborhoods and show a notification
            this.router.navigateByUrl('/neighborhoods');
            this.NotifyService.show(`Colonia agregada correctamente`, this.notificationSuccess);
          } else {
            this.NotifyService.show(`ERROR (${response.code}) - ${response.statusText}`, this.notificationError);
          }
        })
        .catch(err => console.error('Error: FormComponent@save: ', err));
    } else {
      this.NotifyService.show('ERROR. Porfavor corrigue los datos e intentalo de nuevo!.', this.notificationError);
    }
  }

  /*
  * update an neighborhood
  */
  update() {
    delete this.neighborhoodForm.value.password;
    this.NeighborhoodService
      .update(this.neighborhoodId, this.neighborhoodForm.value)
      .then(response => {
        if (response.code === 'OK') {
          this.router.navigateByUrl('/neighborhoods');
          this.NotifyService.show(`Colonia actualizada correctamente`, this.notificationSuccess);
        } else {
          this.NotifyService.show(`ERROR (${response.code}) - ${response.statusText}`, this.notificationError);
        }
      })
      .catch(err => console.log('Error: FormComponent@update: ', err));
  }

  getNeighborhood(uuid) {
    return this.NeighborhoodService.findOne(uuid, 'sector')
      .then(response => {
        this.neighborhoodForm.reset(response.data)
      })
      .catch(err => console.error(`{'error': ${err}}`));
  }

  getAllSectors(){
    return this.SectorService
    .findAll()
    .then( response => (this.sectors = response.data))
    .catch( err => console.error('Error', err));
  }
}
