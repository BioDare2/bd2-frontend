import {Environment} from './environment';
import {SetAble} from '../../../shared/common-interfaces';

/**
 * Environments
 * 
 * A class representing a collection of biological environments.
 */
export class Environments implements SetAble<Environments> {

  environments: Environment[] = [];

  /* Deserialise Environments from a JSON object */
  static deserialize(jsonObj: any): Environments {
    const obj = new Environments();

    const envs = jsonObj.environments.map((e: Environment) => Environment.deserialize(e));
    obj.setAll({environments: envs});
    return obj;
  }

  /* Create a clone of the Environments object */
  clone(): Environments {

    const txt = JSON.stringify(this);
    return Environments.deserialize(JSON.parse(txt));
  }

  setAll(other: any): void {
    this.environments = other.environments;
  }
}
