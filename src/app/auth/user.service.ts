import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {BD2User, EmailSuitability} from './user.dom';
import {FeedbackService} from '../feedback/feedback.service';
import {AnalyticsService} from '../analytics/analytics.service';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {SystemEventsService} from '../system/system-events.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {


  private userStream: BehaviorSubject<BD2User>;
  private user: BD2User;
  private unAuthSubsription: Subscription;

  constructor(
    private BD2REST: BioDareRestService,
    private analytics: AnalyticsService,
    private feedback: FeedbackService,
    private systemEvents: SystemEventsService) {

    this.user = this.makeAnonymous();
    this.userStream = new BehaviorSubject(this.user);

    console.log('User service created');
    this.refresh();

    this.unAuthSubsription = this.systemEvents.unauthorised$.subscribe(
      res => this.refresh()
    );

  }

  ngOnDestroy(): void {
    if (this.unAuthSubsription) {
      this.unAuthSubsription.unsubscribe();
    }

    this.userStream.complete();
  }

  get currentUser(): BD2User {
    return this.user;
  }

  get currentUser$(): Observable<BD2User> {
    return this.userStream;
  }

  isLoggedIn(): boolean {
    if (!this.user || this.user.anonymous) {
      return false;
    }
    return true;
  }

  login(login: string, password: string): Promise<BD2User> {

    // making promise so login can be called without having to subscribe

    return this.BD2REST.login(login, password).pipe(
      map(user => {
        user = BD2User.deserialize(user);
        if (user.anonymous) {
          throw new Error('Login got anonymous user: ' + user.login);
        }
        return user;
      }),
      tap(user => {
          this.setUser(user);
          this.feedback.success(user.name + ', you are logged in');
          this.analytics.userLoggedIn(user.login);
        },
        err => this.handleError(err)
      )
    ).toPromise();


  }


  /* Manual promise creation
  const p = new Promise<BD2User>((resolve, reject) => {

    this.BD2REST.login(login, password).subscribe(
      user => {
        user = BD2User.deserialize(user);
        this.setUser(user);
        if (user.anonymous === false) {
          this.feedback.success(user.name + ', you are logged in');
          this.analytics.userLoggedIn(user.login);
          resolve(user);
        } else {
          this.handleError('Login got anonymous user: ' + user.login);
          reject('Login got anonymous user');
        }
      },
      e => {
        this.handleError(e);
        reject(e);
      }
    );
  });
  return p;

  */

  logout(): Promise<boolean> {

    return this.BD2REST.logout()
      .pipe(
        switchMap(_ => this.BD2REST.refreshUser()),
        tap(
          user => {
            user = BD2User.deserialize(user);
            this.setUser(user);
            this.feedback.success('You are logged out');
          }
        ),
        map(user => true)
      ).toPromise();
  }

  activate(token: string): Promise<BD2User> {

    return this.BD2REST.userActivate(token)
      .then(user => {
        user = BD2User.deserialize(user);
        this.analytics.userActivation(user.login);
        return user;
      });

  }

  requestReset(identifier: string, gRecaptchaResponse: string): Promise<string> {

    return this.BD2REST.userRequestReset(identifier, gRecaptchaResponse)
      .then(jsonObj => jsonObj.email);
  }

  resetPassword(password: string, token: string): Promise<string> {
    return this.BD2REST.userResetPassword(password, token)
      .then(jsonObj => jsonObj.login);
  }

  availableLogin(login: string): Observable<boolean> {
    return this.BD2REST.userAvailableLogin(login);
    // .then( txt => ('true' === txt));
  }

  /*isAcademicEmail(email: string): Observable<boolean> {
    return this.BD2REST.userAcademicEmail(email);
  }*/

  suitableEmail(email: string): Observable<EmailSuitability> {

    return this.BD2REST.userSuitableEmail(email);
  }

  register(user: any): Promise<BD2User> {

    return this.BD2REST.userRegister(user)
      .then(registered => {
        registered = BD2User.deserialize(registered);
        this.analytics.userRegistration(registered.login);
        return registered;
      });

  }

  update(userDsc: any): Observable<BD2User> {

    return this.BD2REST.userUpdate(userDsc)
      .pipe(
        map(user => BD2User.deserialize(user)),
        tap(
          user => {
            if (user.login === this.currentUser.login) {
              // edited myself have to update the current user
              // this.BD2REST.refreshUser().subscribe( u => this.setUser(BD2User.deserialize(u)));
              this.setUser(user);
            }
          }
        ),
      );

  }

  passwordUpdate(userDsc: any): Observable<BD2User> {

    return this.BD2REST.passwordUpdate(userDsc)
      .pipe(
        map(user => BD2User.deserialize(user)),
        tap(
          user => {
            if (user.login === this.currentUser.login) {
              // edited myself have to update the current user
              // this.BD2REST.refreshUser().subscribe( u => this.setUser(BD2User.deserialize(u)));
              this.setUser(user);
            }
          }
        ),
      );
  }

  protected refresh() {

    return this.BD2REST.refreshUser()
      .subscribe(
        user => {
          user = BD2User.deserialize(user);
          this.setUser(user);
        },
        err => this.handleError(err)
      );

  }

  protected handleError(err) {
    this.feedback.error(err);
  }

  protected setUser(user: BD2User) {
    this.user = user;
    this.userStream.next(user);
  }

  protected makeAnonymous() {
    const user = new BD2User('anonymous');
    user.anonymous = true;
    return user;
  }

}
