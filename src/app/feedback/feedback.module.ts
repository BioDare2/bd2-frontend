import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedbackListComponent} from './feedback-list/feedback-list.component';
import {AlertModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [FeedbackListComponent],
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  exports: [FeedbackListComponent]
})
export class FeedbackModule {
}
