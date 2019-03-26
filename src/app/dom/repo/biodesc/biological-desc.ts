import {BiologicalInfo} from './biological-info';

export class BiologicalDescription {

  bios: BiologicalInfo[] = [];

  static deserialize(jsonObj: any): BiologicalDescription {

    const obj = new BiologicalDescription();
    obj.bios = jsonObj.bios.map((b: any) => BiologicalInfo.deserialize(b));
    return obj;
  }

  clone(): BiologicalDescription {
    const obj = new BiologicalDescription();
    obj.bios = this.bios.map(b => b.clone());
    return obj;
  }
}
