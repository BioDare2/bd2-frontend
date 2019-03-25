import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResetRequestComponent} from './reset-request/reset-request.component';

const routes: Routes = [
  {
    path: 'account',
    children: [
      {
        path: 'remind',
        component: ResetRequestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
