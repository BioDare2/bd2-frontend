import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineLoginFormComponent} from './inline-login-form/inline-login-form.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [InlineLoginFormComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [InlineLoginFormComponent]
})
export class AuthModule {
}
