import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportStepsComponent } from './import-steps.component';
import {UploadDataFileStepComponent} from '../upload-data-file-step/upload-data-file-step.component';
import {ImportDetailsSummaryComponent} from '../import-details-summary/import-details-summary.component';
import {DefineTimeStepComponent} from '../define-time-step/define-time-step.component';
import {ImportLabelsStepComponent} from '../import-labels-step/import-labels-step.component';
import {DataSheetMDTableComponent} from '../data-sheet-mdtable/data-sheet-mdtable.component';
import {SelectDataStartStepComponent} from '../select-data-start-step/select-data-start-step.component';
import {MaterialsModule} from '../../../../shared/materials.module';

import {FileAssetModule} from '../../../../file-asset/file-asset.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ExperimentsTestToolModule} from '../../../experiment_test_tool.spec';
import {AssignLabelsStepComponent} from '../assign-labels-step/assign-labels-step.component';
import {SelectableRegionMDTableComponent} from '../assign-labels-step/selectable-region-mdtable/selectable-region-mdtable.component';
import {SelectBackgroundsLabelsStepComponent} from '../select-backgrounds-labels-step/select-backgrounds-labels-step.component';

describe('ImportStepsComponent', () => {
  let component: ImportStepsComponent;
  let fixture: ComponentFixture<ImportStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportStepsComponent, UploadDataFileStepComponent, ImportDetailsSummaryComponent,
        DefineTimeStepComponent, ImportLabelsStepComponent, DataSheetMDTableComponent, SelectDataStartStepComponent,
        AssignLabelsStepComponent, SelectableRegionMDTableComponent, SelectBackgroundsLabelsStepComponent
      ],
      imports: [MaterialsModule, FileAssetModule, NoopAnimationsModule,
        ExperimentsTestToolModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
