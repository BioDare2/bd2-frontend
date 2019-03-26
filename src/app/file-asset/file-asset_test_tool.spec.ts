
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FileAssetService} from './file-asset-service';
import {AnalyticsService} from '../analytics/analytics.service';
import {fakeAnalyticsService} from '../analytics/analytics_test_tool.spec';


export function fakeFileAssetService() {


  const ser = jasmine.createSpyObj('FileAssetService', [
    'updateFile'
  ]);


  // ser.newDraft.and.returnValue(Promise.resolve({}));
  return ser;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    {provide: FileAssetService, useValue: fakeFileAssetService() },
    {provide: AnalyticsService, useValue: fakeAnalyticsService()}
  ],
  exports: [
    FormsModule
  ]
})
export class FileAssetTestModule {
}
