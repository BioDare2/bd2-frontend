import {GeneralDesc} from '../shared/general-desc';
import {ContributionDesc} from '../contribution/contribution-desc';
import {ExperimentalDetails} from './experimental-details';

export class ExperimentalAssay {

  id: number;
  generalDesc = new GeneralDesc();
  contributionDesc = new ContributionDesc();
  experimentalDetails = new ExperimentalDetails();

  get name(): string {
    return this.generalDesc.name;
  }

  static deserialize(jsonObj: any): ExperimentalAssay {

    jsonObj.generalDesc = GeneralDesc.deserialize(jsonObj.generalDesc);
    jsonObj.contributionDesc = ContributionDesc.deserialize(jsonObj.contributionDesc);
    jsonObj.experimentalDetails = ExperimentalDetails.deserialize(jsonObj.experimentalDetails);

    const obj = new ExperimentalAssay();
    obj.setAll(jsonObj as any);
    return obj;
  }

  setAll(other: any): void {
    this.id = other.id;
    this.generalDesc = other.generalDesc;
    this.contributionDesc = other.contributionDesc;
    this.experimentalDetails = other.experimentalDetails;
  }

}
