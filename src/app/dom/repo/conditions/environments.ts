import {Environment} from './environment';
import {SetAble} from '../../../shared/common-interfaces';

export class Environments implements SetAble<Environments> {

  environments: Environment[] = [];

  static deserialize(jsonObj: any): Environments {
    const obj = new Environments();

    const envs = jsonObj.environments.map((e: Environment) => Environment.deserialize(e));
    obj.setAll({environments: envs});
    return obj;
  }

  clone(): Environments {

    const txt = JSON.stringify(this);
    return Environments.deserialize(JSON.parse(txt));
  }

  setAll(other: any): void {
    this.environments = other.environments;
  }
}
