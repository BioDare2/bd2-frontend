import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentsComponent} from './documents/documents.component';
import {StaticContentModule} from './static-content/static-content.module';
import {DocumentsRoutingModule} from './documents.routing';

/**
 * Module for static document related components and services.
 */
@NgModule({
  imports: [
    CommonModule,
    StaticContentModule,
    DocumentsRoutingModule
  ],
  declarations: [DocumentsComponent],
  exports: [],
  providers: []
})
export class DocumentsModule {
}
