import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {FileAssetUploadComponent} from './file-asset-upload.component';
import {FileAssetTestModule} from '../file-asset_test_tool.spec';

describe('FileAssetUploadComponent', () => {
  let component: FileAssetUploadComponent;
  let fixture: ComponentFixture<FileAssetUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FileAssetUploadComponent],
      imports: [FileAssetTestModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAssetUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
