import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { RhythmicityResultsMDTableComponent } from './rhythmicity-results-mdtable.component';

describe('RhythmicityResultsMDTableComponent', () => {
  let component: RhythmicityResultsMDTableComponent;
  let fixture: ComponentFixture<RhythmicityResultsMDTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhythmicityResultsMDTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhythmicityResultsMDTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
