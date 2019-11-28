import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

import {RhythmicityResultsMDTableComponent} from './rhythmicity-results-mdtable.component';
import {RhythmicityResultsMDTableDataSource} from '../rhythmicity-results-mdtable-datasource';
import {MaterialsModule} from "../../../../../shared/materials.module";

describe('RhythmicityResultsMDTableComponent', () => {
  let component: RhythmicityResultsMDTableComponent;
  let fixture: ComponentFixture<RhythmicityResultsMDTableComponent>;

  beforeEach(async(() => {

    const rhythmicityService = jasmine.createSpyObj('RhythmicityService', [
      'getResults'
    ]);

    const dataSource = new RhythmicityResultsMDTableDataSource(rhythmicityService);

    TestBed.configureTestingModule({
      declarations: [ RhythmicityResultsMDTableComponent ],
      imports: [
        NoopAnimationsModule, MaterialsModule
      ],
      providers: [
        {provide: RhythmicityResultsMDTableDataSource, useValue: dataSource}
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
