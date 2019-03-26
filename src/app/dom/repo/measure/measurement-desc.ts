import {FullParameters} from '../param/parameters';
import {SetAble} from '../../../shared/common-interfaces';

export class MeasurementDesc implements SetAble<MeasurementDesc> {

  technique: string;
  equipment: string;
  description: string;
  parameters: FullParameters = new FullParameters();

  static deserialize(jsonObj: any): MeasurementDesc {
    const obj = new MeasurementDesc();
    jsonObj.parameters = FullParameters.deserialize(jsonObj.parameters);
    obj.setAll(jsonObj);
    return obj;
  }

  clone(): MeasurementDesc {
    const other = new MeasurementDesc();
    other.technique = this.technique;
    other.equipment = this.equipment;
    other.description = this.description;
    other.parameters = this.parameters.clone();
    return other;
  }

  setAll(other: any) {
    // console.log("Set all called: ",other);
    this.technique = other.technique;
    this.equipment = other.equipment;
    this.description = other.description;
    this.parameters = other.parameters || new FullParameters();
  }
}
