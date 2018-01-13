import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ScrapService } from '../../shared/services/api/scrap.service';
import { NotificationService } from 'ng2-notify-popup';

import { minValue } from '../../shared/validators/min.value';

@Component({
  selector: 'app-form-scraps',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  // Edit mode
  @Input() editMode = false;

  /*Sector uuid*/
  scrapId: string;

  // promises array
  promises: Promise<any>[] = [];

  scrapsForm: FormGroup;

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
    public ScrapService: ScrapService,
    public route: ActivatedRoute,
    public router: Router,
    private NotifyService: NotificationService
  ) {}

  ngOnInit() {

    this.scrapsForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      valuePerKg: new FormControl(null, [Validators.required, minValue(0)])
    });

    /* EDIT MODE*/
    if (this.editMode) {
      this.route.params.subscribe(params => {
        this.scrapId = params.id;
      });
      this.promises.push(this.getScrap(this.scrapId));
    }

  }


  /*
  * Creates a sector
  */
  save() {
    if (this.scrapsForm.valid) {
      console.log('this.scrapsForm.value: ', this.scrapsForm.value);
      this.ScrapService.save(this.scrapsForm.value)
        .then(response => {
          console.log('response: ', response);
          if (response.code === 'CREATED') {
            // redirect to /scraps and show a notification
            this.router.navigateByUrl('/scraps');
            this.NotifyService.show('Residuo agregado correctamente', this.notificationSuccess);
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
                this.NotifyService.show('ERROR. Ya existe un residuo con ese nombre!', this.notificationError);
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
    this.ScrapService.update(this.scrapId, this.scrapsForm.value)
      .then(response => {
        if (response.code === 'OK') {
          // redirect to /scraps and show a notification
          this.router.navigateByUrl('/scraps');
          this.NotifyService.show('Residuo actualizado correctamente', this.notificationSuccess);
        } else {
          this.NotifyService.show(
            `ERROR (${response.code}) - ${response.statusText}`,
            this.notificationError
          );
        }
      })
      .catch(err => console.log(`{'error': ${err}}`));
  }


  getScrap(uuid) {
    return this.ScrapService.findOne(uuid)
      .then(response => this.scrapsForm.reset(response.data))
      .catch(err => console.error(`{'FormComponent@getScrap error': ${err}}`));
  }

}
