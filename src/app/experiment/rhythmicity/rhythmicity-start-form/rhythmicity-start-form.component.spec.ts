import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RhythmicityStartFormComponent} from './rhythmicity-start-form.component';
import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';
import {StaticContentTestModule} from '../../../documents/static-content_test_tool.spec';
import {TSPlotModule} from '../../../tsdata/plots/ts-plot.module';
import {RhythmicityjobParamsRformComponent} from './rhythmicityjob-params-rform/rhythmicityjob-params-rform.component';
import {MaterialsModule} from '../../../shared/materials.module';

describe('RhythmicityStartFormComponent', () => {
  let component: RhythmicityStartFormComponent;
  let fixture: ComponentFixture<RhythmicityStartFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhythmicityStartFormComponent, RhythmicityjobParamsRformComponent ],
      imports: [ExperimentsTestToolModule, StaticContentTestModule, TSPlotModule, MaterialsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhythmicityStartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
