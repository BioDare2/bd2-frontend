import {Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {UserService} from '../../auth/user.service';
import {ReCaptchaComponent} from '../../recaptcha/recaptcha.component';
import {environment} from '../../../environments/environment';

/**
 * Reset Request Component
 * 
 * Send a password reset email to the user.
 */
@Component({
    selector: 'bd2-reset-request',
    templateUrl: './reset-request.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ResetRequestComponent implements OnInit {

  identifier: string;
  gRecaptchaResponse: string;
  missingCaptcha: boolean;
  captchaSiteKey: string;

  msg: string;
  errMsg: string;
  requested = false;

  @ViewChild('recaptcha')
  recaptcha: ReCaptchaComponent;

  constructor(private userService: UserService) {
    this.captchaSiteKey = environment.captchaSiteKey;
  }

  ngOnInit() {
  }

  /* Monitor captcha value */
  captcha(value: string) {
    this.gRecaptchaResponse = value;
    if (value) {
      this.missingCaptcha = false;
    }
  }

  /* Reset captcha value on expiry */
  captchaExpired() {
    this.gRecaptchaResponse = null;
  }

  /* Send a password reset email */
  request() {
    if (!this.identifier || this.identifier.trim() === '') {
      return;
    }

    this.msg = undefined;
    this.errMsg = undefined;

    this.userService.requestReset(this.identifier, this.gRecaptchaResponse)
      .then(email => {
        this.msg = 'Reset link was sent to ' + email;
        this.requested = true;
      })
      .catch(reason => {
        this.errMsg = reason.message ? reason.message : reason;
        this.gRecaptchaResponse = null;
        if (this.recaptcha) {
          this.recaptcha.reset();
        }
      });
  }
}
