import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import {FileUploadWidgetComponent} from './file-upload-widget.component';
import {FileAssetTestModule} from '../file-asset_test_tool.spec';

describe('FileUploadWidgetComponent', () => {
  let component: FileUploadWidgetComponent;

  beforeEach(() => {
    component = new FileUploadWidgetComponent();
  });

  it('should be wired', () => {
    expect(component).toBeDefined();
  });

  it('should handle only the first file if multiple is false', () => {
    const files: any = {};
    files.length = 2;
    files[0] = new File([], 'f1');
    files[1] = new File([], 'f2');

    component.multiple = false;
    component.handleFileChange(files);

    expect(component.files.length).toBe(1);
    expect(component.files[0]).toBe(files[0]);

  });

  it('should handle multiple files if multiple is true', () => {
    const files: any = {};
    files.length = 2;
    files[0] = new File([], 'f1');
    files[1] = new File([], 'f2');

    component.multiple = true;
    component.handleFileChange(files);

    expect(component.files.length).toBe(2);
    expect(component.files[0]).toBe(files[0]);
    expect(component.files[1]).toBe(files[1]);

  });

  it('should keep only recent files if noDuplicates is true', () => {
    let files: any = {};
    files.length = 2;
    files[0] = new File([], 'f1');
    files[1] = new File([], 'f2');

    component.multiple = true;
    component.noDuplicates = true;
    component.handleFileChange(files);

    expect(component.files.length).toBe(2);

    files = {};
    files.length = 2;
    files[0] = new File([], 'f3');
    files[1] = new File([], 'f1');

    component.handleFileChange(files);
    expect(component.files.length).toBe(3);
    expect(component.files).toContain(files[1]);
    expect(component.files.map(f => f.name)).toEqual(['f2', 'f3', 'f1']);


  });

  it('should keep duplicates if noDuplicates is false', () => {
    let files: any = {};
    files.length = 2;
    files[0] = new File([], 'f1');
    files[1] = new File([], 'f2');

    component.multiple = true;
    component.noDuplicates = false;
    component.handleFileChange(files);

    expect(component.files.length).toBe(2);

    files = {};
    files.length = 2;
    files[0] = new File([], 'f3');
    files[1] = new File([], 'f1');

    component.handleFileChange(files);
    expect(component.files.length).toBe(4);
    expect(component.files.map(f => f.name)).toEqual(['f1', 'f2', 'f3', 'f1']);


  });

  it('reset clears the files', () => {

    const files: any = {};
    files.length = 2;
    files[0] = new File([], 'f1');
    files[1] = new File([], 'f2');

    component.multiple = true;
    component.handleFileChange(files);

    expect(component.files.length).toBe(2);

    component.reset();
    expect(component.files.length).toBe(0);

  });

  it('upload emits selected files', fakeAsync(() => {

    const files = [new File([], 'f1')];
    component.files = files;

    let res;

    component.uploadFiles.subscribe(val => res = val, err => fail(err));

    component.upload();
    tick();
    expect(res).toBe(files);

  }));


  describe('AngularTesting', () => {
    // let component: FileUploadWidgetComponent;
    let fixture: ComponentFixture<FileUploadWidgetComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FileUploadWidgetComponent],
        imports: [FileAssetTestModule]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      component = undefined;
      fixture = TestBed.createComponent(FileUploadWidgetComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
