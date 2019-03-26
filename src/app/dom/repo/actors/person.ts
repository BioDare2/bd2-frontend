export class Person {

  id: number;
  login: string;


  ORCID: string;

  constructor(public firstName?: string,
              public lastName?: string) {
  }

  get name(): string {
    if (this.firstName && this.lastName) {
      return this.firstName + ' ' + this.lastName;
    }

    if (this.lastName) {
      return this.lastName;
    }
    if (this.firstName) {
      return this.firstName;
    }
    return undefined;

  }

  static deserialize(jsonObj: any): Person {
    const obj = new Person();
    obj.setAll(jsonObj);
    return obj;
  }

  setAll(other: any): void {
    this.id = other.id;
    this.login = other.login;
    this.firstName = other.firstName;
    this.lastName = other.lastName;
    this.ORCID = other.ORCID;
  }
}
