import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

	// enable the edit mode
 	editMode: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
