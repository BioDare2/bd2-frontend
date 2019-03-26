import {Institution} from '../actors/institution';

export class Funding {

  public institution: Institution;
  public grantNr: string;

  get name() {
    if (this.grantNr) {
      return this.institution.name + ' [' + this.grantNr + ']';
    }

    return this.institution.name;
  }

  static deserialize(jsonObj: any): Funding {
    const obj = new Funding();

    obj.institution = Institution.deserialize(jsonObj.institution);
    obj.grantNr = jsonObj.grantNr;
    return obj;
  }

}
