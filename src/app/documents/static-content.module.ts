import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AlertModule} from 'ngx-bootstrap/alert';
import {StaticPopUpComponent} from './static-pop-up/static-pop-up.component';
import {StaticContentComponent} from './static-content/static-content.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    AlertModule
  ],
  declarations: [StaticPopUpComponent, StaticContentComponent],
  exports: [StaticPopUpComponent, StaticContentComponent],
})
export class StaticContentModule {
}
