import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {BD2User} from '../user.dom';

/**
 * Login Form Component
 * 
 * Full-page form for user login.
 * 
 * @remarks
 * This is only accessible through the /login URL. The top-bar login form uses the {@link InlineLoginFormComponent}.
 */
@Component({
    selector: 'bd2-login-form',
    templateUrl: './login-form.component.html',
    standalone: false
})
export class LoginFormComponent implements OnInit {

  username: string;
  password: string;

  constructor(private userService: UserService) {

  }

  get currentUser(): BD2User {
    return this.userService.currentUser;
  }

  ngOnInit() {
  }

  /* Log the user in */
  login() {
    if (this.username && this.username.trim()) {
      this.userService.login(this.username, this.password)
        .then(u => this.clearForm())
        .catch(reason => console.error(reason));
    }
  }

  /* Log the user out */
  logout() {
    this.userService.logout()
      .then(u => this.clearForm())
      .catch(reason => console.error(reason));
  }

  /* Reset the login form fields */
  clearForm() {
    this.username = undefined;
    this.password = undefined;
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  goBack() {
    window.history.back();
  }
}
