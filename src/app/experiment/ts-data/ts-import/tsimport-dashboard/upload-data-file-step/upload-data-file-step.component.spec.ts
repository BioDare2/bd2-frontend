import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UploadDataFileStepComponent} from './upload-data-file-step.component';
import {MaterialsModule} from '../../../../../shared/materials.module';
import {FileAssetModule} from '../../../../../file-asset/file-asset.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('UploadDataFileStepComponent', () => {
  let component: UploadDataFileStepComponent;
  let fixture: ComponentFixture<UploadDataFileStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDataFileStepComponent ],
      imports: [MaterialsModule, FileAssetModule, NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataFileStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
