import {GeneralDesc} from './general-desc';

describe('GeneralDesc', () => {

  let desc: GeneralDesc;

  beforeEach(() => {

    desc = new GeneralDesc();
    desc.name = 'Cos tam';
    desc.purpose = 'Becouse';
    desc.description = 'Description';
    desc.comments = 'Comments';

  });

  it('setup worsk', () => {

    expect(desc).toBeDefined();
    expect(desc.name).toBe('Cos tam');
  });

  it('correctly deserializes', () => {

    const jsonTxt = `
{"name":"Test experiment","purpose":"To check code","description":"A description","comments":"A commment"}
    `;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = GeneralDesc.deserialize(jsonObj);
    expect(ans).toBeDefined();
    expect(ans.name).toBe('Test experiment');
    expect(ans.purpose).toBe('To check code');
    expect(ans.description).toBe('A description');
    expect(ans.comments).toBe('A commment');
  });

});
