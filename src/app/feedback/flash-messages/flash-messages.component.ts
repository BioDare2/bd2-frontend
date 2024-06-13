import {Component, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FeedbackService} from '../feedback.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FeedbackMessage, FeedbackMessageType} from '../feedback.dom';

/**
 * The component has not template as all the rendering is done via SnackBar service.
 * In principle it could be a service as well that subscribes to the messages, but
 * when I try it like that than it was a problem with creation of the service.
 * The AppComponent had to have a constructor with dependency on that service (even if it was 'providedIn: root)).
 * I believe an explicit compoenent on the template better reflects the idea why the messages are rendered.
 */
@Component({
  selector: 'bd2-flash-messages',
  template: ``,
  styles: []
})
export class FlashMessagesComponent implements OnInit, OnDestroy {

  @Input()
  infoDelay = 4;

  @Input()
  errorDelay = 8;

  private subscription: Subscription;

  constructor(private feedbacks: FeedbackService,
              private snackBar: MatSnackBar) {

  }
  ngOnInit() {
    this.subscription = this.feedbacks.message$.subscribe(
      message => this.showMessage(message)
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showMessage(message: FeedbackMessage) {
    if (message && message.message) {
      let duration = this.infoDelay * 1000;
      let panelClass = 'flash-info';

      if (message.type === FeedbackMessageType.ERROR) {
        duration = this.errorDelay * 1000;
        panelClass = 'flash-error';
      }
      //console.log("snackCalled", message)

      /* settign colors of messages by applying styles does not work with new material
      https://github.com/angular/components/issues/26928

       */
      this.snackBar.open(message.message, 'X', {duration: duration, panelClass: panelClass, verticalPosition: 'top'});

    }
  }


}
