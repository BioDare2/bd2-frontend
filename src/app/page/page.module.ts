import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreeCookiesComponent } from './agree-cookies/agree-cookies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import {FeedbackModule} from '../feedback/feedback.module';
import {FeedbackListComponent} from '../feedback/feedback-list/feedback-list.component';

@NgModule({
  declarations: [AgreeCookiesComponent, HeaderBarComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // for Cookie consent
    FeedbackModule
  ],
  exports: [
    AgreeCookiesComponent,
    HeaderBarComponent,
    FeedbackListComponent
  ]
})
export class PageModule { }
