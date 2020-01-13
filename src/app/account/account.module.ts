import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {ResetRequestComponent} from './reset-request/reset-request.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReCaptchaModule} from '../recaptcha/recaptcha.module';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {AccountActivationComponent} from './account-activation/account-activation.component';
import {RegistrationRFormComponent} from './registration-rform/registration-rform.component';
import {AccountEditFormComponent} from './account-edit-form/account-edit-form.component';
import {StaticContentModule} from '../documents/static-content/static-content.module';

@NgModule({
  declarations: [ResetRequestComponent, PasswordResetComponent, AccountActivationComponent,
    RegistrationRFormComponent, AccountEditFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReCaptchaModule,
    StaticContentModule,
    AccountRoutingModule
  ]
})
export class AccountModule {
}
