import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/api/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // array to hold users
  users: [{[key: string]: any}];

  // loading object
  loading: {[key: string]: any} = {
    all: false,
  };

  // promises array
  promises: Promise<any>[] = [];

  /*
  * constructor
  * @param{UserService} UserService
  */
  constructor(private UserService: UserService) { }

  /*
  * init
  */
  ngOnInit() {
    this.promises.push(this.getAllUsers());
    Promise.all(this.promises)
      .then(() => {
        this.loading.all = true;
      })
      .catch( err => {
        console.error(JSON.parse("{Code: '500', message: err, method: 'UsersComponent.ngOnInit()'}"))
      })
  }

  /*
  * Get all the users from the API.
  */
  getAllUsers(): Promise<any> {
    return this.UserService.findAll()
      .then( (response: any) => {
        this.users = response.data
        console.log("this.users", this.users);
      })
      .catch( err => {
        console.error(JSON.parse("{Code: '500', message: err, method: 'UsersComponent.getAllUsers()'}"))
      })
  }

}
