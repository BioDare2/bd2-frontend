import {Person} from './person';

describe('Person', () => {

  let person: Person;

  beforeEach(() => {
    person = new Person();
    person.id = 2;
    person.login = 'demo';
    person.firstName = 'first';
    person.lastName = 'second';
    person.ORCID = '123-234';
  });

  it('setup works', () => {
    expect(person).toBeDefined();
    expect(person.login).toBe('demo');
  });

  it('correctly deserializes', () => {

    const jsonTxt = `
      {"id":12,"login":"test","firstName":"Tomasz","lastName":"Zieli","ORCID":"123-124-123-123"}
    `;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = Person.deserialize(jsonObj);
    expect(ans).toBeDefined();
    expect(ans.id).toBe(12);
    expect(ans.login).toBe('test');
    expect(ans.firstName).toBe('Tomasz');
    expect(ans.lastName).toBe('Zieli');
    expect(ans.ORCID).toBe('123-124-123-123');
  });

});
