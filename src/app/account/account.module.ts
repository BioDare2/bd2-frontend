import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {ResetRequestComponent} from './reset-request/reset-request.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReCaptchaModule} from '../recaptcha/recaptcha.module';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {AccountActivationComponent} from './account-activation/account-activation.component';
import {RegistrationRFormComponent} from './registration-rform/registration-rform.component';
import {StaticContentModule} from '../documents/static-content/static-content.module';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {AccountEditRFormComponent} from './account-edit-rform/account-edit-rform.component';
import {PasswordChangeRFormComponent} from './password-change-rform/password-change-rform.component';

@NgModule({
  declarations: [ResetRequestComponent, PasswordResetComponent, AccountActivationComponent,
    RegistrationRFormComponent, AccountEditRFormComponent, PasswordChangeRFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReCaptchaModule,
    StaticContentModule,
    AccountRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule
  ]
})
export class AccountModule {
}
