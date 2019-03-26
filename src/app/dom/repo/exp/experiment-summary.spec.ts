import {ExperimentSummary} from './experiment-summary';
import {GeneralDesc} from '../shared/general-desc';
import {SimpleProvenance} from '../shared/simple-provenance';
import {ExperimentalFeatures} from './experimental-features';

describe('ExperimentSummary', () => {


  it('correctly deserializes', () => {

    const jsonTxt = `
{
  "id" : 2,
  "generalDesc" : {
    "name" : "Test experiment",
    "purpose" : "To check code",
    "description" : "A description",
    "comments" : "A commment"
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
  }
}
`;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = ExperimentSummary.deserialize(jsonObj);
    expect(ans).toBeDefined();
    expect(ans.constructor).toBe(ExperimentSummary);
    expect(ans.id).toBe(2);
    expect(ans.generalDesc.constructor).toBe(GeneralDesc);
    expect(ans.provenance.constructor).toBe(SimpleProvenance);
    expect(ans.features.constructor).toBe(ExperimentalFeatures);

  });
});
