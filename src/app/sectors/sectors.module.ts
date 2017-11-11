import { AddComponent } from './add/add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorsRoutesModule } from './sectors.route.module';

import { SectorsComponent } from './sectors.component';

@NgModule({
  declarations: [
    SectorsComponent,
    AddComponent
    
  ],
  imports: [
    CommonModule,
    SectorsRoutesModule
  ]
})
export class SectorsModule { }
