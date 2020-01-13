import {NgModule} from '@angular/core';
import {ModalModule, TypeaheadModule} from 'ngx-bootstrap';


@NgModule({
  imports: [
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
})
export class BootstrapRootModule {
}
