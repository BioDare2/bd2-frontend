import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLabelsStepComponent } from './assign-labels-step.component';
import {DefineTimeStepComponent} from "../define-time-step/define-time-step.component";
import {DataSheetMDTableComponent} from "../data-sheet-mdtable/data-sheet-mdtable.component";
import {MaterialsModule} from "../../../../shared/materials.module";
import {AlertModule} from "ngx-bootstrap";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {TSFileService} from "../ts-file.service";
import {DataTableService} from "../data-table.service";
import {SelectableRegionMDTableComponent} from "./selectable-region-mdtable/selectable-region-mdtable.component";

describe('AssignLabelsStepComponent', () => {
  let component: AssignLabelsStepComponent;
  let fixture: ComponentFixture<AssignLabelsStepComponent>;
  let tsFileService;

  beforeEach(async(() => {

    tsFileService = jasmine.createSpyObj('TSFileService', [
      'getTableSlice'
    ]);

    TestBed.configureTestingModule({
      declarations: [ AssignLabelsStepComponent , SelectableRegionMDTableComponent ],
      imports: [MaterialsModule, AlertModule.forRoot(), NoopAnimationsModule, FormsModule],
      providers: [{provide: TSFileService, useValue: tsFileService}, DataTableService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignLabelsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
