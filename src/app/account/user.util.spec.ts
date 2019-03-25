
import {isValidEmail, isValidAcademicEmail, isWeakPassword} from './user.util';

describe('User util', () => {


  it('rejects bad emails', () => {

    const bad = ['short', 'only@smal@llet', 'ONLY_CAPITAL@ed.pl.', 'ONLY space@ed.pl.'];

    bad.forEach(e => {
      expect(isValidEmail(e)).toBe(false);
    });

  });

  it('accepts valid emails', () => {

    const good = ['biodare@ed.ac.uk', 'bio.dare12@ed.ac.uk'];

    good.forEach(e => {
      expect(isValidEmail(e)).toBe(true);
    });

  });

  it('accepts academic emails', () => {

    const good = [                'tz@havrard.edu',
      'cos.ktos@bla.tra-st.edu',
      'ja.tez@ed.ac.uk',
      'ja.tez@ed.edu.uk',
      'ktos@waw.ac.pl',
      'elalmo@ngha.med.sa',
      'zajawka@o2.pl' // the test email
    ];

    good.forEach(e => {
      expect(isValidAcademicEmail(e)).toBe(true);
    });

  });

  it('accepts known institutions emails', () => {

    const good = [

      'test@cid.csic.es',
      'cos.ktos@ethz.ch',
      'ja.tez@mpimp-golm.mpg.de',
      'ja.tez@upct.es',
      'ktos@waw.ac.pl'
    ];

    good.forEach(e => {
      expect(isValidAcademicEmail(e)).toBe(true);
    });

  });

  it('rejects nonacademic emails', () => {

    const bad = [                'tz@havrard.ed',
      'cos.ktos@bla.tra-st.edu.org',
      'cos.ktos@bla.tra-st.edu.com',
      'ja.tez@ed.edu.org',
      'ktos@waw.ac.com',
      'ja.tez@ed.edu.biz',
      'elalmo@ngha.med.com',
      'elalmo@nghamed.sa',
      'elalmo@ngha.med.sa.com',
      'zielu@o2.pl'
    ];

    bad.forEach(e => {
      expect(isValidAcademicEmail(e)).toBe(false);
    });

  });

  it('rejects weak passwords', () => {

    const weak = ['short', 'onlysmalllet', 'ONLYCAPITAL', '12345678910'];

    weak.forEach(p => {
      expect(isWeakPassword(p)).toBe(true);
    });

  });
});
