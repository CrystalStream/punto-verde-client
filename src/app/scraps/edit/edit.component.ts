import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edi-scraps',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editMode = true;
  constructor() { }

  ngOnInit() {
  }

}
