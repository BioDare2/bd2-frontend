import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BD2User} from './user.dom';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userStream: BehaviorSubject<BD2User>;
  private user: BD2User;

  constructor() {

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
