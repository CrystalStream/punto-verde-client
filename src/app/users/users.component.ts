import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/api/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;
  constructor(private UserService: UserService) { }

  ngOnInit() {
  	this.UserService.findAll()
  		.then( (response: any) => {
        this.users = response.data
        console.log("this.users", this.users);
  		})

  }

}
