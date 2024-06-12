import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedbackListComponent} from './feedback-list/feedback-list.component';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import {FlashMessagesComponent} from './flash-messages/flash-messages.component';
import {FeedbackPanelComponent} from './feedback-panel/feedback-panel.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';

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
