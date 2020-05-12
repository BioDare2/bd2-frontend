import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedbackListComponent} from './feedback-list/feedback-list.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FlashMessagesComponent} from './flash-messages/flash-messages.component';
import {FeedbackPanelComponent} from './feedback-panel/feedback-panel.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [FeedbackListComponent, FlashMessagesComponent, FeedbackPanelComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  exports: [FlashMessagesComponent, FeedbackPanelComponent],
  providers: [  ]
})
export class FeedbackModule {
}
