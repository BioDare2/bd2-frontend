import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FileAssetFormComponent} from './file-asset-form.component';
import {FileAssetTestModule} from '../file-asset_test_tool.spec';

describe('FileAssetFormComponent', () => {
  let component: FileAssetFormComponent;
  let fixture: ComponentFixture<FileAssetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileAssetFormComponent],
      imports: [FileAssetTestModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAssetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
