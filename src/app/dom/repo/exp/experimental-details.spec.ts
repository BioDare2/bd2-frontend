import {ExperimentalDetails} from './experimental-details';
import {MeasurementDesc} from '../measure/measurement-desc';
import {Environments} from '../conditions/environments';
import {LocalDate} from '../shared/dates';


describe('ExperimentalDetails', () => {


  it('correctly deserializes', () => {

    const jsonTxt = `
{
  "measurementDesc" : {
    "technique" : "Luciferase luminescence",
    "equipment" : "Topcount 1",
    "description" : " A description",
    "parameters" : [ {
      "name" : "last",
      "value" : "a value"
    }, {
      "name" : "first",
      "value" : "2",
      "label" : "first param",
      "unit" : "a unit"
    }, {
      "name" : "second",
      "value" : "3",
      "label" : "2n param"
    }, {
      "name" : "empty"
    } ]
  },
  "growthEnvironments" : {
    "environments" : [ {
      "name" : "LL",
      "description" : "Desc"
    }, {
      "name" : "LD",
      "description" : null
    } ]
  },
  "experimentalEnvironments" : {
    "environments" : [ {
      "name" : "LL",
      "description" : "Desc"
    }, {
      "name" : "LD",
      "description" : null
    } ]
  },
  "executionDate" : [ 2016, 9, 23 ]
}
`;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = ExperimentalDetails.deserialize(jsonObj);
    expect(ans).toBeDefined();

    expect(ans.measurementDesc.constructor).toBe(MeasurementDesc);
    expect(ans.growthEnvironments.constructor).toBe(Environments);
    expect(ans.experimentalEnvironments.constructor).toBe(Environments);
    expect(ans.executionDate.constructor).toBe(LocalDate);

  });


  it('correctly serializes', () => {

    const jsonTxt = `
{
  "measurementDesc" : {
    "technique" : "Luciferase luminescence",
    "equipment" : "Topcount 1",
    "description" : " A description",
    "parameters" : [ {
      "name" : "last",
      "value" : "a value"
    }, {
      "name" : "first",
      "value" : "2",
      "label" : "first param",
      "unit" : "a unit"
    }, {
      "name" : "second",
      "value" : "3",
      "label" : "2n param"
    }, {
      "name" : "empty"
    } ]
  },
  "growthEnvironments" : {
    "environments" : [ {
      "name" : "LL",
      "description" : "Desc"
    }, {
      "name" : "LD",
      "description" : null
    } ]
  },
  "experimentalEnvironments" : {
    "environments" : [ {
      "name" : "LL",
      "description" : "Desc"
    }, {
      "name" : "LD",
      "description" : null
    } ]
  },
  "executionDate" : [ 2016, 9, 23 ]
}
`;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = ExperimentalDetails.deserialize(jsonObj);
    expect(ans).toBeDefined();

    const txt = JSON.stringify(ans);
    if (txt) {
    }
    // console.log('EXP DETAILS\n'+txt);

  });


  it('correctly deserializes draft', () => {
    /* tslint:disable:max-line-length */
    const jsonTxt = `
{"id":0,"generalDesc":{"name":null,"purpose":null,"description":null,"comments":null},"contributionDesc":{"authors":[{"id":5,"login":"user1","firstName":"First","lastName":"User","ORCID":null}],"curators":[],"institutions":[],"fundings":[]},"experimentalDetails":{"measurementDesc":{"technique":null,"equipment":null,"description":null,"parameters":[]},"growthEnvironments":{"environments":[]},"experimentalEnvironments":{"environments":[]},"executionDate":[2016,9,23]},"features":{"hasTSData":false,"hasPPAJobs":false,"hasDataFiles":false},"provenance":{"created":null,"createdBy":null,"modified":null,"modifiedBy":null}}
`;
    /* tslint:enable:max-line-length */
    const jsonObj = JSON.parse(jsonTxt);

    const ans = ExperimentalDetails.deserialize(jsonObj.experimentalDetails);
    expect(ans).toBeDefined();

    expect(ans.measurementDesc.constructor).toBe(MeasurementDesc);
    expect(ans.growthEnvironments.constructor).toBe(Environments);
    expect(ans.experimentalEnvironments.constructor).toBe(Environments);
    expect(ans.executionDate.constructor).toBe(LocalDate);

  });

});
