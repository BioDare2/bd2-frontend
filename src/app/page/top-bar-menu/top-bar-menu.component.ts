import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BD2User} from '../../auth/user.dom';

@Component({
  selector: 'bd2-top-bar-menu',
  templateUrl: 'top-bar-menu.component.html',
  styles: [':host ::ng-deep .nav-link.mat-mdc-menu-trigger {cursor: pointer;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
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
