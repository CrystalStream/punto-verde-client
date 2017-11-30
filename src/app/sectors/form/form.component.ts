import { NotificationService } from 'ng2-notify-popup';
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

  constructor(public SectorService: SectorService,  public route: ActivatedRoute, private NotifyService: NotificationService) { }

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
        if(response.code === 'CREATED'){
          this.messageSave = true;
          this.NotifyService.show(`Sector agregado`,
          {position: 'top', location: '#main-wrapper', duration: '2000', type: 'error'});
        }
        else{
          this.NotifyService.show(`Error al agregar`,
          { position: 'top', location: '#main-wrapper', duration: '2000', type: 'error' });
        }
      })
      .catch( err => {
  			console.log(err)
  		})
  }
  
  update() {
  	delete this.sectorForm.value.password;
  	this.SectorService.update(this.sectorId, this.sectorForm.value)
  		.then( response => {
        if(response.code === 'OK'){
          this.NotifyService.show(`Sector editado`,
          {position: 'top', location: '#main-wrapper', duration: '2000', type: 'error'});
        }
        else{
          this.NotifyService.show(`Error al actualizar`,
          { position: 'top', location: '#main-wrapper', duration: '2000', type: 'error' });
        }
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
