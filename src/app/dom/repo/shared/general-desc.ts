import {SetAble} from '../../../shared/common-interfaces';

export class GeneralDesc implements SetAble<GeneralDesc> {

  public name: string;
  public purpose: string;
  public description: string;
  public comments: string;

  static deserialize(jsonObj: any): GeneralDesc {
    const obj = new GeneralDesc();
    obj.setAll(jsonObj);
    return obj;
  }

  setAll(other: any) {
    this.name = other.name;
    this.purpose = other.purpose;
    this.description = other.description;
    this.comments = other.comments;
  }

  clone(): GeneralDesc {
    const other = new GeneralDesc();
    other.setAll(this);
    return other;
  }
}
