import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageModule} from './page/page.module';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {BioDareEndPoints, bioDareRestConfigurator} from './backend/biodare-rest.dom';

const endPoints: BioDareEndPoints = bioDareRestConfigurator(environment);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PageModule
  ],
  providers: [
    {provide: BioDareEndPoints, useValue: endPoints}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
