import {GeneralDesc} from '../shared/general-desc';
import {LocalDate} from '../shared/dates';

export class ExperimentGeneralDescView extends GeneralDesc {
  public executionDate: LocalDate;

  static deserialize(jsonObj: any): ExperimentGeneralDescView {

    jsonObj.executionDate = LocalDate.deserialize(jsonObj.executionDate);
    const obj = new ExperimentGeneralDescView();
    obj.setAll(jsonObj);
    return obj;
  }

  setAll(other: any) {
    super.setAll(other);
    this.executionDate = other.executionDate;
  }

  clone(): ExperimentGeneralDescView {
    const other = new ExperimentGeneralDescView();
    other.setAll(this);
    return other;
  }
}
