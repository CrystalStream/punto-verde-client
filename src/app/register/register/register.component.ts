import { Component, OnInit } from '@angular/core';

// Jquery
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // init foundation js
    $(document).foundation();
  }

}
