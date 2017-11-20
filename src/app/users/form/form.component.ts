import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/api/user.service';
import { SectorService } from '../../shared/api/sector.service';
import { NotificationService } from 'ng2-notify-popup';

declare var $: any;

@Component({
  selector: 'app-form-users',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  // Edit mode
  @Input() editMode: boolean = false;

  // Sectors array
  sectors: [{ [key: string]: any }];

  // user uuid
  userId: string;

  // promises array
  promises: Promise<any>[] = [];

  // userForm FormGroup
  userForm: FormGroup;

  // Default password value
  DEFAULT_PASSWORD: string = 'default123';

  /*
  * constructor
  * @param{UserService} UserService
  * @param{SectorService} SectorService
  * @param{ActivatedRoute} route
  * @param{Router} router
  */
  constructor(
    public UserService: UserService,
    public SectorService: SectorService,
    public route: ActivatedRoute,
    public router: Router,
    private NotifyService: NotificationService
  ) {}

  /*
  * init
  */
  ngOnInit() {
    // init foundation js
    $(document).foundation();

    // Create the form
    this.userForm = new FormGroup({
      role: new FormControl('regular', Validators.required),
      rfc: new FormControl(),
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      age: new FormControl(),
      genre: new FormControl(),
      sector: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

    /* EDIT MODE*/
    if (this.editMode) {
      this.route.params.subscribe(params => {
        this.userId = params.id;
      });
      this.promises.push(this.getUser(this.userId));
    }

    this.promises.push(this.getAllSectors());

    Promise.all(this.promises)
      .then(response => console.log('response', response))
      .catch(err => console.error(JSON.parse(`{'error': ${err}}`)));

    // Change the validators depending on the role
    this.checkValidators();
  }

  /*
  * Creates an user
  */
  save() {
    if (this.userForm.valid) {
      this.UserService
        .save(this.userForm.value)
        .then(response => {
          if (response.code === 'CREATED') {
            // redirect to /users and show a notification
            this.router.navigateByUrl('/users');
          } else {
            // Show the alert.
          }
        })
        .catch(err => console.error(JSON.parse(`{'error': ${err}}`)));
    } else {
      this.NotifyService.show('ERROR. Porfavor corrigue los datos e intentalo de nuevo!.',
        { position: 'top', location: '#main-wrapper', duration: '2200', type: 'error' });
    }
  }

  /*
  * update an user
  */
  update() {
    delete this.userForm.value.password;
    this.UserService
      .update(this.userId, this.userForm.value)
      .then(response => {
        if (response.code === 'OK') {
          // redirect to /users and show a notification
          this.router.navigateByUrl('/users');
        } else {
          // Show the alert.
        }
      })
      .catch(err => console.log(JSON.parse(`{'error': ${err}}`)));
  }

  /*
  * Get all the sectors from the API
  */
  getAllSectors() {
    return this.SectorService
      .findAll()
      .then(response => (this.sectors = response.data))
      .catch(err => console.error('error', err));
  }

  /*
  * check if the user to be add is regular
  */
  isRegularUser() {
    return this.userForm.value.role === 'regular';
  }

  /*
  * check if the user to be add is admin
  */
  isAdmin() {
    return this.userForm.value.role === 'admin';
  }

  /*
  * Get user by the given uuid and set it to the form object
  * @param{string} uuid
  */
  getUser(uuid) {
    return this.UserService
      .findOne(uuid)
      .then(response => this.userForm.reset(response.data))
      .catch(err => console.error(JSON.parse(`{'error': ${err}}`)));
  }

  /*
  * Apply different validators depending on the user role
  */
  checkValidators() {
    this.userForm.get('role').valueChanges.subscribe((role: string) => {
      if (role === 'admin') {
        this.userForm.get('rfc').setValidators(null);
        this.userForm.get('sector').setValidators(null);
        this.userForm.get('address').setValidators(null);
      } else if (role === 'company') {
        this.userForm.get('rfc').setValidators([Validators.required]);
        this.userForm.get('sector').setValidators([Validators.required]);
        this.userForm.get('address').setValidators([Validators.required]);
      } else {
        this.userForm.get('rfc').setValidators(null);
        this.userForm.get('sector').setValidators([Validators.required]);
        this.userForm.get('address').setValidators([Validators.required]);
      }
      this.userForm.get('rfc').updateValueAndValidity();
    });
  }

  /*
  * Set the default password for the user that is going to be created.
  * NOTE: This method should be removed for regular user. In that case, the user
  * should recieve an email and set his password.
  * @param{Boolean} goDefault
  */
  setDefaultPassword(goDefault: boolean) {
    if (goDefault) {
      this.userForm.controls['password'].setValue(this.DEFAULT_PASSWORD);
      this.userForm.controls['password'].disable();
    } else {
      this.userForm.controls['password'].setValue(null);
      this.userForm.controls['password'].enable();
    }
  }

  /*
  * Check the limit of the rfc input to prevent limit.
  * @param{any} e
  */
  checkRFCLimit(e: any) {
    if ( e.target.value.length > 13 ) {
      e.preventDefault();
    }
  }
}
