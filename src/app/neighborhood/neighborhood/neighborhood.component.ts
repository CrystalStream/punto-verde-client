import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../../shared/services/auth.service';
import { SectorService } from './../../shared/services/api/sector.service';
import { NeighborhoodService } from './../../shared/services/api/neighborhood.service';
import { NotificationService } from 'ng2-notify-popup';

@Component({
  selector: 'app-neighborhoods',
  templateUrl: './neighborhood.component.html',
  styleUrls: ['./neighborhood.component.scss']
})
export class NeighborhoodComponent implements OnInit {
  // array to hold neighborhoods
  neighborhoods: Array<any>;

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

  // promises array
  promises: Promise<any>[] = [];

  /*
  * constructor
  * @param{NeighborhoodService} NeighborhoodService
  */
  constructor(
    private NeighborhoodService: NeighborhoodService,
    private SectorService: SectorService,
    private NotifyService: NotificationService,
    public AuthService: AuthService,
    private router: Router
  ) {}

  /*
  * init
  */
  ngOnInit() {
    this.promises.push(this.getAllNeighborhoods());
    Promise.all(this.promises)
      .then(() => {
        this.loading.all = true;
      })
      .catch(err => {
        console.error(
          `{Code: 500, message: ${err}, method: NeighborhoodComponent.ngOnInit()}`
        );
      });
  }

  /*
  * Get all the users from the API.
  */
  getAllNeighborhoods(): Promise<any> {
    return this.NeighborhoodService.findAll({}, this.limit, this.next, 'name ASC', 'sector')
      .then((response: any) => {
        this.neighborhoods = response.data;
        console.log(this.neighborhoods)
        this.willPaginate = response.total > this.limit;
        if (this.willPaginate) {
          this.totalPages = Math.ceil(response.total / this.limit);
          this.showNext = this.currentPage + 1 <= this.totalPages;
        }
      })
      .catch(err => {
        console.error(
          `{Code: 500, message: ${err}, method: NeighborhoodComponent.getAllNeighborhoods()}`
        );
      });
  }  
  

  /*
  * Delete a user by the given uuid
  * @param{string} uuid
  */
  deleteNeighborhood(uuid) {
    this.NeighborhoodService.destroy(uuid)
      .then(response => {
        if (response.code === 'OK') {
          this.neighborhoods = this.neighborhoods.filter(neighborhood => neighborhood.uuid !== uuid);
          this.NotifyService.show(`Colonia eliminada`, {
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
    this.getAllNeighborhoods();
  }

  /*
  * Go to previous page of the pagination
  */
  prevPage() {
    if (this.next > 0) {
      this.next -= this.limit;
      this.currentPage--;
      this.getAllNeighborhoods();
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
      }
      this.NeighborhoodService.search(searchEntry)
        .then( response => this.neighborhoods = response.data.neighborhood)
        .catch(err => console.error(`{'Neighborhood Componentn@search': ${err}}`));
    }
  }

  /*
  * Reset the search to show all user when the user erase the search box
  */
  resetSearch() {
    if(this.searchString.trim().length === 0) {
      this.getAllNeighborhoods();
    }
  }
}
