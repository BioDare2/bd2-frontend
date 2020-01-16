import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTypeMatDialogComponent } from './column-type-mat-dialog.component';

describe('ColumnTypeMatDialogComponent', () => {
  let component: ColumnTypeMatDialogComponent;
  let fixture: ComponentFixture<ColumnTypeMatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnTypeMatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnTypeMatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
