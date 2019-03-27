
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AlertModule} from 'ngx-bootstrap/alert';
import {StaticPopUpComponent} from './static-pop-up/static-pop-up.component';
import {StaticContentComponent} from './static-content/static-content.component';
import {StaticContentService} from "./static-content.service";

let contentService = jasmine.createSpyObj('contentService', ['getDocs']);
(contentService as any).getDocs.and.returnValue(Promise.resolve('Interesting document'));

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  declarations: [StaticPopUpComponent, StaticContentComponent],
  providers: [
    {provide: StaticContentService, useValue: contentService},
  ],
  exports: [StaticPopUpComponent, StaticContentComponent, ModalModule, AlertModule],
})
export class StaticContentTestModule {
}
