import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SelectBackgroundsLabelsStepComponent} from './select-backgrounds-labels-step.component';
import {MaterialsModule} from '../../../../../shared/materials.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {TSFileService} from '../ts-file.service';

describe('SelectBackgroundsLabelsStepComponent', () => {
  let component: SelectBackgroundsLabelsStepComponent;
  let fixture: ComponentFixture<SelectBackgroundsLabelsStepComponent>;
  let tsFileService;

  beforeEach(waitForAsync(() => {
    tsFileService = jasmine.createSpyObj('TSFileService', [
      'getTableSlice'
    ]);

    TestBed.configureTestingModule({
      declarations: [ SelectBackgroundsLabelsStepComponent ],
      imports: [MaterialsModule, NoopAnimationsModule, ReactiveFormsModule],
      providers: [{provide: TSFileService, useValue: tsFileService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBackgroundsLabelsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
