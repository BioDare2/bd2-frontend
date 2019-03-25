
export class EmailSuitability {
  isAcademic: boolean;
  isFree: boolean;
}

export class BD2User {

  email: string;
  institution: string;
  anonymous: boolean;

  constructor(public login: string,
              public firstName?: string,
              public lastName?: string) {

  }

  get name(): string {

    if (this.firstName) {
      if (this.lastName) {
        return this.firstName + ' ' + this.lastName;
      } else {
        return this.firstName;
      }
    } else {
      if (this.lastName) {
        return this.lastName;
      } else {
        return this.login;
      }
    }
  }

  static deserialize(jsonObj: any): BD2User {
    if (!jsonObj) {
      throw new Error('Cannot deserialize null user');
    }
    const obj = new BD2User(undefined, undefined, undefined);
    obj.setAll(jsonObj as any);
    return obj;
  }

  setAll(other: BD2User): void {
    this.login = other.login;
    this.firstName = other.firstName;
    this.lastName = other.lastName;
    this.email = other.email;
    this.institution = other.institution;
    this.anonymous = other.anonymous; // this.string2Bool(other.anonymous);
  }

  string2Bool(val: any) {
    if (val === true || val === 'true' || val === 'TRUE') {
      return true;
    }
    return false;
  }
}
