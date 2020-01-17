import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgreeCookiesComponent} from './agree-cookies/agree-cookies.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderBarComponent} from './header-bar/header-bar.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {TopBarMenuComponent} from './top-bar-menu/top-bar-menu.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {RouterModule} from '@angular/router';
import {AuthModule} from '../auth/auth.module';


@NgModule({
  declarations: [AgreeCookiesComponent, HeaderBarComponent,
    TopBarComponent, TopBarMenuComponent, WelcomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule, // for Cookie consent
    // FeedbackModule,
    AuthModule,
  ],
  exports: [
    AgreeCookiesComponent,
    HeaderBarComponent,
    // FeedbackListComponent,
    TopBarComponent
  ]
})
export class PageModule {
}
