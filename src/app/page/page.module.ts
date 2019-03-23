import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreeCookiesComponent } from './agree-cookies/agree-cookies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AgreeCookiesComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule // for Cookie consent
  ],
  exports: [AgreeCookiesComponent]
})
export class PageModule { }
