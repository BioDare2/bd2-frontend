/**
 * Person
 * 
 * Represents an individual person with optional first and last names, login, and ORCID identifier.
 */
export class Person {

  id: number;
  login: string;

  ORCID: string;

  constructor(public firstName?: string,
              public lastName?: string) {
  }

  /* Get the full name of the person, combining first and last names if both are available (otherwise, return what is available) */
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

  /* Deserialize a JSON object into a Person instance */
  static deserialize(jsonObj: any): Person {
    const obj = new Person();
    obj.setAll(jsonObj);
    return obj;
  }

  /* Set all properties of the Person instance from a deserialised JSON object */
  setAll(other: any): void {
    this.id = other.id;
    this.login = other.login;
    this.firstName = other.firstName;
    this.lastName = other.lastName;
    this.ORCID = other.ORCID;
  }
}
