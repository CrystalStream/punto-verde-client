import { Component, OnInit } from '@angular/core';

// Jquery
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  options = [
    {
      id: '1',
      name: 'Uno'
    },
    {
      id: '2',
      name: 'Dos'
    },
    {
      id: '3',
      name: 'Tres'
    }
  ];
  constructor() { }

  ngOnInit() {
    // init foundation js
    $(document).foundation();
  }

}
