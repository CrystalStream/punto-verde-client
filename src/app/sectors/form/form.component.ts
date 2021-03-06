import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UserService } from './../../shared/services/api/user.service';
import { SectorService } from '../../shared/services/api/sector.service';
import { NotificationService } from 'ng2-notify-popup';

declare var $: any;

@Component({
  selector: 'app-form-sectors',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  // Edit mode
  @Input() editMode = false;

  /*Sector uuid*/
  sectorId: string;

  // promises array
  promises: Promise<any>[] = [];

  sectorForm: FormGroup;

  // Notification error message
  notificationError: object = {
    position: 'top',
    location: '#main-wrapper',
    duration: '2200',
    type: 'error'
  };

  // Notification success message
  notificationSuccess: object = {
    position: 'top',
    location: '#main-wrapper',
    duration: '2200',
    type: 'success'
  };

  constructor(
    public SectorService: SectorService,
    public route: ActivatedRoute,
    public router: Router,
    private NotifyService: NotificationService
  ) {}

  ngOnInit() {

    this.sectorForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    /* EDIT MODE*/
    if (this.editMode) {
      this.route.params.subscribe(params => {
        this.sectorId = params.id;
      });
      this.promises.push(this.getSector(this.sectorId));
    }
  }

  /*
  * Creates a sector
  */
  save() {
    if (this.sectorForm.valid) {
      this.SectorService.save(this.sectorForm.value)
        .then(response => {
          if (response.code === 'CREATED') {
            // redirect to /sectors and show a notification
            this.router.navigateByUrl('/sectors');
            this.NotifyService.show('Sector agregado correctamente', this.notificationSuccess);
          } else {
            this.NotifyService.show(
              `ERROR (${response.code}) - ${response.statusText}`,
              this.notificationError
            );
          }
        })
        .catch(err => {
          const errorDetail = JSON.parse(err._body);
          if ( errorDetail.data.hasOwnProperty('name') ) {
            errorDetail.data.name.forEach( error => {
              if ( error.rule === 'unique' ) {
                this.NotifyService.show('ERROR. Ya existe un sector con ese nombre!', this.notificationError);
              }
            });
          }
        });
    } else {
      this.NotifyService.show(
        'ERROR. Porfavor corrigue los datos e intentalo de nuevo!.',
        this.notificationError
      );
    }
  }

  update() {
    delete this.sectorForm.value.password;
    this.SectorService.update(this.sectorId, this.sectorForm.value)
      .then(response => {
        if (response.code === 'OK') {
          // redirect to /sectors and show a notification
          this.router.navigateByUrl('/sectors');
          this.NotifyService.show('Sector actualizado correctamente', this.notificationSuccess);
        } else {
          this.NotifyService.show(
            `ERROR (${response.code}) - ${response.statusText}`,
            this.notificationError
          );
        }
      })
      .catch(err => console.log(`{'error': ${err}}`));
  }

  getSector(uuid) {
    return this.SectorService.findOne(uuid)
      .then(response => this.sectorForm.reset(response.data))
      .catch(err => console.error(`{'error': ${err}}`));
  }
}
