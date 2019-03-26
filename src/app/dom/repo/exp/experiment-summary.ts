import {GeneralDesc} from '../shared/general-desc';
import {SimpleProvenance} from '../shared/simple-provenance';
import {ExperimentalFeatures} from './experimental-features';

export class ExperimentSummary {

  id: number;
  generalDesc: GeneralDesc;

  provenance: SimpleProvenance;
  features: ExperimentalFeatures;

  get name() {
    return this.generalDesc.name;
  }

  static deserialize(jsonObj: any): ExperimentSummary {

    const obj = new ExperimentSummary();
    obj.id = jsonObj.id;
    obj.generalDesc = GeneralDesc.deserialize(jsonObj.generalDesc);
    obj.provenance = SimpleProvenance.deserialize(jsonObj.provenance);
    obj.features = ExperimentalFeatures.deserialize(jsonObj.features);
    return obj;
  }

}
