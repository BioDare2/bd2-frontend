import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ResetRequestComponent } from './reset-request/reset-request.component';
import {FormsModule} from '@angular/forms';
import {ReCaptchaModule} from '../recaptcha/recaptcha.module';

@NgModule({
  declarations: [ResetRequestComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReCaptchaModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
