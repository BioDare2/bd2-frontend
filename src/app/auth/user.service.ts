import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {BD2User} from './user.dom';
import {FeedbackService} from '../feedback/feedback.service';
import {AnalyticsService} from '../analytics/analytics.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userStream: BehaviorSubject<BD2User>;
  private user: BD2User;

  constructor(private analytics: AnalyticsService,
              private feedback: FeedbackService) {

    this.user = this.makeAnonymous();
    this.userStream = new BehaviorSubject(this.user);
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

    const u = this.makeAnonymous();
    u.login = login;
    u.firstName = 'F'+login;
    u.lastName = login;
    u.anonymous = false;
    const l = of(u);


    const p = new Promise<BD2User>((resolve, reject) => {

      l.subscribe(
        user => {
          this.setUser(user);
          this.feedback.success(user.name + ', you are logged in');
          this.analytics.userLoggedIn(user.login);
          resolve(user);
        },
        e => {
          this.handleError(e);
          reject(e);
        }
      );
    });
    return p;
  }

  logout(): Promise<boolean> {
    const l = of(true);

    const p = new Promise<boolean>((resolve, reject) => {

      l.subscribe(
        state => {
          this.setUser(this.makeAnonymous());
          if (state) {
            this.feedback.success('You are logged out');
            this.refresh();
          }
          resolve(state);
        },
        e => {
          this.handleError(e);
          reject(e);
        }
      );
    });
    return p;

  }

  refresh(): Promise<BD2User> {

    /*
    return this.authenticationService.refreshUser()
      .then(user => {
        this.setUser(user);
        return user;
      });
    */
    return Promise.resolve(this.currentUser);
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
