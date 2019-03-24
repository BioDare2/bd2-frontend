import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FeedbackMessage, FeedbackMessageType} from './feedback.dom';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  debug = true;
  private messageIds = 1;
  private messageStream = new Subject<FeedbackMessage>();

  constructor() {
  }

  get message$(): Observable<FeedbackMessage> {
    return this.messageStream;
  }

  info(msg: string | any): FeedbackMessage {

    const feed = new FeedbackMessage(this.messageIds++, FeedbackMessageType.INFO, msg.message || msg);
    this.messageStream.next(feed);
    return feed;
  }

  success(msg: string | any): FeedbackMessage {

    const feed = new FeedbackMessage(this.messageIds++, FeedbackMessageType.SUCCESS, msg.message || msg);
    this.messageStream.next(feed);
    return feed;
  }

  error(msg: string | any): FeedbackMessage {
    if (this.debug) {
      console.log('ERROR MSG: ' + msg + (msg && msg.message ? (';\n' + msg.message) : ''));
    }

    const feed = new FeedbackMessage(this.messageIds++, FeedbackMessageType.ERROR, msg.message || msg);
    this.messageStream.next(feed);
    return feed;

  }

}
