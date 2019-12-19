import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BD2User} from '../../auth/user.dom';

@Component({
  selector: 'bd2-top-bar-menu',
  template: `
    <ul class="nav navbar-nav">
      <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <a routerLink="welcome" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"
           class="nav-link" (click)="navigated()">Home</a>
      </li>
      <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <a routerLink="/experiments" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"
           class="nav-link" (click)="navigated()">Experiments</a>
      </li>
      <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <a *ngIf="logged" routerLink="/experiments/new" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: true}"
           class="nav-link" (click)="navigated()">New Experiment</a>
      </li>
      <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: false}">
        <a routerLink="/documents" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: false}"
           class="nav-link" (click)="navigated()">Docs</a>
      </li>
      <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <a *ngIf="!logged" routerLink="/account/register" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: true}"
           class="nav-link" (click)="navigated()">Register</a>
      </li>
      <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <a *ngIf="logged" routerLink="/account/edit" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: true}"
           class="nav-link" (click)="navigated()">Account</a>
      </li>
    </ul>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarMenuComponent implements OnInit {

  logged = false;

  @Output()
  navigation = new EventEmitter<boolean>();

  constructor() {
  }

  @Input()
  set user(user: BD2User) {
    this.logged = (user && !user.anonymous);
  }

  navigated() {
    this.navigation.next(true);
    // console.log("Menu Click");
  }

  ngOnInit() {
  }

}
