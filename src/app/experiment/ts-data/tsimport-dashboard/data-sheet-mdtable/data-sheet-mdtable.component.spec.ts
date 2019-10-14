import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSheetMDTableComponent } from './data-sheet-mdtable.component';
import {MaterialsModule} from '../../../../shared/materials.module';

describe('DataSheetMDTableComponent', () => {
  let component: DataSheetMDTableComponent;
  let fixture: ComponentFixture<DataSheetMDTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSheetMDTableComponent ],
      imports: [MaterialsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSheetMDTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
