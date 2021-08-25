import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../auth/user.service';
import {Subscription} from 'rxjs';
import {BD2User} from '../../auth/user.dom';

@Component({
  templateUrl: './welcome.component.html',
  styles: [`
    .list-group-item-heading {
      font-weight: bold;
    }
  `]
})
export class WelcomeComponent implements OnInit, OnDestroy {

  msg = 'Welcome to BioDare2';

  moreFeatures = false;
  logged = false;
  subscription: Subscription;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {

    this.subscription = this.userService.currentUser$
      .subscribe(user => this.currentUser(user));

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  currentUser(user: BD2User) {
    if (!user.anonymous) {
      // let user = this.userService.currentUser;
      this.msg = 'Welcome, ' + user.firstName;
      this.logged = true;
    } else {
      this.msg = 'Welcome to BioDare2';
      this.logged = false;
    }
  }

  showMaintenance(): boolean {
    console.log("",new Date());
    return ((new Date()) < (new Date(2021, 7, 28)));
  }

}
