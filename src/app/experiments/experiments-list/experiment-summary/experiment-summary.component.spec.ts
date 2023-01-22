import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ExperimentSummaryComponent} from './experiment-summary.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ExperimentSummary} from '../../../dom/repo/exp/experiment-summary';

describe('ExperimentSummaryComponent', () => {
  let component: ExperimentSummaryComponent;
  let fixture: ComponentFixture<ExperimentSummaryComponent>;
  let exp: ExperimentSummary;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentSummaryComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    const jsonTxt = `
{
  "id" : 2,
  "generalDesc" : {
    "name" : "Test experiment",
    "purpose" : "To check code",
    "description" : "A description",
    "comments" : "A commment",
    "executionDate":[2020,1,16]
  },
  "provenance" : {
    "created" : [ 2016, 9, 24, 17, 22, 41, 248000000 ],
    "createdBy" : "creator",
    "modified" : [ 2016, 9, 28, 17, 22, 41, 249000000 ],
    "modifiedBy" : "modifier"
  },
  "features" : {
    "hasTSData" : false,
    "hasPPAJobs" : false,
    "hasDataFiles" : false
  },
  "authors":"Lets  Add, Johny Macarony"
}
`;

    const jsonObj = JSON.parse(jsonTxt);

    exp = ExperimentSummary.deserialize(jsonObj);


    fixture = TestBed.createComponent(ExperimentSummaryComponent);
    component = fixture.componentInstance;
    component.exp = exp;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
