import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {UserService} from '../../auth/user.service';
import {ActivatedRoute} from '@angular/router';
import {isWeakPassword} from '../user.util';

/**
 * Password Reset Component
 *
 * Handle password reset using the token from the password reset email.
 */
@Component({
    templateUrl: './password-reset.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PasswordResetComponent implements OnInit {

  msg: string;
  errMsg: string;
  requested = false;
  token: string;

  password: string;
  password2: string;


  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.token) {
      this.errMsg = 'Missing reset token';
    }
  }

  /* If token is present, reset the password and notify the user */
  reset() {
    if (!this.token) {
      return;
    }

    this.userService.resetPassword(this.password, this.token)
      .then(login => {
        this.msg = 'You can sign in with new password and login ' + login;
        this.requested = true;
      })
      .catch(reason => {
        this.errMsg = reason.message ? reason.message : reason;
      });
  }

  /* Check if the provided password is too weak */
  weakPassword(): boolean {
    return isWeakPassword(this.password);
  }

  /* Check if the provided passwords match */
  matching(): boolean {
    return this.password === this.password2;
  }

  /* Check if there is any problem with the provided passwords (too weak or not matching) */
  passwordProblem(): boolean {
    if (this.weakPassword()) {
      return true;
    }
    if (!this.matching()) {
      return true;
    }
    return false;
  }

}
