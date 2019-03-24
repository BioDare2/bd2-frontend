import {Component, OnInit, ChangeDetectionStrategy, Output, Input, EventEmitter} from '@angular/core';
import {BD2User} from '../../auth/user.dom';

@Component({
  selector: 'bd2-top-bar-menu',
  template: `
    <ul class="nav navbar-nav">
      <li routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <a routerLink="welcome" routerLinkActive="active"  [routerLinkActiveOptions]="{exact: true}"
           (click)="navigated()">Home</a>
      </li>
      <li routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <a routerLink="/experiments" routerLinkActive="active"  [routerLinkActiveOptions]="{exact: true}"
           (click)="navigated()">Experiments</a>
      </li>
      <li routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <a *ngIf="logged" routerLink="/experiments/new" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: true}" (click)="navigated()">New Experiment</a>
      </li>
      <li routerLinkActive="active" [routerLinkActiveOptions]="{exact: false}">
        <a routerLink="/documents" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: false}" (click)="navigated()">Docs</a>
      </li>
      <li routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <a *ngIf="!logged" routerLink="/account/register" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: true}" (click)="navigated()">Register</a>
      </li>
      <li routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <a *ngIf="logged" routerLink="/account/edit" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: true}" (click)="navigated()">Account</a>
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

  @Input()
  set user(user: BD2User) {
    this.logged = (user && !user.anonymous);
  }

  navigated() {
    this.navigation.next(true);
    // console.log("Menu Click");
  }

  constructor() { }

  ngOnInit() {
  }

}
