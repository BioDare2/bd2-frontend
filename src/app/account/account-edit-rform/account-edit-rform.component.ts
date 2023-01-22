import {Component, OnInit} from '@angular/core';
import {UserService} from '../../auth/user.service';
import {FeedbackService} from '../../feedback/feedback.service';
import {BD2User} from '../../auth/user.dom';
import {AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {validEmail} from '../user.util';
import {timer} from 'rxjs';

@Component({
  templateUrl: './account-edit-rform.component.html',
  styles: []
})
export class AccountEditRFormComponent implements OnInit {

  user: BD2User;

  userForm: UntypedFormGroup;
  userNameField: UntypedFormControl;
  emailField: UntypedFormControl;
  currentPasswordField: UntypedFormControl;

  updated = false;

  constructor(private userService: UserService, protected feedback: FeedbackService, private fb: UntypedFormBuilder) {

  }

  ngOnInit() {

    this.user = this.userService.currentUser;

    this.userForm = this.fb.group({
      username: [{value: this.user.login, disabled: true}, [Validators.required], []],
      email: [this.user.email, [Validators.required, (control: AbstractControl) => validEmail(control.value)], []],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      institution: [this.user.institution, [Validators.required]],
      currentPassword: [undefined, [Validators.required]],
    });

    this.userNameField = this.userForm.get('username') as UntypedFormControl;
    this.emailField = this.userForm.get('email') as UntypedFormControl;
    this.currentPasswordField = this.userForm.get('currentPassword') as UntypedFormControl;
  }

  save() {

    if (!this.userForm.valid) {
      return;
    }

    const form = this.userForm.value;

    const data = {
      login: this.user.login,
      currentPassword: form.currentPassword,
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      institution: form.institution
    };

    this.updated = false;

    this.userService.update(data).subscribe(
      user => {
        this.user = user;
        this.currentPasswordField.reset(); // = undefined;
        this.feedback.success('User: ' + user.login + ' has been updated');

        // show the status
        this.updated = true;
        timer(5000).subscribe( () => this.updated = false);
      },
      reason => {
        this.feedback.error(reason);
        this.currentPasswordField.reset(); // this.currentPassword = undefined;
      });
  }


}
