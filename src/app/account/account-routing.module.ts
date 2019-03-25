import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResetRequestComponent} from './reset-request/reset-request.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {AccountActivationComponent} from './account-activation/account-activation.component';
import {RegistrationRFormComponent} from './registration-rform/registration-rform.component';
import {AccountEditFormComponent} from './account-edit-form/account-edit-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'edit',
        component: AccountEditFormComponent,
      }, {
        path: 'register',
        component: RegistrationRFormComponent
      }, {
        path: 'activate',
        component: AccountActivationComponent
      },
      {
        path: 'remind',
        component: ResetRequestComponent
      },
      {
        path: 'reset',
        component: PasswordResetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
