import { Component, OnInit, Input} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { SectorService } from '../../shared/api/sector.service';

@Component({
  selector: 'app-form-sectors',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  
  @Input() editMode: boolean = false;
  

  /*Sector uuid*/
  sectorId: string;

  // promises array
	promises: Promise<any>[] = [];

  messageSave: boolean = false;

  sectorForm: FormGroup;

  constructor(public SectorService: SectorService,  public route: ActivatedRoute) { }

  ngOnInit() {    
    this.sectorForm = new FormGroup({
      name: new FormControl()
    });


    /* EDIT MODE*/
  	if(this.editMode){
  		this.route.params.subscribe( params => {
  			this.sectorId = params.id;
      });
      this.promises.push(this.getSector(this.sectorId));
  	}
  }

  save() {
  	this.SectorService.save(this.sectorForm.value)
  		.then( response => {
        this.messageSave = true;
         console.log("response", response);
  		})
  }
  
  update() {
  	delete this.sectorForm.value.password;
  	this.SectorService.update(this.sectorId, this.sectorForm.value)
  		.then( response => {
  		    console.log("response", response);
  		})
  		.catch( err => {
  			console.log(err)
  		})
  }
  getSector(uuid) {
  	return this.SectorService.findOne(uuid)
  		.then( response => { 
        this.sectorForm.reset(response.data);
        console.log("response", response);
  		})
  		.catch( err => console.log(JSON.parse(`{'error': ${err}}`)));
  }
}
