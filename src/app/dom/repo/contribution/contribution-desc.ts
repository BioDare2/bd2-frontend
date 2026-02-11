import {Funding} from './funding';
import {Institution} from '../actors/institution';
import {Person} from '../actors/person';
import {SetAble} from '../../../shared/common-interfaces';

/**
 * Description of contributions to an experiment.
 * 
 * Includes authors, curators, institutions, fundings.
 */
export class ContributionDesc implements SetAble<ContributionDesc> {

  public authors: Person[] = [];
  public curators: Person[] = [];
  public institutions: Institution[] = [];
  public fundings: Funding[] = [];

  /* Deserialise a JSON object into a ContributionDesc object */
  static deserialize(jsonObj: any): ContributionDesc {
    const obj = new ContributionDesc();

    obj.authors = jsonObj.authors.map((p: any) => Person.deserialize(p));
    obj.curators = jsonObj.curators.map((p: any) => Person.deserialize(p));
    obj.institutions = jsonObj.institutions.map((i: any) => Institution.deserialize(i));
    obj.fundings = jsonObj.fundings.map((f: any) => Funding.deserialize(f));

    return obj;
  }

  /* Create a clone of a ContributionDesc object with the same attributes */
  clone(): ContributionDesc {
    const other = new ContributionDesc();

    other.authors = this.authors.slice();
    other.curators = this.curators.slice();
    other.institutions = this.institutions.slice();
    other.fundings = this.fundings.slice();
    return other;
  }

  /* Set all attributes from a deserialised JSON object */
  setAll(other: any) {
    this.authors = other.authors;
    this.curators = other.curators;
    this.institutions = other.institutions;
    this.fundings = other.fundings;
  }
}
