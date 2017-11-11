import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  constructor(public UserService: UserService, public SectorService: SectorService, public route: ActivatedRoute) { }

  ngOnInit() {
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
	  	.then( (response) => {
	  		console.log("response", response);
	  	})
  }

  save() {
  	this.UserService.save(this.userForm.value)
  		.then( response => {
  		   console.log("response", response);
  		})
  }

  update() {
  	delete this.userForm.value.password;
  	this.UserService.update(this.userId, this.userForm.value)
  		.then( response => {
  		    console.log("response", response);
  		})
  		.catch( err => {
  			console.log(err)
  		})
  }

  getAllSectors() {
  	return this.SectorService.findAll()
	  	.then( response => this.sectors = response.data );
  }

  isRegularUser() {
  	return this.userForm.value.role == 'regular';
  }

  isAdmin() {
  	return this.userForm.value.role == 'admin';
  }

  getUser(uuid) {
  	return this.UserService.findOne(uuid)
  		.then( response => { 
  			this.userForm.reset(response.data) 
  		})
  		.catch( err => console.log(JSON.parse(`{'error': ${err}}`)));
  }

}
