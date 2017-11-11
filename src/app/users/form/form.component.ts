import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

	// userForm FormGroup
	userForm: FormGroup;

  constructor(public UserService: UserService, public SectorService: SectorService) { }

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

	  this.getAllSectors()
	  	.then( sectors => this.sectors = sectors );
  }

  save() {
  	this.UserService.save(this.userForm.value)
  		.then( response => {
  		   console.log("response", response);
  		})
  }

  getAllSectors() {
  	return this.SectorService.findAll()
	  	.then( response => response.data );
  }

  isRegularUser() {
  	return this.userForm.value.role == 'regular';
  }

  isAdmin() {
  	return this.userForm.value.role == 'admin';
  }

}
