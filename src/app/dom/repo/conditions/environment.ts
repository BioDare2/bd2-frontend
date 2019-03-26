export class Environment {

  name: string;
  description: string;

  static deserialize(jsonObj: any): Environment {
    const obj = new Environment();
    obj.setAll(jsonObj as any);
    return obj;
  }

  setAll(other: any): void {
    this.name = other.name;
    this.description = other.description;
  }
}
