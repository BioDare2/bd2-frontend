import { Component, OnInit } from '@angular/core';
import {UserService} from '../../auth/user.service';
import {ActivatedRoute} from '@angular/router';
import {isWeakPassword} from '../user.util';

@Component({
  template: `
    <div>
      <h3>Password reset</h3>

      <div *ngIf="msg" class="alert alert-success">{{msg}}
      </div>
      <div *ngIf="errMsg" class="alert alert-danger">{{errMsg}}
      </div>

      <div *ngIf="token">
        <form *ngIf="!requested" #resetForm="ngForm">

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control"
                   required minlength="8"
                   id="password"
                   placeholder="new password"
                   [(ngModel)]="password"
                   name="fPassword" #fPassword="ngModel">
            <div [hidden]="fPassword.pristine || !weakPassword()" class="alert alert-danger">
              Password must be at least 8 long, containing a digit or symbol or capital letter
            </div>

          </div>

          <div class="form-group">
            <label for="password2">Repeat password</label>
            <input type="password" class="form-control"
                   id="password2" required
                   placeholder="password"
                   [(ngModel)]="password2"
                   name="fPassword2" #fPassword2="ngModel">
            <div [hidden]="fPassword2.pristine || matching()" class="alert alert-danger">
              Passwords do not match
            </div>
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="!resetForm.form.valid || passwordProblem() "
                  (click)="reset()">Reset
          </button>
        </form>
      </div>
    </div>
  `,
  styles: []
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

  weakPassword(): boolean {

    return isWeakPassword(this.password);

  }


  matching(): boolean {
    return this.password === this.password2;
  }

  passwordProblem(): boolean {
    if (this.weakPassword()) { return true; }
    if (!this.matching()) { return true; }
    return false;
  }

}
