import {ExperimentalFeatures} from './experimental-features';

describe('ExperimentalFeatures', () => {

  it('correctly deserializes', () => {

    const jsonTxt = `
{
  "hasAttachments" : true,
  "hasTSData" : true,
  "hasPPAJobs" : false,
  "hasDataFiles" : true,
  "attachmentsSize" : 2,
  "isOpenAccess": true,
  "licence": "CC_BY"
}
    `;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = ExperimentalFeatures.deserialize(jsonObj);
    expect(ans).toBeDefined();
    expect(ans.constructor).toBe(ExperimentalFeatures);
    expect(ans.hasAttachments).toBe(true);
    expect(ans.hasTSData).toBe(true);
    expect(ans.hasPPAJobs).toBe(false);
    expect(ans.hasDataFiles).toBe(true);
    expect(ans.attachmentsSize).toBe(2);
    expect(ans.isOpenAccess).toBe(true);
    expect(ans.licence).toBe('CC_BY');

  });

});
