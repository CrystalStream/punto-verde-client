import { Component, OnInit } from '@angular/core';

import { SectorService } from '../shared/api/sector.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {

	 // array to hold users
  sectors: [{[value: string]: any}];

  // loading object
  loading: {[value: string]: any} = {
    all: false,
  };

  // promises array
  promises: Promise<any>[] = [];

  constructor(public SectorService: SectorService) { }

  ngOnInit() {
  	this.promises.push(this.getAllSectors());
  	Promise.all(this.promises)
      .then(() => {
        this.loading.all = true;
      })

  }

  getAllSectors(): Promise<any> {
  	return this.SectorService.findAll()
  		.then( response => {
  			this.sectors = response.data;
  			console.log("this.sectors", this.sectors);
  		})

  }

}
