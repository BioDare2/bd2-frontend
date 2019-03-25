import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineLoginFormComponent} from './inline-login-form/inline-login-form.component';
import {FormsModule} from '@angular/forms';
import {LoginFormComponent} from './login-form/login-form.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [InlineLoginFormComponent, LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [InlineLoginFormComponent]
})
export class AuthModule {
}
