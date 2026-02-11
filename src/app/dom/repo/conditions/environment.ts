/**
 * Environment
 * 
 * A class representing a biological environment for an experiment (e.g. growth environment).
 */
export class Environment {

  name: string;
  description: string;

  /* Deserialise an Environment from a JSON object */
  static deserialize(jsonObj: any): Environment {
    const obj = new Environment();
    obj.setAll(jsonObj as any);
    return obj;
  }

  /* Set environment name and description for a deserialised JSON object */
  setAll(other: any): void {
    this.name = other.name;
    this.description = other.description;
  }
}
