import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FeedbackMessage, FeedbackMessageType} from '../feedback.dom';
import {Subscription} from 'rxjs';
import {FeedbackService} from '../feedback.service';
import {removeItemFromArr} from '../../shared/collections-util';

@Component({
  selector: 'bd2-feedback-list',
  changeDetection: ChangeDetectionStrategy.OnPush, // manually handling to improve performance
  template: `
    <div class="bd2-feedback-list">
      <mat-card appearance="outlined" *ngFor="let message of messages; let i = index"
         class="mat-elevation-z4 mb-2 word_wrapping"
            [class.success]="message.isSuccess()"
            [class.error]="message.isError()"
            [class.info]="message.isInfo()"
      >
        <button (click)="close(message)" class="float-right close" aria-label="Close">
          <span aria-hidden="true">×</span><span class="sr-only">Close</span>
        </button>
        {{ message?.message }}
      </mat-card>
    </div>
  `,
  styles: []
})
export class FeedbackListComponent implements OnInit, OnDestroy {

  messages: FeedbackMessage[] = [];

  @Input()
  infoDelay = 30;

  @Input()
  errorDelay = 120;

  private subscription: Subscription;

  constructor(private feedbacks: FeedbackService, private changeDetector: ChangeDetectorRef) {
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
      this.messages.unshift(message);
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


    }
  }

  close(message: FeedbackMessage) {
    removeItemFromArr(message, this.messages);
    this.changeDetector.markForCheck(); // manually handling to improve performance
  }

}
