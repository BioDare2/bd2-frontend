import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSheetMDTableComponent } from './data-sheet-mdtable.component';

describe('DataSheetMDTableComponent', () => {
  let component: DataSheetMDTableComponent;
  let fixture: ComponentFixture<DataSheetMDTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSheetMDTableComponent ]
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
