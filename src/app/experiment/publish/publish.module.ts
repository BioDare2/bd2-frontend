import {NgModule} from '@angular/core';
import {PublishFormComponent} from './publish-form/publish-form.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    PublishFormComponent
  ],
  exports: [],
  providers: []
})
export class PublishModule {

}
