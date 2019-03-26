import {Funding} from './funding';
import {Institution} from '../actors/institution';

describe('Funding', () => {

  let funding: Funding;
  let inst: Institution;

  beforeEach(() => {

    inst = new Institution();
    inst.name = 'BBSRC';
    inst.id = 2;

    funding = new Funding();
    funding.grantNr = '123';
    funding.institution = inst;
  });

  it('setup works', () => {

    expect(funding).toBeDefined();
    expect(funding.institution.name).toBe('BBSRC');
  });

  it('correctly deserializes', () => {

    const jsonTxt = `
  {"institution":{"id":2,"name":"UoE","longName":"University UoE","address":"UoE in Edinburgh","web":"www.UoE.ed.ac"},"grantNr":"1234"}
    `;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = Funding.deserialize(jsonObj);
    expect(ans).toBeDefined();
    expect(ans.institution.name).toBe('UoE');
    expect(ans.institution.constructor).toBe(inst.constructor);
    expect(ans.grantNr).toBe('1234');

  });
});
