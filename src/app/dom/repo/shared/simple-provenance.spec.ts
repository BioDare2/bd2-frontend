import {SimpleProvenance} from './simple-provenance';
import {LocalDateTime} from './dates';

describe('SimpleProvenance', () => {


  it('correctly deserializes', () => {

    const jsonTxt = `
{
  "created" : [ 2016, 9, 24, 11, 49, 36, 965000000 ],
  "createdBy" : "creator",
  "modified" : [ 2016, 9, 28, 11, 49, 36, 968000000 ],
  "modifiedBy" : "modifier"
}
    `;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = SimpleProvenance.deserialize(jsonObj);
    expect(ans).toBeDefined();
    expect(ans.constructor).toBe(SimpleProvenance);
    expect(ans.modified.constructor).toBe(LocalDateTime);
    expect(ans.created.constructor).toBe(LocalDateTime);
    expect(ans.modifiedBy).toBe('modifier');
    expect(ans.createdBy).toBe('creator');

  });
});
