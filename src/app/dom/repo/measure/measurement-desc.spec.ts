import {MeasurementDesc} from './measurement-desc';
import {FullParameters, Parameter} from '../param/parameters';

describe('MeasurementDesc', () => {

  let desc: MeasurementDesc;

  beforeEach(() => {
    desc = new MeasurementDesc();
    desc.technique = 'PCR';
    desc.equipment = 'Megatron';
    desc.description = 'A descriptopn';

    const p = new Parameter();
    p.name = 'expositionTime';
    p.value = '2';
    p.unit = ' h';
    desc.parameters.set(p);
  });

  it('setup works', () => {

    expect(desc).toBeDefined();
    expect(desc.technique).toBe('PCR');
    expect(desc.parameters.get('expositionTime').value).toBe('2');
  });

  it('correctly deserializes', () => {

    const jsonTxt = `
{
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
}
`;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = MeasurementDesc.deserialize(jsonObj);
    expect(ans).toBeDefined();
    expect(ans.technique).toBe('Luciferase luminescence');
    expect(ans.equipment).toBe('Topcount 1');
    expect(ans.description).toBe(' A description');
    expect(ans.parameters.constructor).toBe(FullParameters);
    expect(ans.parameters.get('first').value).toBe('2');
    expect(ans.parameters.parameters.size).toBe(4);
  });
});
