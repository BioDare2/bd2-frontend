import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentsComponent} from './documents/documents.component';
import {AlertModule} from 'ngx-bootstrap/alert';
import {StaticContentModule} from './static-content.module';
import {DocumentsRoutingModule} from './documents.routing';

@NgModule({
  imports: [
    CommonModule,
    AlertModule,
    StaticContentModule,
    DocumentsRoutingModule
  ],
  declarations: [DocumentsComponent],
  exports: [],
  providers: []
})
export class DocumentsModule {
}
