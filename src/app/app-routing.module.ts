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
  {path: 'experiments', loadChildren: () => import('./experiment/experiments.module').then(m => m.ExperimentsModule)},

  {path: 'experiment', loadChildren: () => import('./experiment/experiment.module').then(m => m.ExperimentModule)},

  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},

  {path: 'documents', loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule)},

  {path: '', component: WelcomeComponent, pathMatch: 'full'},
  {path: '**', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, /*{enableTracing: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
