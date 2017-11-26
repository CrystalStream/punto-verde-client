import { SectorService } from './../shared/services/api/sector.service';
import { UserService } from './../shared/services/api/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Sector Count
  sectorCount: number;

  // Users count
  usersCount: number;

  // Users count
  companyCount: number;

  // loading object
  loading: {[value: string]: any} = {
    all: false,
  };


  // promises array
  promises: Promise<any>[] = [];

  /**
  * constructor
  * @param {*} UserService
  * @param{SectorService} SectorService
  */
  constructor(public UserService: UserService, public SectorService: SectorService) { }

  ngOnInit() {
    this.promises.push(this.getUsersCount());
    this.promises.push(this.getSectorsCount());
    this.promises.push(this.getCompanyCount());

    Promise.all(this.promises)
      .then(() => this.loading.all = true);

  }

  /**
   * Get the sectors count.
   */
  getSectorsCount(): Promise<any> {
      return this.SectorService.count()
        .then((response) => this.sectorCount = response.data.count)
        .catch(error => console.error('ERROR: HomeComponent@getSectorsCount() :', error ));;
  }

   /**
   * Get the users count.
   */
  getUsersCount(): Promise<any> {
    return this.UserService.count()
      .then((response) => this.usersCount = response.data.count)
      .catch(error => console.error('ERROR: HomeComponent@getUsersCount() :', error ));
  }

   /**
   * Get the company count.
   */
  getCompanyCount(): Promise<any> {
    return this.UserService.count({role: 'company'})
      .then((response) => this.companyCount = response.data.count)
      .catch(error => console.error('ERROR: HomeComponent@getCompanyCount() :', error ));
  }

}
