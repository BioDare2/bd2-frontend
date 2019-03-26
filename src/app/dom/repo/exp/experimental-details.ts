import {MeasurementDesc} from '../measure/measurement-desc';
import {Environments} from '../conditions/environments';
import {LocalDate} from '../shared/dates';
import {SetAble} from '../../../shared/common-interfaces';

export class ExperimentalDetails implements SetAble<ExperimentalDetails> {


  public measurementDesc: MeasurementDesc;
  public growthEnvironments: Environments;
  public experimentalEnvironments: Environments;

  public executionDate: LocalDate;


  static deserialize(jsonObj: any): ExperimentalDetails {

    jsonObj.measurementDesc = MeasurementDesc.deserialize(jsonObj.measurementDesc);
    jsonObj.growthEnvironments = Environments.deserialize(jsonObj.growthEnvironments);
    jsonObj.experimentalEnvironments = Environments.deserialize(jsonObj.experimentalEnvironments);
    jsonObj.executionDate = LocalDate.deserialize(jsonObj.executionDate);

    const obj = new ExperimentalDetails();
    obj.setAll(jsonObj as any);
    return obj;
  }

  clone(): ExperimentalDetails {
    const other = new ExperimentalDetails();
    other.measurementDesc = this.measurementDesc.clone();
    other.growthEnvironments = this.growthEnvironments.clone();
    other.experimentalEnvironments = this.experimentalEnvironments.clone();
    other.executionDate = this.executionDate;
    return other;
  }

  setAll(other: any): void {
    this.measurementDesc = other.measurementDesc;
    this.growthEnvironments = other.growthEnvironments;
    this.experimentalEnvironments = other.experimentalEnvironments;
    this.executionDate = other.executionDate;
  }

}
