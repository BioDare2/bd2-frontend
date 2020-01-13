import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaticContentComponent} from './static-content/static-content.component';
import {StaticContentService} from './static-content.service';

const contentService = jasmine.createSpyObj('contentService', ['getDocs']);
(contentService as any).getDocs.and.returnValue(Promise.resolve('Interesting document'));

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [StaticContentComponent],
  providers: [
    {provide: StaticContentService, useValue: contentService},
  ],
  exports: [StaticContentComponent],
})
export class StaticContentTestModule {
}
