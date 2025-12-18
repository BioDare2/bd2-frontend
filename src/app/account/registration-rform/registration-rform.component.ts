import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {ReCaptchaComponent} from '../../recaptcha/recaptcha.component';
import {UserService} from '../../auth/user.service';
import {FeedbackService} from '../../feedback/feedback.service';
import {passwordMatching, validEmail, validPasswordStrength} from '../user.util';

import {StaticContentDialogService} from '../../documents/static-content/static-content-dialog.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

/**
 * Registration R Form Component
 * 
 * Reactive forms for user registration.
 * The form will check field validity, login availability, and email suitability (must be academic and not already used).
 * 
 * @remarks
 * reCAPTCHA is integrated to prevent bot registrations.
 * However, unavailability of reCAPTCHA in China means that users there must contact support for registration.
 * Anyone outside China can create an account on their behalf, and communicate the login details to the user.
 */
@Component({
    templateUrl: './registration-rform.component.html',
    standalone: false
})
export class RegistrationRFormComponent implements OnInit {

  captchaSiteKey: string;
  userForm: UntypedFormGroup;
  userNameField: UntypedFormControl;
  emailField: UntypedFormControl;
  passwordField: UntypedFormControl;
  password2Field: UntypedFormControl;
  passwordsGroup: UntypedFormGroup;

  registered: boolean;
  registeredMsg: string;



  blocked = false;
  missingCaptcha = false;
  gRecaptchaResponse: string;

  @ViewChild('recaptcha')
  private recaptcha: ReCaptchaComponent;


  constructor(private userService: UserService,
              private feedback: FeedbackService,
              private fb: UntypedFormBuilder,
              public helpDialog: StaticContentDialogService) {

    this.captchaSiteKey = environment.captchaSiteKey;
  }

  ngOnInit() {

    this.userForm = this.fb.group({
      username: [undefined, {
        validators: [Validators.required],
        asyncValidators: (control: AbstractControl) => this.availableLogin(control.value),
        updateOn: 'blur'
      }],
      email: [undefined, {
        validators: [Validators.required, (control: AbstractControl) => validEmail(control.value)],
        asyncValidators: (control: AbstractControl) => this.suitableEmail(control.value),
        updateOn: 'blur'
      }],
      passwords: this.fb.group({
        password: [undefined, [Validators.required, (control: AbstractControl) => validPasswordStrength(control.value)]],
        password2: [undefined, [Validators.required]],
      }, {validator: (control: AbstractControl) => passwordMatching(control.value)}),
      firstName: [undefined, [Validators.required]],
      lastName: [undefined, [Validators.required]],
      institution: [undefined, [Validators.required]],
      terms: [undefined, [Validators.required]],
    });

    this.userNameField = this.userForm.get('username') as UntypedFormControl;
    this.emailField = this.userForm.get('email') as UntypedFormControl;
    this.passwordField = this.userForm.get('passwords.password') as UntypedFormControl;
    this.password2Field = this.userForm.get('passwords.password2') as UntypedFormControl;
    this.passwordsGroup = this.userForm.get('passwords') as UntypedFormGroup;

    // this.subscribeValidationMessages();
  }

  /* Monitor the captcha response */
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

  /* Check if login is long enough and available */
  availableLogin(val: string): Observable<{ [key: string]: any }> {

    if (!val || val.length < 5) {
      return of({'too-short': true});
    }

    return this.userService.availableLogin(val).pipe(
      map(resp => {
          if (resp) {
            return null;
          } else {
            return {'login-taken': 'User ' + val + ' already exists'};
          }}),
      catchError( reason => {
        this.feedback.error(reason);
        return of({ 'cannot-connect': true});
      })
    );
  }

  /* Check if email is academic and not already used */
  suitableEmail(val: string): Observable<{ [key: string]: any }> {

    return this.userService.suitableEmail(val).pipe(
      map(suitability => {
        if (suitability.isFree && suitability.isAcademic) {
          return null;
        }

        const problems: { [key: string]: any } = {};
        if (!suitability.isFree) {
          problems['email-taken'] = 'Email: ' + val + ' is already being used';
        }
        if (!suitability.isAcademic) {
          problems['email-nonacademic'] = 'An academic email is required for registration. ' +
            'Contact us if your email is not recognized as academic.';
        }
        return problems;
      }),
      catchError( reason => {
        this.feedback.error(reason);
        return of({ 'cannot-connect': true});
      })
    );
  }

  /* Register the user if the form and CAPTCHA are valid (except for .cn and .tw addresses) */
  register() {
    if (this.userForm.valid) {
      if (!this.gRecaptchaResponse) {
        if (!this.emailField.value.endsWith('.cn') && !this.emailField.value.endsWith('.tw')) {
          this.missingCaptcha = true;
          return;
        }
      }

      const user = this.makeUserData(this.userForm.value);
      this.triggerRegistration(user);
    }
  }

  /* Prepare user data from form contents */
  makeUserData(form: any): any {
    const user = {
      login: form.username,
      password: form.passwords.password,
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      institution: form.institution,
      terms: form.terms,
      g_recaptcha_response: this.gRecaptchaResponse
    };
    return user;
  }

  /* Register the user */
  triggerRegistration(user: any) {
    this.userService.register(user)
      .then(registered => {
        this.registered = true;
        this.registeredMsg = registered.email;
        this.feedback.success('Registration successful');
      })
      .catch(reason => {
        this.feedback.error(reason);
        this.gRecaptchaResponse = undefined;
        if (this.recaptcha) {
          this.recaptcha.reset();
        }
      });
  }
}
