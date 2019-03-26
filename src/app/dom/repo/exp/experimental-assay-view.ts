import {GeneralDesc} from '../shared/general-desc';
import {ContributionDesc} from '../contribution/contribution-desc';
import {ExperimentalDetails} from './experimental-details';
import {SecuritySummary} from '../security/security-summary';
import {SimpleProvenance} from '../shared/simple-provenance';
import {ExperimentalFeatures} from './experimental-features';
import {SetAble} from '../../../shared/common-interfaces';
import {DataCategory} from '../biodesc/data-category';

export class ExperimentalAssayView implements SetAble<ExperimentalAssayView> {

  id: number;
  generalDesc = new GeneralDesc();
  contributionDesc = new ContributionDesc();
  experimentalDetails = new ExperimentalDetails();

  features: ExperimentalFeatures;

  // bioDescription:BiologicalDescription;
  // bioSummary:BiologySummary;
  species: string;
  dataCategory: DataCategory;

  provenance: SimpleProvenance;
  security: SecuritySummary;

  get name(): string {
    return this.generalDesc.name;
  }

  static deserialize(jsonObj: any): ExperimentalAssayView {

    const obj = new ExperimentalAssayView();
    obj.id = jsonObj.id;
    obj.generalDesc = GeneralDesc.deserialize(jsonObj.generalDesc);
    obj.contributionDesc = ContributionDesc.deserialize(jsonObj.contributionDesc);
    obj.experimentalDetails = ExperimentalDetails.deserialize(jsonObj.experimentalDetails);
    obj.features = ExperimentalFeatures.deserialize(jsonObj.features);
    // obj.bioDescription = BiologicalDescription.deserialize(jsonObj.bioDescription);
    // obj.bioSummary = BiologySummary.deserialize(jsonObj.bioSummary);
    obj.species = jsonObj.species;
    obj.dataCategory = DataCategory.deserialize(jsonObj.dataCategory);
    obj.provenance = SimpleProvenance.deserialize(jsonObj.provenance);
    obj.security = SecuritySummary.deserialize(jsonObj.security);

    return obj;
  }

  clone(): ExperimentalAssayView {
    const other = new ExperimentalAssayView();
    other.id = this.id;
    other.generalDesc = this.generalDesc.clone();
    other.contributionDesc = this.contributionDesc.clone();
    other.experimentalDetails = this.experimentalDetails.clone();
    other.features = this.features;
    // other.bioDescription = this.bioDescription.clone();
    // other.bioSummary = this.bioSummary;
    other.species = this.species;
    other.dataCategory = this.dataCategory;

    other.provenance = this.provenance;
    other.security = this.security;
    return other;
  }

  setAll(other: any): void {
    this.id = other.id;
    this.generalDesc = other.generalDesc;
    this.contributionDesc = other.contributionDesc;
    this.experimentalDetails = other.experimentalDetails;
    this.features = other.features;
    // this.bioDescription = other.bioDescription;
    // this.bioSummary = other.bioSummary;
    this.species = other.species;
    this.dataCategory = other.dataCategory;
    this.provenance = other.provenance;
    this.security = other.security;
  }

}
