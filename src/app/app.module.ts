import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageModule} from './page/page.module';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {BioDareEndPoints, bioDareRestConfigurator} from './backend/biodare-rest.dom';
import {AccountModule} from './account/account.module';
import {ModalModule} from "ngx-bootstrap/modal";

const endPoints: BioDareEndPoints = bioDareRestConfigurator(environment);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    PageModule,
    // AccountModule,
    // DocumentsModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: BioDareEndPoints, useValue: endPoints}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
