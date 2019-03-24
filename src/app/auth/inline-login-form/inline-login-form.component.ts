import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';
import {UserService} from '../user.service';
import {BD2User} from '../user.dom';
import {Router} from '@angular/router';

@Component({
  selector: 'bd2-inline-login-form',
  template: `
    <form #loginForm="ngForm" class="navbar-form no-clues">
      <div class="login-form">
        <!-- the form is hidden by bootstrap on smal devices -->
        <div *ngIf="!logged" class="hidden-sm hidden-xs">
          <div class="form-group">
            <input type="text" class="form-control"
                   placeholder="Login"
                   required
                   [(ngModel)]="username"
                   name="usernameF"
            >
          </div>
          <div class="form-group">
            <input type="password" class="form-control"
                   placeholder="Password"
                   required
                   [(ngModel)]="password"
                   name="passwordF"
            >
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-success"
                    [disabled]="!loginForm.form.valid || loginForm.form.pristine" (click)="login()">Sign in
            </button>
          </div>
        </div>
        <!-- button to full screen login on small devices -->
        <div *ngIf="!logged" class="visible-sm-block visible-xs-block">
          <a routerLink="/login" routerLinkActive="active" class="btn btn-success" role="button"
             (click)="navigated()">Sign in</a>
        </div>
        <div *ngIf="logged">
          <button type="submit" class="btn btn-success" (click)="logout()">Logout</button>
        </div>
      </div>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineLoginFormComponent implements OnInit {

  username: string;
  password: string;

  constructor(private userService: UserService, private router: Router) {
  }

  logged = false;

  @Output()
  navigation = new EventEmitter<boolean>();

  @Input()
  set user(user: BD2User) {
    this.logged = (user && !user.anonymous);
  }

  navigated() {
    this.navigation.next(true);
  }

  ngOnInit() {
  }


  login() {
    this.username = this.username ? this.username.trim() : undefined;
    this.password = this.password ? this.password.trim() : undefined;
    if (this.username && this.password) {
      this.userService.login(this.username, this.password)
        .then(user => {
          this.clearForm();
          this.refreshView();
        })
        .catch(reason => {
          this.router.navigate(['/login']);
        });
    }
  }

  refreshView() {
    const path = window.location.pathname;
    this.router.navigate(['/refresh', {path}]);
  }

  logout() {
    this.userService.logout()
      .then(state => {
        this.clearForm();
        this.router.navigate(['/']);
        this.navigated();
      });
  }


  clearForm() {
    this.username = undefined;
    this.password = undefined;
  }

}
