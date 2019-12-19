import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedbackListComponent} from './feedback-list/feedback-list.component';
import {AlertModule} from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [FeedbackListComponent],
  imports: [
    CommonModule,
    AlertModule
  ],
  exports: [FeedbackListComponent]
})
export class FeedbackModule {
}
