import {Component, OnInit} from '@angular/core';
import {BD2User} from '../../auth/user.dom';
import {UserService} from '../../auth/user.service';
import {FeedbackService} from '../../feedback/feedback.service';
import {isValidEmail, isWeakPassword} from '../user.util';

@Component({
  templateUrl: './account-edit-form.component.html',
})
export class AccountEditFormComponent implements OnInit {

  user: BD2User;

  currentPassword: string;
  password: string;
  password2: string;
  email: string;
  firstName: string;
  lastName: string;
  institution: string;


  constructor(private userService: UserService, protected feedback: FeedbackService) {

  }

  ngOnInit() {

    this.user = this.userService.currentUser;

    this.email = this.user.email;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.institution = this.user.institution;
  }

  weakPassword(): boolean {

    return isWeakPassword(this.password);

  }

  validEmail(): boolean {

    return isValidEmail(this.email);

  }

  matching(): boolean {
    return this.password === this.password2;
  }

  passwordProblem(): boolean {
    if (!this.password) {
      return false;
    }
    if (this.weakPassword()) {
      return true;
    }
    if (!this.matching()) {
      return true;
    }
    return false;
  }

  save() {


    const data = {
      login: this.user.login,
      password: this.password,
      currentPassword: this.currentPassword,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      institution: this.institution
    };

    this.userService.update(data)
      .then(user => {
        this.user = user;
        this.currentPassword = undefined;
        this.feedback.success('User: ' + user.login + ' has been updated');
      })
      .catch(reason => {
        this.feedback.error(reason);
        this.currentPassword = undefined;
      });

  }


}
