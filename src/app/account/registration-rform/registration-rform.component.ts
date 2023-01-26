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

@Component({
  templateUrl: './registration-rform.component.html',
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

  /*
  subscribeValidationMessages() {

    this.userNameField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged((prev: any, next: any) => prev === next)
    )
      .subscribe(change => {
          // console.log("C"+change,change);

          const val = change;
          this.userNameError = this.decodeUserNameErrors(this.userNameField.errors);

          if (this.userNameField.valid) { // check availability only for valid
            this.availableLogin(val)
              .then(err => {
                this.userNameField.setErrors(err);
                this.userNameError = this.decodeUserNameErrors(this.userNameField.errors);
              });
          }
        }
      );


    this.emailField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged((prev: any, next: any) => prev === next)
    )
      .subscribe(change => {
        // console.log("C"+change,change);

        const val = change;
        this.emailError = this.decodeEmailErrors(this.emailField.errors);

        if (this.emailField.valid) { // check availability only for valid
          this.suitableEmail(val)
            .then(err => {
              this.emailField.setErrors(err);
              this.emailError = this.decodeEmailErrors(this.emailField.errors);
            });
        }
      });

  } */

  /*
  decodeEmailErrors(errors: any): string {
    console.log("Decode error", errors);
    let msg = '';
    if (errors) {
      for (const key in errors) {
        if (errors[key] === true) {
          continue;
        }
        msg += errors[key] + '<br/>';
      }
    }

    // console.log(""+msg,errors);
    return msg;
  } */

  /*
  decodeUserNameErrors(errors: any): string {

    if (errors) {
      let msg = '';
      if (
        errors.required ||
        errors.minlength ||
        errors.pattern
      ) {
        msg = 'Alphanumerical login is required (".", "_" are allowed, min length 5, only small letters).<br/>';
      }

      if (errors['login-taken']) {
        msg += errors['login-taken'];
      }
      // console.log(""+msg,errors);
      return msg;
    } else {
      return undefined;
    }
  }*/

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
          problems['email-nonacademic'] = 'Academic email is required for the registration. ' +
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

  register() {
    // console.log('Register');

    if (this.userForm.valid) {
      if (!this.gRecaptchaResponse) {
        if (!this.emailField.value.endsWith('.cn') && !this.emailField.value.endsWith('.tw')) {
          this.missingCaptcha = true;
          return;
        }
      }


      const user = this.makeUserData(this.userForm.value);
      // user.login = user.username;
      // user.g_recaptcha_response = this.g_recaptcha_response;

      this.triggerRegistration(user);

      /*
      this.dblCheckValidity(user)
        .then(
          resp => {
            if (resp) {
              this.triggerRegistration(user);
            } else {
              this.feedback.error('Form submitted before validation');
            }
          }
        );
      */
    }
  }

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

  /*dblCheckValidity(user: any): Promise<boolean> {
    return this.availableLogin(user.login)
      .then(resp => {
        if (resp) {
          return false;
        }
        return this.suitableEmail(user.email)
          .then(resp => resp ? false : true);
      });
  }*/

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
