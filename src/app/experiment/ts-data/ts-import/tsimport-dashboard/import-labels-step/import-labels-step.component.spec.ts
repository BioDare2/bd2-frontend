import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ImportLabelsStepComponent} from './import-labels-step.component';
import {MaterialsModule} from '../../../../../shared/materials.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {DataSheetMDTableComponent} from '../data-sheet-mdtable/data-sheet-mdtable.component';
import {TSFileService} from '../ts-file.service';
import {DataTableService} from '../data-table.service';

describe('ImportLabelsStepComponent', () => {
  let component: ImportLabelsStepComponent;
  let fixture: ComponentFixture<ImportLabelsStepComponent>;
  let tsFileService;

  beforeEach(waitForAsync(() => {
    tsFileService = jasmine.createSpyObj('TSFileService', [
      'getTableSlice'
    ]);

    TestBed.configureTestingModule({
      declarations: [ ImportLabelsStepComponent, DataSheetMDTableComponent ],
      imports: [MaterialsModule, NoopAnimationsModule, FormsModule],
      providers: [{provide: TSFileService, useValue: tsFileService}, DataTableService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLabelsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
