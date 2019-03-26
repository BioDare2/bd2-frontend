import {Institution} from './institution';

describe('Institution', () => {

  let inst: Institution;

  beforeEach(() => {
    inst = new Institution();
    inst.address = 'here';
    inst.longName = 'Long inst';
    inst.id = 23;
    inst.name = 'INST';
    inst.web = 'www.inst.ed';
  });

  it('setup works', () => {

    expect(inst).toBeDefined();
    expect(inst.name).toBe('INST');
    expect(inst.id).toBe(23);
  });

  it('correctly deserializes', () => {

    const jsonTxt = `
      {"id":2,"name":"UoE","longName":"University UoE","address":"UoE in Edinburgh","web":"www.UoE.ed.ac"}
    `;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = Institution.deserialize(jsonObj);
    expect(ans).toBeDefined();
    expect(ans.id).toBe(2);
    expect(ans.name).toBe('UoE');
    expect(ans.longName).toBe('University UoE');
    expect(ans.address).toBe('UoE in Edinburgh');
    expect(ans.web).toBe('www.UoE.ed.ac');
  });

});
