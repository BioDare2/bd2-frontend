import {NgModule} from '@angular/core';
// import {AlertModule} from 'ngx-bootstrap/alert';
import {ModalModule, TypeaheadModule, AlertModule} from 'ngx-bootstrap';


@NgModule({
  imports: [
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
})
export class BootstrapRootModule {
}
