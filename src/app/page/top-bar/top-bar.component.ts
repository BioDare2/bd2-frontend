import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {UserService} from '../../auth/user.service';
import {BD2User} from '../../auth/user.dom';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'bd2-top-bar',
  template: `
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" (click)="toggle()" class="navbar-toggle collapsed"
                  data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" routerLink="/" routerLinkActive="active">BioDare2</a>
          {{user | json}}
        </div>
        <div id="navbar" class="navbar-collapse" [class.collapse]="collapsed">
          <div>
            <bd2-top-bar-menu [user]="user" (navigation)="collapse()"></bd2-top-bar-menu>
          </div>

          <div class="navbar-right">
            <bd2-inline-login-form [user]="user" (navigation)="collapse()"></bd2-inline-login-form>
          </div>

        </div><!--/.navbar-collapse -->
      </div>
    </nav>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent implements OnInit, OnDestroy {

  collapsed = true;
  user: BD2User;
  logged: boolean;

  private userSubscription: Subscription;

  constructor(private userService: UserService, private changeDetector: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.userSubscription = this.userService.currentUser$
      .pipe(filter( u => u ? true : false ))
      .subscribe(
        user => {
          // console.log("User changed: "+user.login)
          this.user = user;
          this.logged = !user.anonymous;
          this.changeDetector.markForCheck(); // manually handling to improve performance
        },
        err => console.log('User stream err: ' + err),
        () => console.log('UserStream completed')
      );

  }

  ngOnDestroy() {
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  collapse() {
    this.collapsed = true;
  }


}
