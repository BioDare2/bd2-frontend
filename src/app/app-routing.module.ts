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
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  {path: 'documents', loadChildren: './documents/documents.module#DocumentsModule'},
  {path: '', component: WelcomeComponent, pathMatch: 'full'},
  {path: '**', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, /*{enableTracing: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
