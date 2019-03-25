import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../auth/user.service';
import {ReCaptchaComponent} from '../../recaptcha/recaptcha.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'bd2-reset-request',
  template: `
    <div>
      <h3>Forgotten password</h3>

      <div *ngIf="msg" class="alert alert-success">{{msg}}
      </div>
      <div *ngIf="errMsg" class="alert alert-danger">{{errMsg}}
      </div>

      <form *ngIf="!requested" #reminderForm="ngForm">

        <div class="form-group">
          <label for="identifier">Login or email</label>
          <input type="text" class="form-control" required
                 id="identifier"
                 [(ngModel)]="identifier"
                 name="identifier"
          >
        </div>
        <div class="form-group">
          <bd2-recaptcha #recaptcha [site_key]="captchaSiteKey"
                         (captchaResponse)="captcha($event)"
                         (captchaExpired)="captchaExpired()"
          ></bd2-recaptcha>
          <div [hidden]="!missingCaptcha" class="alert alert-danger">
            Captcha selection is needed
          </div>
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="!reminderForm.valid" (click)="request()">Send
        </button>
      </form>
    </div>
  `,
  styles: []
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

  captcha(value: string) {
    this.gRecaptchaResponse = value;
    if (value) {
      this.missingCaptcha = false;
    }
    // console.log('Captcha: '+value);
  }

  captchaExpired() {
    this.gRecaptchaResponse = null;
    // console.log('Captcha expired');
  }

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
