import { NotificationService } from 'ng2-notify-popup';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/api/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // array to hold users
  users: Array<any>;

  // loading object
  loading: { [key: string]: any } = {
    all: false
  };

  // Limit for the query
  limit = 20;

  // next for pagination
  next = 0;
  showNext = true;

  // Current page for pagination
  currentPage = 1;

  // Total pages of the pagination
  totalPages = 1;

  // should paginate
  willPaginate = false;

  // Search string for user
  searchString: string;

  // Serach role for user
  searchRole = 'regular';

  // promises array
  promises: Promise<any>[] = [];

  /*
  * constructor
  * @param{UserService} UserService
  */
  constructor(
    private UserService: UserService,
    private NotifyService: NotificationService,
    private router: Router
  ) {}

  /*
  * init
  */
  ngOnInit() {
    this.promises.push(this.getAllUsers());
    Promise.all(this.promises)
      .then(() => {
        this.loading.all = true;
      })
      .catch(err => {
        console.error(
          `{Code: 500, message: ${err}, method: UsersComponent.ngOnInit()}`
        );
      });
  }

  /*
  * Get all the users from the API.
  */
  getAllUsers(): Promise<any> {
    return this.UserService.findAll({}, this.limit, this.next)
      .then((response: any) => {
        this.users = response.data;
        this.willPaginate = response.total > this.limit;
        if (this.willPaginate) {
          this.totalPages = Math.ceil(response.total / this.limit);
          this.showNext = this.currentPage + 1 <= this.totalPages;
        }
      })
      .catch(err => {
        console.error(
          `{Code: 500, message: ${err}, method: UsersComponent.getAllUsers()}`
        );
      });
  }

  /*
  * Delete a user by the given uuid
  * @param{string} uuid
  */
  deleteUser(uuid) {
    this.UserService.destroy(uuid)
      .then(response => {
        if (response.code === 'OK') {
          this.users = this.users.filter(user => user.uuid !== uuid);
          this.NotifyService.show(`Usuario eliminado`, {
            position: 'top',
            location: '#main-wrapper',
            duration: '2000',
            type: 'error'
          });
        } else {
          this.NotifyService.show(`Error al eliminar`, {
            position: 'top',
            location: '#main-wrapper',
            duration: '2000',
            type: 'error'
          });
        }
      })
      .catch(err => console.error(`{'error': ${err}}`));
  }

  /*
  * Go to next page of the pagination
  */
  nextPage() {
    this.next += this.limit;
    this.currentPage++;
    this.getAllUsers();
  }

  /*
  * Go to previous page of the pagination
  */
  prevPage() {
    if (this.next > 0) {
      this.next -= this.limit;
      this.currentPage--;
      this.getAllUsers();
    }
  }

  /*
  * Full text search on user name, email or RFC
  */
  search() {
    this.next = 0;
    this.currentPage = 1;
    this.willPaginate = false;
    if(this.searchString) {
      const searchEntry = {
        q: this.searchString,
        role: this.searchRole
      }
      this.UserService.search(searchEntry)
        .then( response => this.users = response.data.user)
        .catch(err => console.error(`{'UserComponentn@search': ${err}}`));
    }
  }

  /*
  * Reset the search to show all user when the user erase the search box
  */
  resetSearch() {
    if(this.searchString.trim().length === 0) {
      this.getAllUsers();
    }
  }
}
