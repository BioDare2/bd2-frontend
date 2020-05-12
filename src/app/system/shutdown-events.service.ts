import {Injectable, OnDestroy} from '@angular/core';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {FeedbackService} from '../feedback/feedback.service';
import {Subscription, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShutdownEventsService implements OnDestroy {

  NORMAL_INTERVAL = 90;
  SHUTDOWN_INTERVAL = 20;
  isShuttingDown = false;

  statusSubscription: Subscription;

  constructor(private BD2REST: BioDareRestService, private feedback: FeedbackService) {

    this.startChecking(this.NORMAL_INTERVAL);
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }


  startChecking(interval: number) {

    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }

    this.statusSubscription = timer(interval*1000, interval*1000).pipe(
      switchMap( v => this.getStatus()),
      map( v => v.shutdown)
    ).subscribe(
      msg => this.handleStatus(msg)
    )
  }

  handleStatus(msg: string) {
    if (msg) {
      this.feedback.error(msg);
      if (!this.isShuttingDown) {
        this.isShuttingDown = true;
        this.startChecking(this.SHUTDOWN_INTERVAL);
      }
    } else {

      if (this.isShuttingDown) {
        this.isShuttingDown = false;
        this.startChecking(this.NORMAL_INTERVAL);
      }
    }
  }

  getStatus() {
    return this.BD2REST.shutdownStatus();
  }
}
