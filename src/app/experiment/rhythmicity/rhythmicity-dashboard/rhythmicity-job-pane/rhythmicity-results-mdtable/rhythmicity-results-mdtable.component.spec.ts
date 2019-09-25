import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { RhythmicityResultsMDTableComponent } from './rhythmicity-results-mdtable.component';
import {RhythmicityResultsMDTableDataSource} from '../rhythmicity-results-mdtable-datasource';
import {Subject} from 'rxjs';
import {ExperimentalAssayView} from '../../../../../dom/repo/exp/experimental-assay-view';
import {RhythmicityJobSummary} from '../../../rhythmicity-dom';

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

    const rhythmicityService = jasmine.createSpyObj('RhythmicityService', [
      'getResults'
    ]);

    // const job$ = new Subject<[ExperimentalAssayView, RhythmicityJobSummary]>();
    const dataSource = new RhythmicityResultsMDTableDataSource(rhythmicityService);
    component.dataSource = dataSource;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
