import {SecuritySummary} from './security-summary';

describe('SecuritySummary', () => {

  it('correctly deserializes', () => {

    const jsonTxt = `
{
  "canRead" : true,
  "canWrite" : true,
  "isOwner" : true,
  "isSuperOwner" : false
}
    `;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = SecuritySummary.deserialize(jsonObj);
    expect(ans).toBeDefined();
    expect(ans.constructor).toBe(SecuritySummary);
    expect(ans.canRead).toBe(true);
    expect(ans.canWrite).toBe(true);
    expect(ans.isOwner).toBe(true);
    expect(ans.isSuperOwner).toBe(false);

  });
});
