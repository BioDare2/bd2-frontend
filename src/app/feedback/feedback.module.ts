import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedbackListComponent} from './feedback-list/feedback-list.component';
import {AlertModule} from 'ngx-bootstrap/alert';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [FeedbackListComponent],
  imports: [
    CommonModule,
    AlertModule,
    MatSnackBarModule
  ],
  exports: [FeedbackListComponent]
})
export class FeedbackModule {
}
