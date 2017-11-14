import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/api/user.service';
import { SectorService } from '../../shared/api/sector.service';

@Component({
  selector: 'app-form-users',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	// Edit mode
	@Input() editMode: boolean = false;

	// Sectors array
	sectors: [{[key: string]: any}];

	// user uuid
	userId: string;

	// promises array
	promises: Promise<any>[] = [];

	// userForm FormGroup
	userForm: FormGroup;

  /*
  * constructor
  * @param{UserService} UserService
  * @param{SectorService} SectorService
  * @param{ActivatedRoute} route
  * @param{Router} router
  */
  constructor(public UserService: UserService, 
              public SectorService: SectorService, 
              public route: ActivatedRoute, 
              public router: Router) { }

  /*
  * init
  */
  ngOnInit() {
    // Create the form
  	this.userForm = new FormGroup ({
	    role: 	new FormControl('regular'),
	    rfc: 		new FormControl(),
	    name: 	new FormControl(),
	    email: 	new FormControl(),
	    age: 		new FormControl(),
	    genre: 	new FormControl(),
	    sector: new FormControl(),
	    address: new FormControl(),
	    password: new FormControl('default')
	  });


	  /* EDIT MODE*/
  	if(this.editMode){
  		this.route.params.subscribe( params => {
  			this.userId = params.id;
  		});
  		this.promises.push(this.getUser(this.userId));
  	}

	  this.promises.push(this.getAllSectors());

	  Promise.all(this.promises)
	  	.then( (response) => console.log("response", response))
      .catch( err => console.error(JSON.parse(`{'error': ${err}}`)));
  }

  /*
  * Creates an user
  */
  save() {
  	this.UserService.save(this.userForm.value)
  		.then( response => {
         if ( response.code == 'CREATED') {
           // redirect to /users and show a notification
           this.router.navigateByUrl('/users');
         } else {
           // Show the alert.
         }
      })
      .catch( err => console.error(JSON.parse(`{'error': ${err}}`)));
  }

  /*
  * update an user
  */
  update() {
  	delete this.userForm.value.password;
  	this.UserService.update(this.userId, this.userForm.value)
  		.then( response => {
        if ( response.code == 'OK') {
           // redirect to /users and show a notification
           this.router.navigateByUrl('/users');
         } else {
           // Show the alert.
         }
      })
  		.catch( err => console.log(JSON.parse(`{'error': ${err}}`)))
  }

  /*
  * Get all the sectors from the API
  */
  getAllSectors() {
  	return this.SectorService.findAll()
	  	.then( response => this.sectors = response.data )
      .catch( err => console.error("error", err));
  }

  /*
  * check if the user to be add is regular
  */
  isRegularUser() {
  	return this.userForm.value.role == 'regular';
  }

  /*
  * check if the user to be add is admin
  */
  isAdmin() {
  	return this.userForm.value.role == 'admin';
  }

  /*
  * Get user by the given uuid and set it to the form object
  * @param{string} uuid
  */
  getUser(uuid) {
  	return this.UserService.findOne(uuid)
  		.then( response => this.userForm.reset(response.data))
  		.catch( err => console.error(JSON.parse(`{'error': ${err}}`)));
  }

}
