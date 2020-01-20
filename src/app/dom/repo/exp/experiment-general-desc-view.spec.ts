import {ExperimentGeneralDescView} from './experiment-general-desc-view';
import {LocalDate} from '../shared/dates';


describe('ExperimentGeneralDescView', () => {

  let desc: ExperimentGeneralDescView;

  beforeEach(() => {

    desc = new ExperimentGeneralDescView();
    desc.name = 'Cos tam';
    desc.purpose = 'Becouse';
    desc.description = 'Description';
    desc.comments = 'Comments';
    desc.executionDate = new LocalDate(2020, 1, 20);

  });

  it('setup worsk', () => {

    expect(desc).toBeDefined();
    expect(desc.name).toBe('Cos tam');
  });

  it('correctly deserializes', () => {

    const jsonTxt = `
{"name":"Test experiment","purpose":"To check code","description":"A description","comments":"A commment","executionDate" : [ 2016, 9, 23 ]}
    `;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = ExperimentGeneralDescView.deserialize(jsonObj);
    expect(ans).toBeDefined();
    expect(ans.name).toBe('Test experiment');
    expect(ans.purpose).toBe('To check code');
    expect(ans.description).toBe('A description');
    expect(ans.comments).toBe('A commment');
    expect(ans.executionDate.constructor).toBe(LocalDate);
    expect(ans.executionDate).toEqual(new LocalDate(2016, 9, 23));
  });

  it('correctly serializes', ()=> {
    const txt = JSON.stringify(desc);
    expect(txt).toBeTruthy();

    expect(txt).toContain('"name":"Cos tam"');
    expect(txt).toContain('"executionDate":[2020,1,20]');
  });

});
