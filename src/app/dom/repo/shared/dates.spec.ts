import {LocalDate, LocalDateTime} from './dates';

describe('Dates', () => {


  describe('LocalDate', () => {

    it('correctly deserializes', () => {

      const jsonTxt = `
      [ 2016, 9, 22 ]
    `;

      const jsonObj = JSON.parse(jsonTxt);

      const ans = LocalDate.deserialize(jsonObj);
      expect(ans).toBeDefined();
      expect(ans.constructor).toBe(LocalDate);
      expect(ans.date).toEqual(new Date(2016, 8, 22));

    });

    it('correctly deserializes null', () => {

      const jsonTxt = ` {
       "executionDate":null
      }
    `;

      const jsonObj = JSON.parse(jsonTxt);

      const ans = LocalDate.deserialize(jsonObj.executionDate);
      expect(ans).toBeNull();

    });


    it('correctly serializes', () => {


      const date = new LocalDate(2015, 12, 10);
      const txt = JSON.stringify(date);
      expect(txt).toBe('[2015,12,10]');
    });


  });

  describe('LocalDateTime', () => {

    it('correctly deserializes', () => {

      const jsonTxt = `
      [ 2016, 9, 24, 11, 49, 36, 965000000 ]
    `;

      const jsonObj = JSON.parse(jsonTxt);

      const ans = LocalDateTime.deserialize(jsonObj);
      expect(ans).toBeDefined();
      expect(ans.constructor).toBe(LocalDateTime);
      expect(ans.date).toEqual(new Date(2016, 8, 24, 11, 49, 36, 965000000));

    });

    it('correctly deserializes null', () => {

      const jsonTxt = ` {
       "executionDate":null
      }
    `;

      const jsonObj = JSON.parse(jsonTxt);

      const ans = LocalDateTime.deserialize(jsonObj.executionDate);
      expect(ans).toBeNull();

    });


    it('correctly serializes', () => {


      const date = new LocalDateTime(2015, 12, 10, 11, 23);
      const txt = JSON.stringify(date);
      expect(txt).toBe('[2015,12,10,11,23,0,0]');
    });


  });
});
