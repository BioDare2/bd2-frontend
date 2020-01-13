import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {ReCaptchaComponent} from '../../recaptcha/recaptcha.component';
import {UserService} from '../../auth/user.service';
import {FeedbackService} from '../../feedback/feedback.service';
import {isValidEmail, isWeakPassword} from '../user.util';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {StaticContentDialogService} from '../../documents/static-content/static-content-dialog.service';

@Component({
  templateUrl: './registration-rform.component.html',
})
export class RegistrationRFormComponent implements OnInit {

  captchaSiteKey: string;
  userForm: FormGroup;
  userNameField: FormControl;
  emailField: FormControl;
  passwordField: FormControl;
  password2Field: FormControl;

  registered: boolean;
  registeredMsg: string;

  userNameError: string;
  emailError: string;

  blocked = false;
  missingCaptcha = false;
  g_recaptcha_response: string;

  @ViewChild('recaptcha', { static: false })
  private recaptcha: ReCaptchaComponent;


  constructor(private userService: UserService,
              private feedback: FeedbackService,
              private fb: FormBuilder,
              public helpDialog: StaticContentDialogService) {

    this.captchaSiteKey = environment.captchaSiteKey;
  }

  ngOnInit() {

    this.userForm = this.fb.group({
      username: [undefined, [Validators.required], []],
      email: [undefined, [Validators.required], []],
      passwords: this.fb.group({
        password: [undefined, [Validators.required, (control: AbstractControl) => this.validPasswordStrength(control.value)]],
        password2: [undefined, [Validators.required]],
      }, {validator: (control: AbstractControl) => this.passwordMatching(control.value)}),
      firstName: [undefined, [Validators.required]],
      lastName: [undefined, [Validators.required]],
      institution: [undefined, [Validators.required]],
      terms: [undefined, [Validators.required]],
    });

    this.userNameField = this.userForm.get('username') as FormControl;
    this.emailField = this.userForm.get('email') as FormControl;
    this.passwordField = this.userForm.get('passwords.password') as FormControl;
    this.password2Field = this.userForm.get('passwords.password2') as FormControl;

    this.subscribeValidationMessages();
  }


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

  }

  decodeEmailErrors(errors: any): string {
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
  }

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
  }

  captcha(value: string) {
    this.g_recaptcha_response = value;
    if (value) {
      this.missingCaptcha = false;
    }
    // console.log('Captcha: '+value);
  }

  captchaExpired() {
    this.g_recaptcha_response = null;
    // console.log('Captcha expired');
  }

  validEmail(val: string): { [key: string]: any } {
    // console.log("V "+val,val);
    if (isValidEmail(val)) {
      return null;
    } else {
      return {email: 'Not valid format'};
    }
  }

  validPasswordStrength(val: string): { [key: string]: any } {
    // console.log("VP "+val,val);
    if (isWeakPassword(val)) {
      return {'password-weak': true};
    } else {
      return null;
    }
  }

  passwordMatching(val: any) {
    // console.log("PM: "+val,val);
    if (val.password === val.password2) {
      return null;
    }
    return {'password-mismatch': true};
  }


  availableLogin(val: string): Promise<{ [key: string]: any }> {
    if (!val || val.length < 5) {
      return Promise.resolve({'too-short': true});
    }

    return this.userService.availableLogin(val)
      .then(resp => {
        if (resp) {
          return Promise.resolve<{ [key: string]: any }>(null);
        } else {
          return Promise.resolve({'login-taken': 'User ' + val + ' already exists'});
        }
      })
      .catch(reason => this.feedback.error(reason));
  }

  suitableEmail(val: string): Promise<{ [key: string]: any }> {
    if (!isValidEmail(val)) {
      return Promise.resolve({pattern: 'Not valid email format'});
    }

    return this.userService.suitableEmail(val)
      .then(suitability => {
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
      })
      .catch(reason => this.feedback.error(reason));
  }

  register() {
    console.log('Register');

    if (this.userForm.valid) {
      if (!this.g_recaptcha_response) {
        if (!this.emailField.value.endsWith('.cn') && !this.emailField.value.endsWith('.tw')) {
          this.missingCaptcha = true;
          return;
        }
      }


      const user = this.makeUserData(this.userForm.value);
      // user.login = user.username;
      // user.g_recaptcha_response = this.g_recaptcha_response;

      this.dblCheckValidity(user)
        .then(
          resp => {
            if (resp) {
              this.triggerRegistration(user);
            } else {
              this.feedback.error('From submitted before validation');
            }
          }
        );

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
      g_recaptcha_response: this.g_recaptcha_response
    };
    return user;
  }

  dblCheckValidity(user: any): Promise<boolean> {
    return this.availableLogin(user.login)
      .then(resp => {
        if (resp) {
          return false;
        }
        return this.suitableEmail(user.email)
          .then(resp => resp ? false : true);
      });
  }

  triggerRegistration(user: any) {

    this.userService.register(user)
      .then(user => {
        this.registered = true;
        this.registeredMsg = user.email;
        this.feedback.success('Registration successful');
      })
      .catch(reason => {
        this.feedback.error(reason);
        this.g_recaptcha_response = undefined;
        if (this.recaptcha) {
          this.recaptcha.reset();
        }

      });

  }


}
