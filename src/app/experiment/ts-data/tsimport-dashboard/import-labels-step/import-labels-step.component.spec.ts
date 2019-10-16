import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLabelsStepComponent } from './import-labels-step.component';
import {MaterialsModule} from '../../../../shared/materials.module';
import {AlertModule} from 'ngx-bootstrap';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {DataSheetMDTableComponent} from '../data-sheet-mdtable/data-sheet-mdtable.component';
import {TSFileService} from '../ts-file.service';

describe('ImportLabelsStepComponent', () => {
  let component: ImportLabelsStepComponent;
  let fixture: ComponentFixture<ImportLabelsStepComponent>;
  let tsFileService;

  beforeEach(async(() => {
    tsFileService = jasmine.createSpyObj('TSFileService', [
      'getTableSlice'
    ]);

    TestBed.configureTestingModule({
      declarations: [ ImportLabelsStepComponent, DataSheetMDTableComponent ],
      imports: [MaterialsModule, AlertModule.forRoot(), NoopAnimationsModule, FormsModule],
      providers: [{provide: TSFileService, useValue: tsFileService}]
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
