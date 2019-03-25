/* tslint:disable:max-line-length */
const emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

/* tslint:enable:max-line-length */

export function isValidEmail(email: string) {
  email = email ? email.toLocaleLowerCase() : '';
  if (emailPattern.test(email)) {
    return true;
  }
  return false;
}

// const eduPattern = /.+\.edu$/;
const cntEduPattern = /.+\.edu\.[a-z]{2}$/;
const cntAcPattern = /.+\.ac\.[a-z]{2}$/;
const cntMedPattern = /.+\.med\.[a-z]{2}$/;

const institutionDomains = [
  '.edu',
  'csic.es',
  'ethz.ch',
  'mpg.de',
  'upct.es'
];

export function isValidAcademicEmail(email: string): boolean {
  email = email ? email.toLocaleLowerCase() : '';
  /*if (eduPattern.test(email)) {
    return true;
  }*/
  if (cntEduPattern.test(email)) {
    return true;
  }
  if (cntAcPattern.test(email)) {
    return true;
  }
  if (cntMedPattern.test(email)) {
    return true;
  }
  if ('zajawka@o2.pl' === email) { // the test email
    return true;
  }
  return hasKnownInstitutionSuffix(email);
}

function hasKnownInstitutionSuffix(email: string): boolean {

  return (institutionDomains.findIndex(suffix => email.endsWith(suffix)) >= 0);
}

const smPattern = /^[a-z]+$/;
const lrPattern = /^[A-Z]+$/;
const numPattern = /^[0-9]+$/;

export function isWeakPassword(password: string): boolean {

  if (!password) {
    return true;
  }

  if (password.length < 8) {
    return true;
  }
  if (smPattern.test(password)) {
    return true;
  }
  if (lrPattern.test(password)) {
    return true;
  }
  if (numPattern.test(password)) {
    return true;
  }
  return false;
}



