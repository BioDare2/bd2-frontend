import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../user.service';
import {BD2User} from '../user.dom';
import {Router} from '@angular/router';

/**
 * Inline Login Form Component
 * 
 * Compact login form for embedding in other components.
 * Allows user login from username and password.
 */
@Component({
    selector: 'bd2-inline-login-form',
    templateUrl: './inline-login-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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

  /* Log the user in */
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

  /* Refresh the current view (to update the page once the user has logged in) */
  refreshView() {
    const path = this.router.url;
    this.router
      .navigate(['/']).then( res =>
        this.router.navigateByUrl(path, )
    );
  }

  /* Log the user out */
  logout() {
    this.userService.logout()
      .then(state => {
        this.clearForm();
        this.router.navigate(['/'])
          .then(res => this.navigated());
      });
  }

  /* Reset the login form fields */
  clearForm() {
    this.username = undefined;
    this.password = undefined;
  }
}
