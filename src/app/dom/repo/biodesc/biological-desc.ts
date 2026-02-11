import {BiologicalInfo} from './biological-info';

/**
 * BiologicalDescription
 * 
 * Represents a collection of biological information on an experiment.
 */
export class BiologicalDescription {

  bios: BiologicalInfo[] = [];

  /* Deserialize a JSON object into a BiologicalDescription instance */
  static deserialize(jsonObj: any): BiologicalDescription {

    const obj = new BiologicalDescription();
    obj.bios = jsonObj.bios.map((b: any) => BiologicalInfo.deserialize(b));
    return obj;
  }

  /* Create a clone of the BiologicalDescription instance with the same attributes */
  clone(): BiologicalDescription {
    const obj = new BiologicalDescription();
    obj.bios = this.bios.map(b => b.clone());
    return obj;
  }
}
