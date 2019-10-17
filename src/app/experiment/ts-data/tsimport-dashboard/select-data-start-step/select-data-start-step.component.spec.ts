import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDataStartStepComponent } from './select-data-start-step.component';
import {DataSheetMDTableComponent} from '../data-sheet-mdtable/data-sheet-mdtable.component';
import {MaterialsModule} from '../../../../shared/materials.module';
import {AlertModule} from 'ngx-bootstrap';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {TSFileService} from '../ts-file.service';
import {DataTableService} from '../data-table.service';

describe('SelectDataStartStepComponent', () => {
  let component: SelectDataStartStepComponent;
  let fixture: ComponentFixture<SelectDataStartStepComponent>;
  let tsFileService;

  beforeEach(async(() => {
    tsFileService = jasmine.createSpyObj('TSFileService', [
      'getTableSlice'
    ]);
    TestBed.configureTestingModule({
      declarations: [ SelectDataStartStepComponent, DataSheetMDTableComponent ],
      imports: [MaterialsModule, AlertModule.forRoot(), NoopAnimationsModule, FormsModule],
      providers: [{provide: TSFileService, useValue: tsFileService}, DataTableService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDataStartStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
