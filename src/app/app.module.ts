import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutesModule } from './routes/routes.module';
import { UsersModule } from './users/users.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SectorsComponent } from './sectors/sectors.component';
import { ScrapsComponent } from './scraps/scraps.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SectorsComponent,
    ScrapsComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
