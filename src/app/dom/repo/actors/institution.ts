/**
 * Institution
 * 
 * Represents an academic institution such as a university.
 */
export class Institution {

  public id: number;

  public longName: string;
  public address: string;
  public web: string;

  constructor(public name?: string) {
  }

  /* Deserialize Institution from a JSON object */
  static deserialize(jsonObj: any): Institution {
    const obj = new Institution();
    obj.setAll(jsonObj);
    return obj;
  }

  /* Set institution properties from a deserialised JSON object */
  setAll(other: any): void {
    this.id = other.id;
    this.name = other.name;
    this.longName = other.longName;
    this.address = other.address;
    this.web = other.web;
  }
}
