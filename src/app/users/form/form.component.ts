import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-users',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	@Input() editMode: boolean = false;

  constructor() { }

  ngOnInit() {
  	
  }

}
