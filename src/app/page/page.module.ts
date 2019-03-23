import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreeCookiesComponent } from './agree-cookies/agree-cookies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderBarComponent } from './header-bar/header-bar.component';

@NgModule({
  declarations: [AgreeCookiesComponent, HeaderBarComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule // for Cookie consent
  ],
  exports: [
    AgreeCookiesComponent,
    HeaderBarComponent
  ]
})
export class PageModule { }
