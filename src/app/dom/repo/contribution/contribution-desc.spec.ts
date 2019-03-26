import {Person} from '../actors/person';
import {Institution} from '../actors/institution';
import {Funding} from './funding';
import {ContributionDesc} from './contribution-desc';

describe('ContributionDesc', () => {

  let authors: Person[];
  let curators: Person[];
  let institutions: Institution[];
  let fundings: Funding[];
  let contr: ContributionDesc;

  beforeEach(() => {

    authors = [];
    let p = new Person();
    p.firstName = 'Tomasz';
    p.lastName = 'Zielinski';

    authors.push(p);

    curators = [];
    p = new Person();
    p.firstName = 'Ja';
    p.lastName = 'Cezar';
    curators.push(p);

    institutions = [];

    let i = new Institution();
    i.name = 'UoE';
    institutions.push(i);

    i = new Institution();
    i.name = 'BBSRC';
    const f = new Funding();
    f.institution = i;
    f.grantNr = 'AB11';

    fundings = [];
    fundings.push(f);

    contr = new ContributionDesc();
    contr.authors = authors;
    contr.curators = curators;
    contr.institutions = institutions;
    contr.fundings = fundings;

  });

  it('setup works', () => {
    expect(contr).toBeDefined();
    expect(contr.authors).toBe(authors);
    expect(contr.curators).toBe(curators);
    expect(contr.institutions).toBe(institutions);
    expect(contr.fundings).toBe(fundings);
  });

  it('correctly deserializes', () => {

    const jsonTxt = `
{
  "authors" : [ {
    "id" : 2,
    "login" : "test",
    "firstName" : "Fisttest",
    "lastName" : "Lasttest",
    "ORCID" : null
  } ],
  "curators" : [ {
    "id" : 3,
    "login" : "curator",
    "firstName" : "Fistcurator",
    "lastName" : "Lastcurator",
    "ORCID" : null
  } ],
  "institutions" : [ {
    "id" : 5,
    "name" : "Cambridge",
    "longName" : "University Cambridge",
    "address" : "Cambridge in Edinburgh",
    "web" : "www.Cambridge.ed.ac"
  }, {
    "id" : 6,
    "name" : "Fife",
    "web" : "www.Fife.ed.ac"
  } ],
  "fundings" : [ {
    "institution" : {
      "id" : 4,
      "name" : "UoE",
      "longName" : "University UoE",
      "address" : "UoE in Edinburgh",
      "web" : "www.UoE.ed.ac"
    },
    "grantNr" : "123"
  } ]
}    `;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = ContributionDesc.deserialize(jsonObj);
    expect(ans).toBeDefined();
    expect(ans.authors.length).toBe(1);
    ans.authors.forEach(a => expect(a.constructor).toBe(Person));
    expect(ans.curators.length).toBe(1);
    ans.curators.forEach(a => expect(a.constructor).toBe(Person));
    expect(ans.institutions.length).toBe(2);
    ans.institutions.forEach(a => expect(a.constructor).toBe(Institution));
    expect(ans.fundings.length).toBe(1);
    ans.fundings.forEach(a => expect(a.constructor).toBe(Funding));

  });

});
