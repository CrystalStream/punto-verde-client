import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SHARED_IMPORT_MODULES, SHARED_PROVIDERS } from './shared/shared.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ...SHARED_IMPORT_MODULES
  ],
  providers: [ ...SHARED_PROVIDERS ],
  bootstrap: [AppComponent]
})
export class AppModule { }
