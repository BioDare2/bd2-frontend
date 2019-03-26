
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAssetViewComponent } from './file-asset-view.component';
import {AnalyticsService} from '../../analytics/analytics.service';
import {fakeAnalyticsService} from '../../analytics/analytics_test_tool.spec';
import {FileAssetTestModule} from '../file-asset_test_tool.spec';

describe('FileAssetViewComponent', () => {
  let component: FileAssetViewComponent;
  let fixture: ComponentFixture<FileAssetViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileAssetViewComponent ],
      imports: [FileAssetTestModule],
      providers: [
        {provide: AnalyticsService, useValue: fakeAnalyticsService()}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAssetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
