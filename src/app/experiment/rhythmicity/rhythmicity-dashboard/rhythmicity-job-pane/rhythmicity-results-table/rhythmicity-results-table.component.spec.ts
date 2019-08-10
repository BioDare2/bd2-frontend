import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhythmicityResultsTableComponent } from './rhythmicity-results-table.component';

describe('RhythmicityResultsTableComponent', () => {
  let component: RhythmicityResultsTableComponent;
  let fixture: ComponentFixture<RhythmicityResultsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhythmicityResultsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhythmicityResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
