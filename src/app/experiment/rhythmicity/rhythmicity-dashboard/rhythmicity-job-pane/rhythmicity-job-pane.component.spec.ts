import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RhythmicityJobPaneComponent} from './rhythmicity-job-pane.component';
import {ExperimentsTestToolModule} from '../../../experiment_test_tool.spec';
import {StaticContentTestModule} from '../../../../documents/static-content_test_tool.spec';
import {PValueFormComponent} from './pvalue-form/pvalue-form.component';
import {RhythmicityResultsMDTableComponent} from './rhythmicity-results-mdtable/rhythmicity-results-mdtable.component';
import {MaterialsModule} from '../../../../shared/materials.module';
import {StatTestOptionsWidgetComponent} from './stat-test-options-widget/stat-test-options-widget.component';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [ExperimentsTestToolModule, StaticContentTestModule, MaterialsModule],
  exports: [ExperimentsTestToolModule, RhythmicityJobPaneComponent],
  declarations: [RhythmicityJobPaneComponent,
    PValueFormComponent,
    StatTestOptionsWidgetComponent,
    RhythmicityResultsMDTableComponent]
})
export class RhythmicityJobPaneComponentTestModule {
}

describe('RhythmicityJobPaneComponent', () => {
  let component: RhythmicityJobPaneComponent;
  let fixture: ComponentFixture<RhythmicityJobPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [RhythmicityJobPaneComponentTestModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhythmicityJobPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
