import {FullParameters, Parameter} from './parameters';

describe('Paramters', () => {


  describe('Parameter', () => {

    let param: Parameter;

    beforeEach(() => {

      param = new Parameter();
      param.name = 'p1';
      param.value = '2';
      param.label = 'A param';
      param.unit = 'm/s';

    });

    it('setup works', () => {

      expect(param).toBeDefined();
      expect(param.name).toBe('p1');
      expect(param.value).toBe('2');
    });

    it('correctly deserializes', () => {

      const jsonTxt = `
      {"name":"param1","value":"value1","label":"a label","unit":"a unit"}
    `;

      const jsonObj = JSON.parse(jsonTxt);

      const ans = Parameter.deserialize(jsonObj);
      expect(ans).toBeDefined();
      expect(ans.constructor).toBe(Parameter);
      expect(ans.name).toBe('param1');
      expect(ans.value).toBe('value1');
    });

    describe('FullParameters', () => {

      let params: FullParameters;
      beforeEach(() => {

        params = new FullParameters();
        params.set(param);
      });

      it('setup works', () => {

        expect(param).toBeDefined();
        expect(params).toBeDefined();
        expect(params.parameters.get(param.name)).toBe(param);
      });

      it('correctly deserializes', () => {

        const jsonTxt = `
[ {
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
`;

        const jsonObj = JSON.parse(jsonTxt);

        const ans = FullParameters.deserialize(jsonObj);
        expect(ans).toBeDefined();
        expect(ans.constructor).toBe(FullParameters);
        expect(ans.parameters.size).toBe(4);
        expect(ans.parameters.get('second').value).toBe('3');
        expect(ans.parameters.get('second').constructor).toBe(Parameter);
        ans.parameters.forEach((p, k) => {
          expect(p.constructor).toBe(Parameter);
        });
      });

      it('correctly serializes', () => {

        const param2 = new Parameter();
        param2.name = 'p2';
        param2.value = 'cos';
        params.set(param2);

        const jsonTxt = JSON.stringify(params);
        // console.log(jsonTxt);
        const obj: any[] = JSON.parse(jsonTxt);

        expect(obj.length).toBe(2);
        obj.forEach((p: any) => {
          expect(p.name).toBeDefined();
          expect(p.value).toBeDefined();
        });
      });

    });
  });
});
