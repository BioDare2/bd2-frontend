import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {RhythmicityResultsMDTableComponent} from './rhythmicity-results-mdtable.component';
import {RhythmicityResultsFetcherService} from '../services/rhythmicity-results-fetcher.service';
import {MaterialsModule} from '../../../../../shared/materials.module';
import {RhythmicityService} from '../../../rhythmicity.service';

describe('RhythmicityResultsMDTableComponent', () => {
  let component: RhythmicityResultsMDTableComponent;
  let fixture: ComponentFixture<RhythmicityResultsMDTableComponent>;

  beforeEach(waitForAsync(() => {

    const rhythmicityService = jasmine.createSpyObj('RhythmicityService', [
      'getResults'
    ]);

    const dataSource = new RhythmicityResultsFetcherService(rhythmicityService);

    TestBed.configureTestingModule({
      declarations: [ RhythmicityResultsMDTableComponent ],
      imports: [
        NoopAnimationsModule, MaterialsModule
      ],
      providers: [
        {provide: RhythmicityResultsFetcherService, useValue: dataSource},
        {provide: RhythmicityService, useValue: rhythmicityService}
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
