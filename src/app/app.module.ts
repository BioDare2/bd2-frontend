import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BootstrapRootModule} from './page/bootstrap.modules';
import {PageModule} from './page/page.module';
import {BioDareEndPoints, bioDareRestConfigurator} from './backend/biodare-rest.dom';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {FeedbackModule} from './feedback/feedback.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {StaticContentModule} from './documents/static-content/static-content.module';
const endPoints: BioDareEndPoints = bioDareRestConfigurator(environment);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BootstrapRootModule,
    MatSidenavModule,
    StaticContentModule,
    PageModule,
    FeedbackModule,
    AppRoutingModule
  ],
  providers: [
    {provide: BioDareEndPoints, useValue: endPoints}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
