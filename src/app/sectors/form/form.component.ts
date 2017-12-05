import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { SectorService } from '../../shared/services/api/sector.service';

@Component({
  selector: 'app-form-sectors',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  //@Input() editMode: boolean = false;


  sectors: [{[key: string]: any}];

  //sectorId: string;

  promises: Promise<any>[] = [];

  messageSave: boolean = false;

  sectorForm: FormGroup;
  constructor(public SectorService: SectorService) { }

  ngOnInit() {
    this.sectorForm = new FormGroup({
      name: new FormControl()
    });
  }

  save() {
  	this.SectorService.save(this.sectorForm.value)
  		.then( response => {
        this.messageSave = true;
  		   console.log("response", response);
  		})
  }
}
