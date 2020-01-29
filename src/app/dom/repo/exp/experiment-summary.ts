import {SimpleProvenance} from '../shared/simple-provenance';
import {ExperimentalFeatures} from './experimental-features';
import {ExperimentGeneralDescView} from './experiment-general-desc-view';

export class ExperimentSummary {

  id: number;
  generalDesc: ExperimentGeneralDescView;

  provenance: SimpleProvenance;
  features: ExperimentalFeatures;

  authors: string;

  get name() {
    return this.generalDesc.name;
  }

  static deserialize(jsonObj: any): ExperimentSummary {

    const obj = new ExperimentSummary();
    obj.id = jsonObj.id;
    obj.generalDesc = ExperimentGeneralDescView.deserialize(jsonObj.generalDesc);
    obj.provenance = SimpleProvenance.deserialize(jsonObj.provenance);
    obj.features = ExperimentalFeatures.deserialize(jsonObj.features);
    obj.authors = jsonObj.authors;
    return obj;
  }

}
