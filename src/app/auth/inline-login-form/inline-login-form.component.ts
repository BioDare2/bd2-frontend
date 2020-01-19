import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../user.service';
import {BD2User} from '../user.dom';
import {Router} from '@angular/router';

@Component({
  selector: 'bd2-inline-login-form',
  template: `
    <form #loginForm="ngForm" class="login-form form-inline">
      <div *ngIf="!logged" class="d-none d-lg-block d-xl-block no-clues">
        <input type="text" class="form-control mr-1"
               placeholder="Login"
               required
               [(ngModel)]="username"
               name="usernameF"
        >
        <input type="password" class="form-control mr-1"
               placeholder="Password"
               required
               [(ngModel)]="password"
               name="passwordF"
        >
        <button type="submit" class="btn btn-success"
                [disabled]="!loginForm.form.valid || loginForm.form.pristine" (click)="login()">Sign in
        </button>
      </div>
      <!-- button to full screen login on small devices -->
      <div *ngIf="!logged" class="d-lg-none d-xl-none">
        <a routerLink="/login" routerLinkActive="active" class="btn btn-success" role="button"
           (click)="navigated()">Sign in</a>
      </div>
      <div *ngIf="logged">
        <button type="submit" class="btn btn-success" (click)="logout()">Logout</button>
      </div>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineLoginFormComponent implements OnInit {

  username: string;
  password: string;
  logged = false;
  @Output()
  navigation = new EventEmitter<boolean>();

  constructor(private userService: UserService, private router: Router) {
  }

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
    const path = this.router.url;
    this.router
      .navigate(['/']).then( res =>
        this.router.navigateByUrl(path, )
    );
  }

  logout() {
    this.userService.logout()
      .then(state => {
        this.clearForm();
        this.router.navigate(['/'])
          .then(res => this.navigated());
      });
  }


  clearForm() {
    this.username = undefined;
    this.password = undefined;
  }

}
