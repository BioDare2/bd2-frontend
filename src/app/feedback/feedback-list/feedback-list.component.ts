import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FeedbackMessage, FeedbackMessageType} from '../feedback.dom';
import {Subscription} from 'rxjs';
import {FeedbackService} from '../feedback.service';
import {removeItemFromArr} from '../../shared/collections-util';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'bd2-feedback-list',
  changeDetection: ChangeDetectionStrategy.OnPush, // manually handling to improve performance
  template: `
    <div class="bd2-feedback-list">
      <alert *ngFor="let message of messages; let i = index"
             [type]="message.alertType"
             dismissible="true"
             (close)="close(message)">
        {{ message?.message }}
      </alert>
    </div>
  `,
  styles: []
})
export class FeedbackListComponent implements OnInit, OnDestroy {

  messages: FeedbackMessage[] = [];

  @Input()
  infoDelay = 10;

  @Input()
  errorDelay = 0;

  private subscription: Subscription;

  constructor(private feedbacks: FeedbackService, private changeDetector: ChangeDetectorRef,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.subscription = this.feedbacks.message$.subscribe(
      message => this.addMessage(message)
    );

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addMessage(message: FeedbackMessage) {
    if (message && message.message) {
      this.messages.push(message);
      this.changeDetector.markForCheck(); // manually handling to improve performance
      let delay = 0;
      if (message.type === FeedbackMessageType.INFO || message.type === FeedbackMessageType.SUCCESS) {
        delay = this.infoDelay * 1000;
      }
      if (message.type === FeedbackMessageType.ERROR) {
        delay = this.errorDelay * 1000;
      }

      message.timeout = delay;

      if (delay > 0) {
        setTimeout(() => this.close(message), delay);
      }

      this.snackBar.open(message.message + message.message +message.message , '',
        {announcementMessage: 'Error', duration: 100*1000, panelClass: 'info'});

    }
  }

  close(message: FeedbackMessage) {
    removeItemFromArr(message, this.messages);
    this.changeDetector.markForCheck(); // manually handling to improve performance
  }

}
