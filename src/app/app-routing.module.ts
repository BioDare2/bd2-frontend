import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './page/welcome/welcome.component';
import {LoginFormComponent} from './auth/login-form/login-form.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'logout',
    component: LoginFormComponent
  },
  {path: '', component: WelcomeComponent, pathMatch: 'full'},
  {path: '**', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
