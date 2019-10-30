import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../../auth/user.service';
import {BD2User} from '../../auth/user.dom';

@Component({
  selector: 'bd2-header-bar',
  changeDetection: ChangeDetectionStrategy.OnPush, // manually handling to improve performance
  template: `
    <div class="header-bar">
      <div *ngIf="isJumbo" class="jumbotron">
        <div class="container">
          <h1>BioDare2
            <!--<small>beta</small>-->
          </h1>
          <p>Fast period analysis, timeseries processing and aesthetic visualizations</p>
          <p><a *ngIf="!logged" routerLink="/account/register" class="btn btn-primary btn-lg" role="button">Register
            &raquo;</a>
          </p>
        </div>
      </div>
      <div *ngIf="!isJumbo" class="bd2-page-header">
        <div class="container">
          <h1>BioDare2
            <!--<small>beta</small>-->
          </h1>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HeaderBarComponent implements OnInit, OnDestroy {

  logged: boolean;
  isJumbo: boolean;

  user: BD2User;

  private userSubscription: Subscription;

  constructor(private userService: UserService, private changeDetector: ChangeDetectorRef) {

  }

  ngOnInit() {

    this.userSubscription = this.userService.currentUser$
      .subscribe(
        user => {
          // console.log("HD User changed: "+user.login)
          this.user = user;
          this.logged = !user.anonymous;
          this.isJumbo = !this.logged;
          // cause we do manual checks for performance reasons.
          this.changeDetector.markForCheck(); // manually handling to improve performance
        },
        err => console.log('User stream err: ' + err),
        () => console.log('UserStream completed')
      );

  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

  }

}
