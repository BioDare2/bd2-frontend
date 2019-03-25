import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResetRequestComponent} from './reset-request/reset-request.component';
import {PasswordResetComponent} from "./password-reset/password-reset.component";

const routes: Routes = [
  {
    path: 'account',
    children: [
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
