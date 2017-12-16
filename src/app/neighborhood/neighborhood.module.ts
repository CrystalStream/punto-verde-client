import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeighborhoodRoutesModule } from './neighborhood.route.module';

import { NeighborhoodComponent } from './neighborhood/neighborhood.component';

@NgModule({
  imports: [
    CommonModule,
    NeighborhoodRoutesModule
  ],
  declarations: [NeighborhoodComponent]
})
export class NeighborhoodModule { }
