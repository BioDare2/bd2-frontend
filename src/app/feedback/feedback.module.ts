import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedbackListComponent} from './feedback-list/feedback-list.component';
import {AlertModule} from 'ngx-bootstrap/alert';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FlashMessagesComponent } from './flash-messages/flash-messages.component';
import { FeedbackPanelComponent } from './feedback-panel/feedback-panel.component';

@NgModule({
  declarations: [FeedbackListComponent, FlashMessagesComponent, FeedbackPanelComponent],
  imports: [
    CommonModule,
    AlertModule,
    MatSnackBarModule
  ],
  exports: [FeedbackListComponent, FlashMessagesComponent],
  providers: [  ]
})
export class FeedbackModule {
}
