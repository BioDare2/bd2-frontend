import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhythmicityJobPaneComponent } from './rhythmicity-job-pane.component';
import {ExperimentsTestToolModule} from "../../../experiment_test_tool.spec";
import {StaticContentTestModule} from "../../../../documents/static-content_test_tool.spec";

describe('RhythmicityJobPaneComponent', () => {
  let component: RhythmicityJobPaneComponent;
  let fixture: ComponentFixture<RhythmicityJobPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhythmicityJobPaneComponent ],
      imports: [ExperimentsTestToolModule, StaticContentTestModule]
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
