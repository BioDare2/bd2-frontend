import {Component, OnInit} from '@angular/core';
import {BD2User} from '../../auth/user.dom';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../auth/user.service';
import {FeedbackService} from '../../feedback/feedback.service';
import {timer} from 'rxjs';
import {passwordMatching, validPasswordStrength} from '../user.util';

@Component({
  templateUrl: './password-change-rform.component.html',
  styles: []
})
export class PasswordChangeRFormComponent implements OnInit {

  user: BD2User;

  userForm: FormGroup;
  // currentPasswordField: FormControl;
  passwordsGroup: FormGroup;

  updated = false;

  constructor(private userService: UserService, protected feedback: FeedbackService, private fb: FormBuilder) {

  }

  ngOnInit() {

    this.user = this.userService.currentUser;

    this.userForm = this.fb.group({
      username: [{value: this.user.login, disabled: true}, [Validators.required], []],
      passwords: this.fb.group({
        password: [undefined, [Validators.required, (control: AbstractControl) => validPasswordStrength(control.value)]],
        password2: [undefined, [Validators.required]],
      }, {validator: (control: AbstractControl) => passwordMatching(control.value)}),
      currentPassword: [undefined, [Validators.required]],
    });

    // this.currentPasswordField = this.userForm.get('currentPassword') as FormControl;
    this.passwordsGroup = this.userForm.get('passwords') as FormGroup;
  }

  save() {

    if (!this.userForm.valid) {
      return;
    }

    const form = this.userForm.value;

    const data = {
      login: this.user.login,
      currentPassword: form.currentPassword,
      password: form.passwords.password
    };

    this.updated = false;

    this.userService.passwordUpdate(data).subscribe(
      user => {
        this.user = user;
        this.userForm.reset();
        // this.currentPasswordField.reset(); // = undefined;
        this.feedback.success('User: ' + user.login + ' password has been updated');

        // show the status
        this.updated = true;
        timer(5000).subscribe( () => this.updated = false);
      },
      reason => {
        this.userForm.reset();
        this.feedback.error(reason);
        // this.currentPasswordField.reset(); // this.currentPassword = undefined;
      });
  }
}
