import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UploadDataFileComponent} from './upload-data-file.component';
import {FileAssetModule} from '../../src/app/file-asset/file-asset.module';
import {ExperimentsTestToolModule} from '../../src/app/experiment/experiment_test_tool.spec';

describe('UploadDataFileComponent', () => {
  let component: UploadDataFileComponent;
  let fixture: ComponentFixture<UploadDataFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadDataFileComponent],
      imports: [FileAssetModule, ExperimentsTestToolModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
