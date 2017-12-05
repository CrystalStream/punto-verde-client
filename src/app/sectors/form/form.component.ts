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
  @Input() editMode: boolean = false;

  /*Sector uuid*/
  sectorId: string;

  // promises array
  promises: Promise<any>[] = [];

  sectorForm: FormGroup;

  constructor(
    public SectorService: SectorService,
    public route: ActivatedRoute,
    public router: Router,
    private NotifyService: NotificationService
  ) {}

  ngOnInit() {
    // init foundation js
    $(document).foundation();

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
            this.NotifyService.show(`Sector agregado`, {
              position: 'top',
              location: '#main-wrapper',
              duration: '2000',
              type: 'error'
            });
          } else {
            this.NotifyService.show(
              `ERROR (${response.code}) - ${response.statusText}`,
              {
                position: 'top',
                location: '#main-wrapper',
                duration: '2200',
                type: 'error'
              }
            );
          }
        })
        .catch(err => console.error(JSON.parse(`{'error': ${err}}`)));
    } else {
      this.NotifyService.show(
        'ERROR. Porfavor corrigue los datos e intentalo de nuevo!.',
        {
          position: 'top',
          location: '#main-wrapper',
          duration: '2200',
          type: 'error'
        }
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
          this.NotifyService.show(`Sector editado`, {
            position: 'top',
            location: '#main-wrapper',
            duration: '2000',
            type: 'error'
          });
        } else {
          this.NotifyService.show(
            `ERROR (${response.code}) - ${response.statusText}`,
            {
              position: 'top',
              location: '#main-wrapper',
              duration: '2200',
              type: 'error'
            }
          );
        }
      })
      .catch(err => console.log(JSON.parse(`{'error': ${err}}`)));
  }

  getSector(uuid) {
    return this.SectorService.findOne(uuid)
      .then(response => this.sectorForm.reset(response.data))
      .catch(err => console.error(JSON.parse(`{'error': ${err}}`)));
  }
}
