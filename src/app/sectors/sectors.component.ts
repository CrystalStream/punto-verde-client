import { NotificationService } from 'ng2-notify-popup';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectorService } from '../shared/services/api/sector.service';
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

  haySector = false;

  // array to hold users
  sectors: Array<any>;

  // loading object
  loading: { [value: string]: any } = {
    all: false
  };

  // promises array
  promises: Promise<any>[] = [];

  /*
  * constructor
  * @param{SectorService} SectorService
  */
  constructor(
    private SectorService: SectorService,
    private NotifyService: NotificationService,
    private UserService: UserService
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
          JSON.parse('{Code: \'500\', message: err, method: \'SectorComponent.ngOnInit()\'}')
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
          JSON.parse('{Code: \'500\', message: err, method: \'SectorsComponent.getAllSectors()\'}')
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
}
