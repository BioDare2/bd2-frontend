import {Institution} from '../actors/institution';

/**
 * Funding
 * 
 * Represents funding information for an experiment.
 * Includes the funding institution and an optional grant number.
 */
export class Funding {

  public institution: Institution;
  public grantNr: string;

  /* Get the display name for the funding source */
  get name() {
    if (this.grantNr) {
      return this.institution.name + ' [' + this.grantNr + ']';
    }

    return this.institution.name;
  }

  /** Deserialize a Funding object from a JSON representation */
  static deserialize(jsonObj: any): Funding {
    const obj = new Funding();

    obj.institution = Institution.deserialize(jsonObj.institution);
    obj.grantNr = jsonObj.grantNr;
    return obj;
  }
}
