import {Injectable, Optional, SkipSelf} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {merge, Observable, Subject, Subscription} from 'rxjs';
// import {UserService} from '../auth/user.service';
import {distinctUntilChanged, filter} from 'rxjs/operators';

declare let gtag: Function;

class AnalEvent {
  constructor(public category: string,
              public action: string,
              public label: string) {
  }

  /* tslint:disable:curly */
  equals(other: AnalEvent): boolean {
    if (this.label !== other.label) return false;
    if (this.action !== other.action) return false;
    if (this.category !== other.category) return false;
    return true;
  }

  /* tslint:enable:curly */
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  experimentStream: Subject<AnalEvent> = new Subject<AnalEvent>();
  ppaStream: Subject<AnalEvent> = new Subject<AnalEvent>();
  rhythmicityStream: Subject<AnalEvent> = new Subject<AnalEvent>();
  userStream: Subject<AnalEvent> = new Subject<AnalEvent>();
  dataStream: Subject<AnalEvent> = new Subject<AnalEvent>();
  fileStream: Subject<AnalEvent> = new Subject<AnalEvent>();

  events: Observable<AnalEvent>;
  eventsSubscription: Subscription;


  constructor(private router: Router,
              // private userService: UserService,
              @Optional() @SkipSelf() other: AnalyticsService) {

    console.log('Analytics created');

    if (other) {
      throw new Error(
        'AnalyticsService is already loaded. Activate it in the AppModule only');
    }

    if (!gtag) {
      throw new Error('Missing global gtag function');
    }

    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged((previous: NavigationEnd, current: NavigationEnd) => {
        return previous.url === current.url;
      })
    ).subscribe({
      next: (x: NavigationEnd) => {
        // console.log('router.change', x);
        gtag('event', 'page_view', {
            page_path: x.urlAfterRedirects,
            // page_location: this.document.location.href
        })
      },
      error: err => {
        console.log('Error in router streem');
      },
      complete: () => console.log('Router streem end')
    }
    );

    this.events = this.initEventsObservable();

    this.eventsSubscription = this.events.subscribe( {
      next: (event) => {
        // console.log("ga",event);
        gtag('event', event.action, {
          'event_category': event.category,
          'event_label': event.label});
      },
      error: (err) => console.error('Events error: ', err),
      complete: () => console.log('Events finished')
    });

  }

  public experimentView(id: number) {
    this.experimentStream.next(new AnalEvent('experiment', 'view', '' + id));
  }

  public experimentDataView(id: number) {
    this.dataStream.next(new AnalEvent('data', 'view', '' + id));
  }

  public experimentHeatmapView(id: number) {
    this.dataStream.next(new AnalEvent('data', 'heatmap', '' + id));
  }


  public experimentDataExport(id: number) {
    this.dataStream.next(new AnalEvent('data', 'export', '' + id));
  }

  public fileDownload(parentId: string, fileId: number) {
    this.fileStream.next(new AnalEvent('file', 'download', '' + parentId + ':' + fileId));
  }

  public ppaNew(method: string, id: number, login: string) {
    // this.ppaStream.next(new AnalEvent('ppa', method, this.userService.currentUser.login));
    this.ppaStream.next(new AnalEvent('ppa', method, login));
    this.ppaStream.next(new AnalEvent('ppa', method, '' + id));
  }

  public rhythmicityNew(method: string, id: number, login: string) {
    this.rhythmicityStream.next(new AnalEvent('rhythmicity', method, login));
    this.rhythmicityStream.next(new AnalEvent('rhythmicity', method, '' + id));
  }

  public userLogin(login: string) {
    this.userStream.next(new AnalEvent('user', 'login', login));
  }

  public userLoggedIn(login: string) {
    this.userStream.next(new AnalEvent('user', 'logged', login));
  }

  public userActivation(login: string) {
    this.userStream.next(new AnalEvent('user', 'activate', login));
  }

  public userRegistration(login: string) {
    this.userStream.next(new AnalEvent('user', 'register', login));
  }

  protected initEventsObservable(): Observable<AnalEvent> {

    const o1 = this.experimentStream.pipe(
      distinctUntilChanged((prev: AnalEvent, next: AnalEvent) => next.equals(prev))
    );

    const o2 = this.ppaStream;

    const o3 = this.userStream;

    const o4 = this.dataStream.pipe(
      distinctUntilChanged((prev: AnalEvent, next: AnalEvent) => next.equals(prev))
    );

    const o5 = this.fileStream.pipe(
      distinctUntilChanged((prev: AnalEvent, next: AnalEvent) => next.equals(prev))
    );

    const o6 = this.rhythmicityStream;
    return merge(o1, o2, o3, o4, o5, o6);
  }

}
