import { SectorService } from './../shared/services/api/sector.service';
import { AuthService } from './../shared/services/auth.service';
import { NotificationService } from 'ng2-notify-popup';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/services/api/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {
  // Edit mode
  @Input() editMode = false;

  // User
  user: { [key: string]: any };

  // array to hold users
  sectors: Array<any>;

  // loading object
  loading: { [value: string]: any } = {
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
  * @param{SectorService} SectorService
  */
  constructor(
    private SectorService: SectorService,
    private NotifyService: NotificationService,
    public AuthService: AuthService,
    private router: Router
  ) {}

  /*
  * init
  */
  ngOnInit() {
    this.promises.push(this.getAllSectors());
    Promise.all(this.promises)
      .then(() => {
        this.loading.all = true;
      })
      .catch(err => {
        console.error(
          ('{Code: \'500\', message: err, method: \'SectorComponent.ngOnInit()\'}')
        );
      });
  }

  /*
  * get all sectors of the api
  */
  getAllSectors(): Promise<any> {
    return this.SectorService.findAll()
      .then(response => {
        console.log('response: ', response);
        this.sectors = response.data;
        console.log('this.sectors', this.sectors);
      })
      .catch(err => {
        console.error(
          ('{Code: \'500\', message: err, method: \'SectorsComponent.getAllSectors()\'}')
        );
      });
  }

  /*
  * Delete a sector
  */
  deleteSector(uuid) {
    if (confirm('Estas seguro de borrar el sector? esto BORRARA TODOS LOS USUARIOS DENTRO DEL SECTOR!!!')) {
      this.SectorService.destroy(uuid)
        .then(response => {
          if (response.code === 'OK') {
            this.sectors = this.sectors.filter(sector => sector.uuid !== uuid);
            this.NotifyService.show(`Sector eliminado`, {
              position: 'top',
              location: '#main-wrapper',
              duration: '2000',
              type: 'success'
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
        .catch(err => console.error(JSON.parse(`{'error': ${err}}`)));
    }
  }
  /*
  * Go to next page of the pagination
  */
  nextPage() {
    this.next += this.limit;
    this.currentPage++;
    this.getAllSectors();
  }

  /*
  * Go to previous page of the pagination
  */
  prevPage() {
    if (this.next > 0) {
      this.next -= this.limit;
      this.currentPage--;
      this.getAllSectors();
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
      this.SectorService.search(searchEntry)
        .then( response => this.sectors = response.data.sector)
        .catch(err => console.error(`{'Neighborhood Componentn@search': ${err}}`));
    }
  }

  /*
  * Reset the search to show all user when the user erase the search box
  */
  resetSearch() {
    if(this.searchString.trim().length === 0) {
      this.getAllSectors();
    }
  }
}
