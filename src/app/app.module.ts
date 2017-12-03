import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutesModule } from './routes/routes.module';
import { UsersModule } from './users/users.module';
import { SectorsModule } from './sectors/sectors.module';
import { ScrapsModule } from './scraps/scraps.module';
import { HomeModule } from './home/home.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgNotifyPopup } from 'ng2-notify-popup';
import { NotificationService } from 'ng2-notify-popup';


import { UserService } from './shared/services/api/user.service';
import { SectorService } from './shared/services/api/sector.service';
import { ImageService } from './shared/services/api/image.service';
import { AppComponent } from './app.component';
import { CloudinaryPipe } from './shared/pipes/cloudinary.pipe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    NgNotifyPopup,
    RoutesModule,
    UsersModule,
    SectorsModule,
    ScrapsModule,
    HomeModule
  ],
  providers: [UserService, SectorService, NotificationService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
