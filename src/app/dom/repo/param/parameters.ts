export class Parameter {

  constructor(public name?: string, public value?: string, public label?: string, public unit?: string) {
    if (label == undefined || label == null) {
      this.label = name;
    }
  }


  static deserialize(jsonObj: any): Parameter {
    const obj = new Parameter();
    obj.setAll(jsonObj);
    return obj;
  }

  setAll(other: any): void {
    this.name = other.name;
    this.value = other.value;
    this.label = other.label;
    this.unit = other.unit;
  }

}

export class FullParameters {

  parameters: Map<string, Parameter> = new Map<string, Parameter>();

  static deserialize(jsonObj: any): FullParameters {
    const obj = new FullParameters();

    // for arrays only
    jsonObj.forEach((p: any) => obj.set(Parameter.deserialize(p)));

    // for any objects
    /*
     Object.keys(jsonObj).forEach(key => {
     obj.set(Parameter.deserialize(jsonObj[key]));
     });// */

    return obj;
  }

  set(param: Parameter) {
    this.parameters.set(param.name, param);
  }

  get(name: string): Parameter {
    return this.parameters.get(name);
  }


  toJSON(): Parameter[] {

    const ps: Parameter[] = [];
    this.parameters.forEach(e => ps.push(e));
    return ps;
  }


  clone(): FullParameters {
    const other = new FullParameters();
    this.parameters.forEach(e => other.set(e));
    return other;
  }


}
